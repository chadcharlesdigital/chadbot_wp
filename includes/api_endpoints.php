<?php

class API_Endpoints {
    private static $instance = null;

    private function __construct() {
        // Add action to register REST API routes
        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
    }

    public static function get_instance() {
        if ( self::$instance == null ) {
            self::$instance = new API_Endpoints();
        }
        return self::$instance;
    }

    public function register_routes() {

        // Process message endpoint registration
        register_rest_route( 'chadbot/v1', '/process-message', array(
            'methods'  => 'POST',
            'callback' => array( $this, 'handle_message_callback' ),
            'args'     => array(
                'message' => array(
                    'required'    => true,
                    'type'        => 'string',
                    'description' => 'The message to send to the external API.',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ) );
    }

    public function handle_message_callback( $request ) {
        $message_to_send = $request->get_param('message');

        // --- Call External API (Your Express.js server) ---
        $external_api_url = 'http://localhost:3003/query'; // URL of your Express server endpoint
        
        $api_args = array(
            'method'      => 'POST',
            'timeout'     => 45,
            'redirection' => 5,
            'httpversion' => '1.0',
            'blocking'    => true,
            'headers'     => array(
                'Content-Type' => 'application/json', // Sending JSON to Express
            ),
            'body'        => json_encode( array( 'message' => $message_to_send ) ), // Match Express server's expected req.body.message
            'cookies'     => array()
        );

        $response = wp_remote_post( $external_api_url, $api_args );

        // --- Process External API Response ---
        if ( is_wp_error( $response ) ) {
            $error_message = $response->get_error_message();
            // Consider logging the error for server-side debugging
            // error_log("Error calling Express API: " . $error_message);
            return new WP_REST_Response( array( 'error' => "Failed to communicate with the processing server: $error_message" ), 500 );
        } else {
            $body = wp_remote_retrieve_body( $response );
            $response_code = wp_remote_retrieve_response_code( $response );
            $data = json_decode( $body );

            if ( json_last_error() !== JSON_ERROR_NONE ) {
                // The response from Express was not valid JSON
                // Consider logging this scenario
                // error_log("Invalid JSON response from Express API: " . $body);
                return new WP_REST_Response( 
                    array( 
                        'error' => 'Received an invalid response from the processing server.',
                        'external_response_raw' => $body 
                    ), 
                    $response_code // Use the status code from the Express server if available and valid
                );
            }

            // Forward the data and status code from the Express server's response
            return new WP_REST_Response( $data, $response_code );
        }
    }

    // Prevent cloning of the instance
    private function __clone() {}

    // Prevent unserialization of the instance
    public function __wakeup() {}
}

// Initialize the singleton instance
API_Endpoints::get_instance();


