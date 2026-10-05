<!DOCTYPE html>
<html>
<head>
    <title>Secure Login</title>
</head>

<body>

<h2>Secure Login</h2>

<form action="authenticate.php" method="post">

    Username:
    <input type="text" name="username" required>

    <br><br>

    Password:
    <input type="password" name="password" required>

    <br><br>

    <input type="submit" name="login" value="Login">

</form>

</body>
</html>