<?php
header('Content-Type: application/json; charset=utf-8'); require '../PRACTICAL-8/db.php'; $db=db(); $method=$_SERVER['REQUEST_METHOD'];
function respond($data,$status=200){http_response_code($status);echo json_encode(['success'=>$status<400,'data'=>$data]);exit;}
try{ if($method==='GET'){ $q=$db->real_escape_string($_GET['q']??'');$res=$db->query("SELECT id,name,email,course,status FROM students WHERE name LIKE '%$q%' OR email LIKE '%$q%' ORDER BY id DESC");respond($res->fetch_all(MYSQLI_ASSOC));}
$input=json_decode(file_get_contents('php://input'),true);$action=$input['action']??'';
if($action==='add'||$action==='update'){ $id=(int)($input['id']??0);$name=trim($input['name']??'');$email=trim($input['email']??'');$course=trim($input['course']??'');if(strlen($name)<3||!filter_var($email,FILTER_VALIDATE_EMAIL)||$course==='')respond('Invalid student data',422);
if($action==='add'){ $s=$db->prepare('INSERT INTO students(name,email,course) VALUES(?,?,?)');$s->bind_param('sss',$name,$email,$course); } else {$s=$db->prepare('UPDATE students SET name=?,email=?,course=? WHERE id=?');$s->bind_param('sssi',$name,$email,$course,$id);}if(!$s->execute())respond('Save failed. Email may be duplicate.',409);respond('Student saved');}
if($action==='delete'){ $id=(int)($input['id']??0);if(!$id)respond('Student ID required',422);$s=$db->prepare('DELETE FROM students WHERE id=?');$s->bind_param('i',$id);$s->execute();respond('Student deleted');}
respond('Unknown API action',400);}catch(Throwable $e){respond('Server error: '.$e->getMessage(),500);}
