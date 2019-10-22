<?php

$PATH = __DIR__ . DIRECTORY_SEPARATOR;
$PUBLIC = 'public'. DIRECTORY_SEPARATOR;
$UPLOADS = $PUBLIC.'uploads'. DIRECTORY_SEPARATOR;


if($_SERVER['REQUEST_METHOD']=='POST' || $_SERVER['REQUEST_METHOD']=='OPTIONS') {
  include('server.php');
  die();
}
?><!DOCTYPE html><html><head><meta charset=utf-8><link rel=icon type=image/png sizes=96x96 href=/favicon.png><meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1"><title>Vue Material Dashboard by Creative Tim</title><meta name=viewport content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0"><link rel=stylesheet href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic"><link rel=stylesheet href="//fonts.googleapis.com/icon?family=Material+Icons"><link href=https://use.fontawesome.com/releases/v5.0.8/css/all.css rel=stylesheet><link href=/css/app.bfdb92af.css rel=preload as=style><link href=/css/chunk-vendors.33fbaed9.css rel=preload as=style><link href=/js/app.cd351a40.js rel=preload as=script><link href=/js/chunk-vendors.8cf8be1a.js rel=preload as=script><link href=/css/chunk-vendors.33fbaed9.css rel=stylesheet><link href=/css/app.bfdb92af.css rel=stylesheet></head><body><div id=app></div><script src=/js/chunk-vendors.8cf8be1a.js></script><script src=/js/app.cd351a40.js></script></body></html>
