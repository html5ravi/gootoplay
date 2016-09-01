<?php
 
include 'include/dbhandler.php';
$db = new DbHandler();
 
 if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

}
 
$response = array();
$response["error"] = false;
 
if (isset($_POST['otp']) && $_POST['otp'] != '') {
    $otp = $_POST['otp'];
 
 
    $user = $db->activateUser($otp);
 
    if ($user != NULL) {
        $response["status"] = 200;
        $response["message"] = "User created successfully!";
        $response["profile"] = $user;
    } else {
        $response["status"] = 201;
        $response["message"] = "Sorry! Failed to create your account.";
    }
     
     
} else {
    $response["status"] = 202;
    $response["message"] = "Sorry! OTP is missing.";
}
 
 
echo json_encode($response);
?>