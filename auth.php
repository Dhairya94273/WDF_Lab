<?php

session_start();

$timeout = 30;   // 30 seconds for demonstration


// Check whether user is logged in
if (!isset($_SESSION['username']))
{
    header("Location: login.php");
    exit;
}


// Check session timeout
if (time() - $_SESSION['last_activity'] > $timeout)
{
    session_unset();
    session_destroy();

    echo "Session expired. Please login again.";
    exit;
}


// Update activity time
$_SESSION['last_activity'] = time();

?>