<?php
session_start();
$message=''; $type='';
if ($_SERVER['REQUEST_METHOD']==='POST') {
    if (!isset($_POST['csrf']) || !hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'])) { $type='error'; $message='Invalid form session. Refresh and try again.'; }
    else {
        $name=trim(filter_input(INPUT_POST,'name',FILTER_UNSAFE_RAW));
        $email=trim(filter_input(INPUT_POST,'email',FILTER_SANITIZE_EMAIL));
        $phone=preg_replace('/[^0-9+]/','', trim($_POST['phone'] ?? ''));
        $messageText=trim(filter_input(INPUT_POST,'message',FILTER_UNSAFE_RAW));
        $errors=[];
        if (strlen($name)<3) $errors[]='Name must contain at least 3 characters.';
        if (!filter_var($email,FILTER_VALIDATE_EMAIL)) $errors[]='Enter a valid email address.';
        if (!preg_match('/^[0-9+]{10,13}$/',$phone)) $errors[]='Enter a valid phone number.';
        if (strlen($messageText)<10) $errors[]='Message must contain at least 10 characters.';
        if ($errors) { $type='error'; $message=implode(' ', $errors); }
        else {
            $file=__DIR__.'/registrations.csv'; $fp=fopen($file,'a');
            if ($fp) { fputcsv($fp,[htmlspecialchars($name,ENT_QUOTES,'UTF-8'),$email,$phone,htmlspecialchars($messageText,ENT_QUOTES,'UTF-8'),date('Y-m-d H:i:s')]); fclose($fp); $type='success'; $message='Your details were saved successfully.'; }
            else { $type='error'; $message='Unable to save the record.'; }
        }
    }
}
$_SESSION['csrf']=bin2hex(random_bytes(16));
$records=[]; if (($fp=fopen(__DIR__.'/registrations.csv','r'))!==false) { while (($row=fgetcsv($fp))!==false) $records[]=$row; fclose($fp); }
?>
<!doctype html><html><head><meta charset="utf-8"><title>Practical 7</title><link rel="stylesheet" href="style.css"></head><body><main class="box"><h1>Student Contact Form</h1>
<?php if($message): ?><div class="<?= $type ?>"><?= htmlspecialchars($message) ?></div><?php endif; ?>
<form method="post"><label>Name<input name="name" required minlength="3"></label><label>Email<input type="email" name="email" required></label><label>Phone<input name="phone" required></label><label>Message<textarea name="message" required minlength="10"></textarea></label><input type="hidden" name="csrf" value="<?= $_SESSION['csrf'] ?>"><button>Submit</button></form>
<h2>Saved Records</h2><table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Date</th></tr></thead><tbody><?php foreach($records as $r): ?><tr><?php foreach($r as $cell): ?><td><?= htmlspecialchars($cell) ?></td><?php endforeach; ?></tr><?php endforeach; ?></tbody></table></main></body></html>
