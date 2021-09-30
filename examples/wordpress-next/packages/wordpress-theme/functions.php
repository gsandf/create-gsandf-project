<?php

namespace GSF\Theme;

require_once __DIR__ . '/inc/local-uploads-proxy.php';

function theme_entry() {
  // Stop redirecting all pages. This WordPress server should act as an API
  // source. NOTE: this also allows the WordPress instance to be accessed
  // through other host names.
  remove_filter('template_redirect', 'redirect_canonical');

  add_action('after_setup_theme', add_featured_image_support::class);
  add_filter('excerpt_more', custom_excerpt::class);
  add_filter('init', register_menus::class);

  add_filter(
    'wp_terms_checklist_args',
    retain_taxonomy_checklist_order::class
  );

  // Proxy the `wp-content/uploads/` directory if in local development
  $uploadProxySource = 'https://replace-me.example.com';
  $shouldProxyUploads = defined('DB_NAME') && DB_NAME === 'local';
  create_uploads_proxy($uploadProxySource, $shouldProxyUploads);
}

/**
 * Notifies WordPress that the theme allows posts to have a featured image
 */
function add_featured_image_support() {
  add_theme_support('post-thumbnails');
}

/**
 * Replaces the excerpt's "read more" text (default: `[…]`) with a custom string
 * @return string
 */
function custom_excerpt() {
  return '…';
}

/**
 * Registers all supported theme menus
 */
function register_menus() {
  register_nav_menu('footer-menu', 'Footer Navigation');
  register_nav_menu('header-menu', 'Header Navigation');
  register_nav_menu('social-menu', 'Social Menu');
}

/**
 * By default, in Add/Edit Post, WordPress moves checked categories to the top
 * of the list and unchecked to the bottom. When you have subcategories that you
 * want to keep below their parents at all times, this makes no sense. This
 * function removes automatic reordering so the categories widget retains its
 * order regardless of checked state.
 * @see https://stackoverflow.com/a/12586404
 *
 * @param array $args Array of arguments.
 * @return array
 */
function retain_taxonomy_checklist_order($args) {
  $args['checked_ontop'] = false;
  return $args;
}

theme_entry();
