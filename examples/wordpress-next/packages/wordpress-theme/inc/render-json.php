<?php

// Redirect individual post and pages to the REST API endpoint
if (is_single()) {
  $postType = get_post()->post_type;
  $postType = $postType == 'post' ? 'posts' : $postType;
  header('Location: /wp-json/wp/v2/' . $postType . '/' . get_post()->ID);
} elseif (is_page()) {
  header('Location: /wp-json/wp/v2/pages/' . get_queried_object()->ID);
} else {
  header('Location: /wp-json/');
}
