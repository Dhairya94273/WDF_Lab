<?php

echo "Admin Password: ";
echo password_hash("admin123", PASSWORD_DEFAULT);

echo "<br><br>";

echo "Student Password: ";
echo password_hash("student123", PASSWORD_DEFAULT);

?>