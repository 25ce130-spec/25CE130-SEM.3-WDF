<?php
function login_required(): void { if(session_status()!==PHP_SESSION_ACTIVE)session_start(); if(empty($_SESSION['user'])){header('Location: login.php');exit;} }
function admin_required(): void { login_required(); if(($_SESSION['user']['role']??'')!=='admin'){http_response_code(403);exit('Admin access required.');} }
function audit(mysqli $db,int $userId,string $action): void { $ip=$_SERVER['REMOTE_ADDR']??''; $stmt=$db->prepare('INSERT INTO audit_logs(user_id,action,ip_address) VALUES(?,?,?)');$stmt->bind_param('iss',$userId,$action,$ip);$stmt->execute(); }
function session_expired(int $seconds=1800): bool { return isset($_SESSION['last_activity']) && (time()-$_SESSION['last_activity']>$seconds); }
