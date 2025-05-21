<?php
/**
 * Plugin Name: ChadBot
 * Plugin URI: https://digitaleasyllc.com
 * Description: A customizable chatbot for WordPress websites
 * Version: 1.0.0
 * Author: Chad Charles
 * Author URI: https://digitaleasyllc.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: chadbot
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class ChadBot {

    //change this to false when you're ready to go live
    private static $dev_mode = true;

    private static $instance = null;
    
    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Initialize plugin
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('chadbot', array($this, 'render_chadbot_div'));
    }

    public function enqueue_scripts() {
        // Check for development mode (e.g., WP_DEBUG is true)
        if (self::$dev_mode) {
            // Enqueue scripts from React development server
            wp_enqueue_script(
                'chadbot-react-dev-app', // Unique handle for dev
                'http://localhost:3000/static/js/bundle.js',
                array(), // No dependencies for the main bundle
                null,    // Version (can be null for dev)
                true     // Load in footer
            );
            // In development, CRA's dev server often injects styles via JS,
            // so an explicit CSS enqueue might not be needed.
            // If you find styles are missing, you might need to check if a separate CSS file is served.
        } else {
            // Production mode: Enqueue scripts and styles from the 'build' folder

            // More robustly handle asset manifest for production
            $asset_manifest_path = plugin_dir_path(__FILE__) . 'build/asset-manifest.json';
            $main_js_path = 'build/static/js/main.js'; // Default fallback
            $main_css_path = 'build/static/css/main.css'; // Default fallback
            $version = '1.0.0'; // Default version

            if (file_exists($asset_manifest_path)) {
                $asset_manifest_contents = file_get_contents($asset_manifest_path);
                if ($asset_manifest_contents) {
                    $asset_manifest = json_decode($asset_manifest_contents, true);
                    if (isset($asset_manifest['files']['main.js'])) {
                        $main_js_path = 'build/' . $asset_manifest['files']['main.js'];
                        // Potentially extract a version/hash from the filename if needed
                    }
                    if (isset($asset_manifest['files']['main.css'])) {
                        $main_css_path = 'build/' . $asset_manifest['files']['main.css'];
                    }
                }
            }

            wp_enqueue_script(
                'chadbot-app',
                plugin_dir_url(__FILE__) . $main_js_path,
                array(),
                $version, // Use a dynamic version/hash in production if available
                true
            );

            // Check if CSS file exists before enqueuing to avoid errors if no CSS is generated
            if (file_exists(plugin_dir_path(__FILE__) . $main_css_path)) {
                 wp_enqueue_style(
                    'chadbot-styles',
                    plugin_dir_url(__FILE__) . $main_css_path,
                    array(),
                    $version // Use a dynamic version/hash in production if available
                );
            }
        }
    }

    public function render_chadbot_div() {
        // This div is where your React app will mount.
        // Create React App typically uses 'root' as the ID.
        return '<div id="chadbot" class="chadbot">Loading ChadBot...</div>';
    }

        // Prevent cloning of the instance
        private function __clone() {}

        // Prevent unserialization of the instance
        public function __wakeup() {}

}

// Initialize the plugin
ChadBot::get_instance();

include_once(plugin_dir_path(__FILE__) . 'includes/api_endpoints.php');
include_once(plugin_dir_path(__FILE__) . 'includes/Tool_call.php');
include_once(plugin_dir_path(__FILE__) . 'includes/System_prompt.php');