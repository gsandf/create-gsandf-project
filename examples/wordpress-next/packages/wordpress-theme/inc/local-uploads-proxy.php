<?php

namespace GSF\Theme;

/**
 * Get uploads from the production site and store them
 * in the local filesystem if they don't already exist.
 * @param string $baseURL
 * @param bool $shouldProxyUploads
 */
function create_uploads_proxy($baseURL, $shouldProxyUploads) {
  add_filter(
    '404_template',
    function () use ($baseURL, $shouldProxyUploads) {
      if ($shouldProxyUploads) {
        uploads_proxy($baseURL);
      }
    }
  );
}

function uploads_proxy($baseURL) {
  require_once ABSPATH . 'wp-admin/includes/file.php';

  global $wp_filesystem;

  WP_Filesystem();

  $requestPath = $_SERVER['REQUEST_URI'];
  $uploadsPath = str_replace(get_bloginfo('url'), '', wp_upload_dir()['baseurl']);

  // Check if a upload file was requested
  if (strpos($requestPath, $uploadsPath) !== 0) {
    return;
  }

  // Get the remote upload file
  $remotePath = "{$baseURL}{$requestPath}";
  $response = wp_remote_get($remotePath);

  if ($response['response']['code'] !== 200) {
    return;
  }

  $relativeUploadFile = str_replace($uploadsPath, '', $_SERVER['REQUEST_URI']);
  $absoluteUploadFile = wp_upload_dir()['basedir'] . $relativeUploadFile;
  wp_mkdir_p(pathinfo($absoluteUploadFile)['dirname']);

  // Redirect to the stored upload
  if ($wp_filesystem->put_contents(urldecode($absoluteUploadFile), $response['body'], FS_CHMOD_FILE)) {
    wp_redirect($requestPath);
  }
}
