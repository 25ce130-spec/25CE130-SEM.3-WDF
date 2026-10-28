<?php
require __DIR__.'/db.php';
$db=db();
$accounts=[
    ['Admin User','admin@studenthub.com','admin123','admin'],
    ['Test Student','student@studenthub.com','student123','student']
];
foreach($accounts as [$name,$email,$password,$role]) {
    $hash=password_hash($password,PASSWORD_DEFAULT);
    $stmt=$db->prepare('INSERT INTO users(name,email,password,role,active) VALUES(?,?,?,?,1) ON DUPLICATE KEY UPDATE name=VALUES(name),password=VALUES(password),role=VALUES(role),active=1');
    $stmt->bind_param('ssss',$name,$email,$hash,$role);
    $stmt->execute();
    echo "$email / $password / $role\n";
}
