<?php   include $_SERVER['DOCUMENT_ROOT'] . '/php/database-module/database.php';
        include 'data-validation.php';

$db = connectToDatabase();
if (is_null($db)) {
    $message = 'execution is not possible without a connection to the database';
    echo json_encode([
        'status' => 'error',
        'message' => getServerMessage($message),
        'from' => 'auth-module/registration.php'
    ]);
    return;
}


// ``````````


$email = null;
$phone = null;
$password = null;

if (isset($_POST['email'])) {
    $email = $_POST['email'];
}
if (isset($_POST['phone'])) {
    $phone = $_POST['phone'];
}
if (isset($_POST['password'])) {
    $password = $_POST['password'];
}

if (
    is_null($password) || 
    (
        is_null($email) && 
        is_null($phone)
    )
) {
    $message = 'password can\'t be null; email or phone can\'t be null';
    echo json_encode([
        'status' => 'error',
        'message' => getServerMessage($message),
        'from' => 'auth-module/registration.php'
    ]);
    return;
}

$isValid = true;
$message = '';

if (!isEmailValid($email)) {
    $message .= 'email is invalid; ';
    $isValid = false;
}
if (!isPhoneValid($phone)) {
    $message .= 'phone is invalid; ';
    $isValid = false;
}
if (!isPasswordValid($password)) {
    $message .= 'password is invalid; ';
    $isValid = false;
}

if (!$isValid) {
    echo json_encode([
        'status' => 'error',
        'message' => getServerMessage($message),
        'from' => 'auth-module/registration.php'
    ]);
    return;
}


// ``````````


const SQL_ADD_DONOR = '
INSERT INTO donors
(
    donor_email,
    donor_phone,
    donor_password
)
VALUES
(
    :donor_email,
    :donor_phone,
    :donor_password
);
';

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$registration_parameters = [
    ':donor_email' => $email,
    ':donor_phone' => $phone,
    ':donor_password' => $passwordHash
];

try {
    $register_statement = $db->prepare(SQL_ADD_DONOR);
    $register_statement->execute($registration_parameters);

    $message = 'registration successful';
    echo json_encode([
        'status' => 'ok',
        'message' => getServerMessage($message),
        'from' => 'auth-module/registration.php'
    ]);
}
catch (PDOException $e) {
    $message = 'registration failed:<br>' . $e->getMessage();
    echo json_encode([
        'status' => 'error',
        'message' => getServerMessage($message),
        'from' => 'auth-module/registration.php'
    ]);
}

?>