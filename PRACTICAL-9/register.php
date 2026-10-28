<?php
session_start();
require '../PRACTICAL-8/db.php';
$message = '';
$type = '';
$_SESSION['csrf'] ??= bin2hex(random_bytes(16));
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!hash_equals($_SESSION['csrf'], $_POST['csrf'] ?? '')) {
        $type = 'error';
        $message = 'Invalid CSRF token.';
    } else {
        $name = trim($_POST['name'] ?? '');
        $email = strtolower(trim($_POST['email'] ?? ''));
        $password = $_POST['password'] ?? '';
        $role = ($_POST['role'] ?? 'student') === 'admin' ? 'admin' : 'student';
        if (strlen($name) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
            $type = 'error';
            $message = 'Enter a valid name, email and password of at least 8 characters.';
        } else {
            $db = db();
            $stmt = $db->prepare('SELECT id FROM users WHERE email=?');
            $stmt->bind_param('s', $email);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows) {
                $type = 'error';
                $message = 'This email is already registered.';
            } else {
                $hash = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $db->prepare('INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)');
                $stmt->bind_param('ssss', $name, $email, $hash, $role);
                if ($stmt->execute()) {
                    $type = 'success';
                    $message = 'Registration successful.';
                } else {
                    $type = 'error';
                    $message = 'Registration failed.';
                }
            }
        }
    }
}
?>
<!doctype html>
<html><head><meta charset="utf-8"><link rel="stylesheet" href="../PRACTICAL-7/style.css"><title>Registration</title></head>
<body><main class="box"><h1>Register</h1>
<?php if ($message): ?><div class="<?= $type ?>"><?= htmlspecialchars($message) ?></div><?php endif ?>
<form method="post">
<label>Name<input name="name" required></label>
<label>Email<input type="email" name="email" required></label>
<label>Password<input type="password" name="password" minlength="8" required></label>
<label>Role<select name="role"><option value="student">Student</option><option value="admin">Admin</option></select></label>
<input type="hidden" name="csrf" value="<?= $_SESSION['csrf'] ?>"><button>Create Account</button>
</form></main></body></html>
