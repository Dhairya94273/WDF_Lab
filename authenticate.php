<?php

session_start();

if (isset($_POST['login']))
{
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Admin details
    $adminUsername = "admin";

    $adminPassword = '$2y$10$xtJ03Egd5lfy2kBAPYdGHOUSj2Y70mmTcqmlttZG45lHkzUkD0r/u';

    // Student details
    $studentUsername = "student";

    $studentPassword = '$2y$10$w/9lz11SsWUC6gF/rRi8q.ta8StTPHi0xxPt290.jt3MN/CbZM9hG';


    // Check Admin
    if ($username == $adminUsername &&
        password_verify($password, $adminPassword))
    {
        // Generate new session ID
        session_regenerate_id(true);

        $_SESSION['username'] = "admin";
        $_SESSION['role'] = "admin";
        $_SESSION['last_activity'] = time();

        header("Location: admin_dashboard.php");
        exit;
    }


    // Check Student
    else if ($username == $studentUsername &&
             password_verify($password, $studentPassword))
    {
        // Generate new session ID
        session_regenerate_id(true);

        $_SESSION['username'] = "student";
        $_SESSION['role'] = "student";
        $_SESSION['last_activity'] = time();

        header("Location: student_dashboard.php");
        exit;
    }


    // Invalid login
    else
    {
        echo "Invalid username or password";
    }
}

?>