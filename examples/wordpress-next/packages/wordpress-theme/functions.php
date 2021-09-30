<?php

// Stop redirecting all pages. This WordPress server should act as an API
// source. NOTE: this also allows the WordPress instance to be accessed through
// other host names.
remove_filter('template_redirect', 'redirect_canonical');

// Keep Categories in hierarchical order after checked
require_once 'inc/categories.php';

// Register Menu Capability
require_once 'inc/menus.php';

// Add support for showing "featured images"
require_once 'inc/support-featured-image.php';

// Add support for custom "read more" text
require_once 'inc/custom-read-more.php';

// Add extra information to WordPress API responses
require_once 'inc/customize-wp-api.php';

// Customize the WordPress preview button behavior
require_once 'inc/preview-post-link.php';

// Enable Basic Auth for the WordPress API
require_once 'inc/enable-basic-auth.php';
