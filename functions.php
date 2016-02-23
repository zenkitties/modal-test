<?php

// Defines
define( 'FL_CHILD_THEME_DIR', get_stylesheet_directory() );
define( 'FL_CHILD_THEME_URL', get_stylesheet_directory_uri() );

// Classes
require_once 'classes/class-fl-child-theme.php';

//Adding in JS file into the head
function shift3_header_scripts()
{
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
        
        
        wp_register_script('jQuery', get_template_directory_uri() . '/js/jquery-1.12.1.min.js', array(), ''); // jQuery
        wp_enqueue_script('jQuery'); // Enqueue it!
        wp_register_script('contact-modal', get_template_directory_uri() . '/js/contact-modal.js', array(), ''); // jQuery
        wp_enqueue_script('contact-modal'); // Enqueue it!
        
    }
}

// Actions
add_action( 'fl_head', 'FLChildTheme::stylesheet' );
add_action('init', 'shift3_header_scripts'); // Add Custom Scripts to wp_head