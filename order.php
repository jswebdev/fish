<?php
require_once 'includes/config.php';
require_once 'includes/head.php';
$access_ok=false;
$customer_info;
$sql = "SELECT * FROM fish_orders";
$results = $conn->query($sql);
if($results->num_rows > 0) {
	while($row = $results->fetch_assoc()) {
		if($row['ID']==$_GET['order_id'] && $row['fname']==$_GET['fname'] && $row['lname']==$_GET['lname'] && $row['email']==$_GET['email'] && $row['phone']==$_GET['phone']) {
			$access_ok = true;
			$customer_info=$row;
		}
	}
}
if($access_ok==false) {
	echo 'Order not Found';
	include_once 'includes/footer.php';
	exit();
}
?>
<div class="row">
<div class="col-md-4 col-md-push-1 summary">
<h4>Order Summary</h4>
<table><tr><th>Item Name</th><th>Cost</th></tr>
<?php $sql = "SELECT * FROM fish_items";
$results = $conn->query($sql);
while($row = $results->fetch_assoc()) {
	if($row['order_id']==$customer_info['ID']) {
		echo '<tr><td>'.$row['name'].'</td><td>$'.$row['cost'].'</td><tr>';
	}
}
echo '<tr><td><strong>Total</strong></td><td><strong>$'.$customer_info['cost'].'</strong></td></tr>';
?>
</table>
</div>
<div class="col-md-4 col-md-push-2 summary">
<h4>Your Contact Information</h4>
<?php echo $customer_info['fname'].' '.$customer_info['lname']; ?>
<br>
<?php echo $customer_info['phone']; ?>
<br>
<?php echo $customer_info['email']; ?>
<h4>Pickup Information</h4>
Parma #532<br>6870 Ridge Rd<br>Parma, Ohio 44129<br>(440) 845-9592<br>9AM-9PM<br><strong>Pickup Time: </strong><?php echo $customer_info['pickup_time'];?>
</div>
<?php 
include_once 'includes/footer.php';
?>