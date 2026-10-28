<?php
require '../PRACTICAL-8/db.php';
$db=db();
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="student-list.csv"');
$out=fopen('php://output','w');
fputcsv($out,['ID','Name','Email','Course','Status']);
$result=$db->query('SELECT id,name,email,course,status FROM students ORDER BY id');
while($row=$result->fetch_assoc()) fputcsv($out,$row);
fclose($out);
