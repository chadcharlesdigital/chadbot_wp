<?php

class Tool_call {

    private $tool_definitions=[
        [
            "name" => "go_to_page",
            "description" => "Navigate the user to a specific page on the website. Use this when the user wants to visit a particular section, product, or information page.",
            "input_schema" => [
                "type" => "object",
                "properties" => [
                    "page_name" => [
                        "type" => "string",
                        "description" => "The name or path of the page to navigate to (e.g., 'home', 'products', 'about', 'contact')"
                    ],
                    "parameters" => [
                        "type" => "object",
                        "description" => "Optional URL parameters to add to the navigation",
                        "additionalProperties" => true
                    ]
                ],
                "required" => ["page_name"]
            ]
        ],
        [
            "name" => "make_user_account",
            "description" => "Create a new user account. Use this when the user explicitly asks to register, sign up, or create an account.",
            "input_schema" => [
                "type" => "object",
                "properties" => [
                    "first_name" => [
                        "type" => "string",
                        "description" => "Users first name"
                    ],
                    "last_name" => [
                        "type" => "string",
                        "description" => "Users last name"
                    ],
                    "email" => [
                        "type" => "string",
                        "description" => "The email address for the account"
                    ]
                ],
                "required" => ["email"]
            ]
        ],
        [
            "name" => "send_email",
            "description" => "Send an email on behalf of the user. Use this when the user wants to contact support, send feedback, or communicate with the company.",
            "input_schema" => [
                "type" => "object",
                "properties" => [
                    "recipient" => [
                        "type" => "string",
                        "description" => "Email recipient (e.g., 'support', 'sales', specific email)"
                    ],
                    "subject" => [
                        "type" => "string",
                        "description" => "Email subject line"
                    ],
                    "body" => [
                        "type" => "string",
                        "description" => "Content of the email"
                    ]
                ],
                "required" => ["recipient", "body"]
            ]
        ]
    ];

    public function __construct() {

    }

    public function call_tool($tool_name, $parameters){
        //check if the tool is a backend tool
        if ($tool_name == 'make_user_account'){
            // error_log("params: " . print_r($parameters, true));
            // error_log("extracted params: " . print_r(self::extract_parameters($parameters), true)); 
            $parameters = self::extract_parameters($parameters);
            $user_id = $this->create_user_account($parameters);
            
            if ($user_id){
                return "OK, I've created a new account for you and logged you in.";
            }else{
                return "Sorry there was an error creating your account.";
            }

            
        }
    }

    private function create_user_account($parameters){

        $user_information = [
            'user_login' => $parameters['email'],
            'user_pass' => wp_generate_password(),
            'user_email' => $parameters['email'],
            'user_first_name' => isset($parameters['first_name']) ? $parameters['first_name'] : '',
            'user_last_name' => isset($parameters['last_name']) ? $parameters['last_name'] : ''
        ];
        //create a new user account
        $user_id = wp_create_user( $user_information['user_email'], $user_information['user_pass'], $user_information['user_email']);
        if (is_wp_error($user_id)){
            error_log("Error creating user account: " . $user_id->get_error_message());
            return false;
        }
        //log user in
        $login_information = ['user_login' => $user_information['user_email'], 'user_password' => $user_information['user_pass'], 'remember' => true];
        $is_secure = is_ssl();
        $sign_in_complete = wp_signon($login_information, $is_secure);

        if (is_wp_error($sign_in_complete)){
            error_log("Error logging in user: " . $sign_in_complete->get_error_message());
            return false;
        }

        wp_set_current_user($user_id);
        wp_set_auth_cookie($user_id, true);

        error_log(message: "sign in complete: " . print_r($sign_in_complete, true));

        return $user_id;
    }

    /**
     * return all tools that run on the backend before responding to the user as an associative array
     * 
     * @return array
     */
    public function get_back_end_tools(){
        return ['make_user_account', 'send_email'];
    }

    /**
     * return all tool definitions as an associative array
     * 
     * @return array
     */
    public function get_tool_definitions(){
        return $this->tool_definitions;
    }

    /**
     * check if tool call is needed
     * 
     * @param $stdClass 
     * @return bool
     */
    
     /**
      * start of static methods, these are utility methods
      * =================================================
      */

      /**
       * check if tool call is needed
       * 
       * @param $stdClass 
       * @return bool
       */
     public static function needs_tool_use($data){
        $tool_to_use = false;

        foreach ($data as $item) {
            if (isset($item->type) && $item->type === 'tool_use') {
                $tool_to_use = $item->name;
                break;
            }
        }

        error_log("tool_to_use: " . print_r($tool_to_use, true));
            if ($tool_to_use) {
                return $tool_to_use;
            } else {
                return false;
            }
        }

        /**
         * extract tool info from the data
         * 
         * @param $array of stdClass objects
         * @return array
         */
        public static function extract_parameters($data){

            $parameters = false;
            foreach ($data as $item) {
                if (isset($item->type) && $item->type === 'tool_use') {
                    //turn stdClass object into an array
                    $parameters = json_decode(json_encode($item->input), true);
                    break;
                }
            }
            return $parameters;

        }

            
        
}