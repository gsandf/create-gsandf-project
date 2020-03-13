<?php

// Replaces the excerpt's "read more" text (default: `[…]`) with a custom string
function gsandf_theme_excerpt_more()
{
  return '…';
}

add_filter('excerpt_more', 'gsandf_theme_excerpt_more');
