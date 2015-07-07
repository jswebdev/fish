<?php
$host = 'host';
$username = 'username';
$password= 'password';
$db = 'db';
$conn = new MySQLi($host, $username, $password, $db); 
if ($conn->connect_error) {
	echo 'Connection error';
	exit();
}
?>