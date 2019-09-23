<?php

function error($message) {
  die('{"status":"error","message":"'.addslashes($message).'"}');
}

function rc_headers() {
  //header('Content-Type: text/html; charset=utf-8');
  //header('Content-Type: application/json');
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Methods: POST, GET,  OPTIONS');
  header('Access-Control-Allow-Headers: X-PINGOTHER, Content-Type');
  header('Access-Control-Max-Age: 230');
  error_log((isset($_SERVER['HTTP_ORIGIN'])?$_SERVER['HTTP_ORIGIN']:'*'));
  header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN'])?$_SERVER['HTTP_ORIGIN']:'*') );
}

function get_ip_address() {
  // Check for shared Internet/ISP IP
  if (!empty($_SERVER['HTTP_CLIENT_IP']) && validate_ip($_SERVER['HTTP_CLIENT_IP'])) {
      return $_SERVER['HTTP_CLIENT_IP'];
  }

  // Check for IP addresses passing through proxies
  if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {

      // Check if multiple IP addresses exist in var
      if (strpos($_SERVER['HTTP_X_FORWARDED_FOR'], ',') !== false) {
          $iplist = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
          foreach ($iplist as $ip) {
              if (validate_ip($ip))
                  return $ip;
          }
      }
      else {
          if (validate_ip($_SERVER['HTTP_X_FORWARDED_FOR']))
              return $_SERVER['HTTP_X_FORWARDED_FOR'];
      }
  }
  if (!empty($_SERVER['HTTP_X_FORWARDED']) && validate_ip($_SERVER['HTTP_X_FORWARDED']))
      return $_SERVER['HTTP_X_FORWARDED'];
  if (!empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']) && validate_ip($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
      return $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
  if (!empty($_SERVER['HTTP_FORWARDED_FOR']) && validate_ip($_SERVER['HTTP_FORWARDED_FOR']))
      return $_SERVER['HTTP_FORWARDED_FOR'];
  if (!empty($_SERVER['HTTP_FORWARDED']) && validate_ip($_SERVER['HTTP_FORWARDED']))
      return $_SERVER['HTTP_FORWARDED'];

  // Return unreliable IP address since all else failed
  return $_SERVER['REMOTE_ADDR'];
}
