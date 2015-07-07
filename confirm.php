<?php
if(isset($_POST['data'])==false) {
	echo '<h1>Access Denied</h1>';
	die();
}
require_once 'includes/config.php';
require_once 'time.php';
$timestamps = get_pickup_time();
$data = $_POST['data'];
$last_id = 0;
$customerInfo = $data['customerInfo'];
//Add customer info to the fish_orders table. Get the entry id so we can add it to the item entrys
$sql = "INSERT INTO fish_orders(fname, lname, email, phone, cost, pickup_time) VALUES('".$customerInfo['fname']."', '".$customerInfo['lname']."', '".$customerInfo['email']."', '".$customerInfo['phone']."', '".$data['total']."', '".$timestamps[2]."')";
if($conn->query($sql) === TRUE) {
	$last_id = $conn->insert_id;
} else {
	echo mysqli_error($conn);
	exit();
}
//Start creating html email
$email = '<html><head><title>Pet Smart Order Confirmation</title></head><body><img src="http://jacobsommerfeld.net/fish/images/logo.png"><h4 style="color:white; background-color:#002864;padding:10px;">Thank you '.$customerInfo['fname'].' '.$customerInfo['lname'].' for placing your order - Keep this recept for your records #'.$last_id.'</h4><table style="width:400px; display:inline-block; float:left;"><tr style="border-bottom:1px solid black"><th style="text-align:left;">Item Name</th><th style="text-align:left;">Cost</th></tr>';
//Get the items from the data
$items = $data['items'];

//Insert the tank to the database and add it to the email
$sql = "INSERT INTO fish_items(order_id, name, cost) VALUES('".$last_id."', '".$items['Tank']['name']."','".$items['Tank']['cost'].".00')";
$email .='<tr style="border-bottom:1px solid black"><td style="width:200px; padding-bottom:10px">'.$items['Tank']['name'].'</td><td style="width:200px; padding-bottom:10px">$'.$items['Tank']['cost'].'.00</tr>';
$conn->query($sql);

//Check if a stand was purchased and add it to the database and email
if($items['Stand']['purchasing']=='true') {
	$sql = "INSERT INTO fish_items(order_id, name, cost) VALUES('".$last_id."', '".$items['Stand']['name']."', '".$items['Stand']['cost']."')";
	$email .='<tr style="border-bottom:1px solid black"><td style="width:200px; padding-bottom:10px">'.$items['Stand']['name'].'</td><td style="width:200px; padding-bottom:10px">$'.$items['Stand']['cost'].'</tr>';
	$conn->query($sql);
}

//Insert filter into the database and email
$sql = "INSERT INTO fish_items(order_id, name, cost) VALUES('".$last_id."', '".$items['Filter']['name']."','".$items['Filter']['cost']."')";
$conn->query($sql);
$email .='<tr style="border-bottom:1px solid black"><td style="width:200px; padding-bottom:10px">'.$items['Filter']['name'].'</td><td style="width:200px; padding-bottom:10px">$'.$items['Filter']['cost'].'</tr>';

//Get the gravel from the items
$gravel = $items['Gravel'];

//Check if any 5 lb bags were purchased and add them to the database and email
if($gravel['5']['amount']>0) {
	$name = '('.$gravel['5']['amount'].') 5 lb Gravel '.$gravel['color'];
	$sql = "INSERT INTO fish_items(order_id, name, cost) VALUES('".$last_id."', '".$name."', '".$gravel['5']['cost']."')";
	$email .='<tr style="border-bottom:1px solid black"><td style="width:200px; padding-bottom:10px">'.$name.'</td><td style="width:200px; padding-bottom:10px">$'.$gravel['5']['cost'].'</tr>';
	$conn->query($sql);
}

//Check if any 25 lb bags were purchased and add them to the database and email
if($gravel['25']['amount']>0) {
	$name = '('.$gravel['25']['amount'].') 25 lb Gravel '.$gravel['color'];
	$sql = "INSERT INTO fish_items(order_id, name, cost) VALUES('".$last_id."', '".$name."', '".$gravel['25']['cost']."')";
	$email .='<tr style="border-bottom:1px solid black"><td style="width:200px; padding-bottom:10px">'.$name.'</td><td style="width:200px; padding-bottom:10px">$'.$gravel['25']['cost'].'</tr>';
	$conn->query($sql);
}

//get the decorations from the items
$decs = $items['Decorations'];

//Check if any plastic plants were purchased and add them to the database and email
if($decs['pp']['count']>0) {
	$name = '('.$decs['pp']['count'].') Plastic Plants';
	$sql = "INSERT INTO fish_items(order_id, name, cost) VALUES('".$last_id."', '".$name."', '".$decs['pp']['cost'].".00')";
	$email .='<tr style="border-bottom:1px solid black"><td style="width:200px; padding-bottom:10px">'.$name.'</td><td style="width:200px; padding-bottom:10px">$'.$decs['pp']['cost'].'.00</tr>';
	$conn->query($sql);
}

//Check if any small fake coral were purchased and add them to the database and email
if($decs['sfc']['count']>0) {
	$name = '('.$decs['sfc']['count'].') Small Fake Coral';
	$sql = "INSERT INTO fish_items(order_id, name, cost) VALUES('".$last_id."', '".$name."', '".$decs['sfc']['cost'].".00')";
		$email .='<tr style="border-bottom:1px solid black"><td style="width:200px; padding-bottom:10px">'.$name.'</td><td style="width:200px; padding-bottom:10px">$'.$decs['sfc']['cost'].'.00</tr>';
	$conn->query($sql);
}

//Check if any Large fake coral were purchased and add them to the database and email
if($decs['lfc']['count']>0) {
	$name = '('.$decs['lfc']['count'].') Large Fake Coral';
	$sql = "INSERT INTO fish_items(order_id, name, cost) VALUES('".$last_id."', '".$name."', '".$decs['lfc']['cost'].".00')";
	$email .='<tr style="border-bottom:1px solid black"><td style="width:200px; padding-bottom:10px">'.$name.'</td><td style="width:200px; padding-bottom:10px">$'.$decs['lfc']['cost'].'.00</tr>';
	$conn->query($sql);
}

//finish the email and close the database connection
$conn->close();
$email .= '<tr style="border-bottom:1px solid black"><td style="width:200px; padding-bottom:10px"><strong>Total</strong></td><td style="width:200px; padding-bottom:10px"><strong>$'.$data['total'].'</strong></td></tr></table>';
$url = $_SERVER['HTTP_HOST'].'/fish/order.php?order_id='.$last_id.'&fname='.$customerInfo['fname'].'&lname='.$customerInfo['lname'].'&email='.$customerInfo['email'].'&phone='.$customerInfo['phone'];
$email .='<h2>Pickup Information</h2>Parma #532<br>6870 Ridge Rd.<br>Parma, Ohio 44129<br>(440) 845-9592<br><strong>Store Hours: </strong> 9AM-9PM<br><strong>Pickup Time: </strong>'.$timestamps[2];
$email .= '<br><a href="'.$url.'" target="_blank">Check order status/cancel order</a>';
$email .='</body>';


//Setup the email headers
$headers = 'From: Fish Tank Builder Demo <From:fish@jacobsommerfeld.net>'."\r\n";
$headers .= 'MIME-Version: 1.0'."\r\n";
$headers .= 'Content-type: text/html; charset=iso8859-1'."\r\n";

//Send the email
mail($customerInfo['email'], 'Pet Smart Order Confirmation', $email, $headers);
echo $last_id.'~'.$timestamps[1];
exit();
?>