<?php

$email 	= "pnordine@ppmeasurements.com";
$subject 	= "PPM: Web Inquiry";

$FirstName 	= trim(stripslashes(strip_tags($_POST["first_name"])));
$LastName 	= trim(stripslashes(strip_tags($_POST["last_name"])));
$Company 	= trim(stripslashes(strip_tags($_POST["company_name"])));
$FromEmail 	= trim(stripslashes(strip_tags($_POST["email_addr"])));
$Phone  	= trim(stripslashes(strip_tags($_POST["Phone"])));

$message 	= trim($_POST["message"]);
$from 	= "$FirstName $LastName <$FromEmail>";

$message = "From: $from -- $Company -- $Phone\n\n$message";
$ip = getenv('REMOTE_ADDR');
$message = "$message\n\n-----\n\nREMOTE_ADDR: $ip";

if(mail("$email", "$subject", "$message", "From: $from", "Bcc: jas@corpus-callosum.com")) {
	echo "<span>Message sent; thank you.</span>";
}else{
	echo "<p>An error occurred sending you message.</p><p>Please resend to: pnordine@ppmeasurements.com</p><p>$message</p>";
}
?>
