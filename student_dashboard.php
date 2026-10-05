<?php

include "auth.php";


// Only student can access this page
if ($_SESSION['role'] != "student")
{
    echo "Access Denied";
    exit;
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Student Dashboard</title>
</head>

<body>

<h2>Student Dashboard</h2>

<p>
Welcome <?php echo $_SESSION['username']; ?>
</p>

<p>
You are logged in as Student.
</p>

<a href="logout.php">Logout</a>

</body>
</html>