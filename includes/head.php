<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,inital-scale=1.0,maximum-scale=1.0">
<?php
$request_uri = explode('?', $_SERVER['REQUEST_URI']);
$request_uri = $request_uri[0];
if($request_uri=='/fish/order.php') {
?>
<title>Your Order
<?php
} else {
?>
<title>Fish Tank Builder
<?php 
}
?>
 | PetSmart</title>
<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="css/style.css">
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/script.js"></script>
</head>
<body>
<div id="container" class="container">
	<div class="row">
	<a href="http://www.petsmart.com"><img src="images/logo.png" id="logo" class="col-md-push-1 col-md-3"></a>
    </div>