<?php

/**
 * Customize the WordPress post link behavior
 * @param $link WordPress preview link
 * @param $post WordPress post to process
 * @return string Link to post on headless server
 */
function set_post_link($link, $post)
{
  if ($post->post_status === 'draft') {
    [$template, $postName] = get_sample_permalink($post);
    $link = str_replace('%postname%', $postName, $template);
  }

  $url = parse_url($link);
  $url['port'] = 3000;

  // NOTE: This assumes the Node.js & WordPress server are always the same. This
  // could be adjusted to use an evironment variable to switch the rendering
  // server.
  return "{$url['scheme']}://{$url['host']}:{$url['port']}{$url['path']}?{$url['query']}";
}

add_filter('post_link', 'set_post_link', 10, 2);
