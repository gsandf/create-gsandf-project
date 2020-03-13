<?php

/**
 * Add extra fields to the WordPress API
 * @see https://developer.wordpress.org/rest-api/extending-the-rest-api/modifying-responses/
 */

add_action('rest_api_init', function () {
  $post_types = get_post_types();

  /**
   * Add relative permalink as `path` to all post types
   */
  foreach ($post_types as $post_type) {
    register_rest_field($post_type, 'path', [
      'get_callback' => function () {
        return substr(get_permalink(), strlen(home_url()));
      },
      'schema' => array(
        'description' => __('Relative path'),
        'type' => 'string'
      )
    ]);
  }

  /**
   * Add `author_email` when fetching posts
   */
  register_rest_field('post', 'author_email', [
    'get_callback' => function ($post) {
      return get_the_author_email();
    },
    'schema' => array(
      'description' => __('Author email.'),
      'type' => 'string'
    )
  ]);
});
