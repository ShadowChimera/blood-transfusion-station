<?php   session_start();

$_SESSION['authorized'] = 'false';
$_SESSION['auth_user_id'] = 'null';
unset($_SESSION['auth_user_id']);


unset($_COOKIE['AUTOAUTHTYPE']);
setcookie('AUTOAUTHTYPE', null, -1, '/');

unset($_COOKIE['AUTOAUTHID']);
setcookie('AUTOAUTHID', null, -1, '/');

unset($_COOKIE['AUTOAUTHKEY']);
setcookie('AUTOAUTHKEY', null, -1, '/');

?>