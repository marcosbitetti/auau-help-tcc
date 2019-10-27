<?php

$PATH = __DIR__ . DIRECTORY_SEPARATOR;
$PUBLIC = 'public'. DIRECTORY_SEPARATOR;
$UPLOADS = $PUBLIC.'uploads'. DIRECTORY_SEPARATOR;


if($_SERVER['REQUEST_METHOD']=='POST' || $_SERVER['REQUEST_METHOD']=='OPTIONS') {
  include('server.php');
  die();
}

echo file_get_contents("./index.html.inc");
