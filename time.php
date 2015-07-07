<?php
function get_pickup_time() {
//date_default_timezone_set("Asia/Singapore");
$hours = date("H");
$minutes = date("i");
$day = date("j");
$month = date("n");
$year = date("Y");
$lastDayMonth=30;
if(floor($month/2)!=$month/2) {
	$lastDayMonth=31;
}
if($month==2 && floor($year/4)==$year/4) {
	$lastDayMonth=29;
}
if($month==2 && floor($year/4)!=$year/4) {
	$lastDayMonth=28;
}
$hours = $hours + 2;
if($hours>23) {
	$hours = $hours - 24;
}
$day_string='Today';
if($hours>20 || $hours<10) {
	$hours=10;
	$minutes=0;
	$day=$day+1;
	$day_string = 'Tomorrow';
}
if($day>$lastDayMonth) {
	$day=1;
	$month=$month+1;
}
if($month>12) {
	$month=1;
	$year++;
}
$timestamp = $hours.':'.$minutes.' '.$month.'/'.$day.'/'.$year;
$ap='AM';
if($hours>11) {
	$ap='PM';
	$hours=$hours-12;
	if($hours==0) {
		$hours=12;
		$ap='AM';
	}
}
if($minutes<10) {
	//$minutes = '0' . $minutes;
}
$day_string = $day_string.' at '.$hours.':'.$minutes.' '.$ap;
$email_timestmp = $month.'/'.$day.'/'.$year.' at '.$hours.':'.$minutes.''.$ap;
$output = [$timestamp, $day_string, $email_timestmp];
return $output;
}