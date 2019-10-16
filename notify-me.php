<?php
/*

This script handles AJAX requests from "Send me an email when it's done" form
and store emails in MailChimp subscribers list or in a file.

If you are going to use MailChimp you should change of $API_KEY and $LIST_ID
variables with your actual MailChimp API Key and List ID below

*/

// Set to "mailchimp" to store contacts in MailChimp or "file" to store in a file.
$STORE_MODE = "mailchimp";

// Your MailChimp API Key
$API_KEY =  "43834c78a4b00ffc1aa4052809c06889-us11";

// Your MailChimp List ID
$LIST_ID =  "e6d9b98ecd";



/**********************************************************************************

All the work runs below

**********************************************************************************/


// Include MailChimp API
require('lib/MailChimp.php');

// Allow only post method
if($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST["email"])) {

	$email = $_POST["email"];
	
	// Send headers
	header('HTTP/1.1 200 OK');
	header('Status: 200 OK');
	header('Content-type: application/json');

	// Check if email is valid
	if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
		
		// Store in a file
		if ($STORE_MODE == "file") { // Store in a file
			
			// Success
			if(@file_put_contents($STORE_FILE, strtolower($email)."\r\n", FILE_APPEND)) {
				echo json_encode(array(
						"status" => "success"
					));
			// Error
			} else {
				echo json_encode(array(
						"status" => "error",
						"type" => "FileAccessError"
					));
			}
		
		// Store in mailchimp
		} elseif ($STORE_MODE == "mailchimp") { // Store with MailChimp
			// Use MailChimp API to store
			$MailChimp = new MailChimp($API_KEY);
			
			$result = $MailChimp->call('lists/subscribe', array(
		                'id'                => $LIST_ID,
		                'email'             => array('email'=>$email),
		                'double_optin'      => false,
		                'update_existing'   => true,
		                'replace_interests' => false,
		                'send_welcome'      => false,
		            ));
	
		    // Create a response     
	
			// Success
			if($result["email"] == $email) {     	
				echo json_encode(array(
						"status" => "success"
					));
			// Error
			} else {
				echo json_encode(array(
						"status" => "error",
						"type" => $result["name"]
					));
			}
		// Error
		} else {
			echo json_encode(array(
					"status" => "error",
				));
		}
	// Error 
	} else {
		echo json_encode(array(
				"status" => "error",
				"type" => "ValidationError"
			));
	}
} else {
	header('HTTP/1.1 403 Forbidden');
	header('Status: 403 Forbidden');
}
?>