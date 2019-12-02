<?php

/**
 * Register support for menus
 */
function gsandf_register_menus()
{
  register_nav_menu('header-menu', __('Header Navigation'));
}

add_action('init', 'gsandf_register_menus');
