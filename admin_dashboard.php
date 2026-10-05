<?php

include "auth.php";


// Only admin can access this page
if ($_SESSION['role'] != "admin")
{
    echo "Access Denied";
    exit;
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
</head>

<body>

<h2>Admin Dashboard</h2>

<p>
Welcome <?php echo $_SESSION['username']; ?>
</p>

<p>
You are logged in as Administrator.
</p>

<a href="logout.php">Logout</a>

</body>
</html>