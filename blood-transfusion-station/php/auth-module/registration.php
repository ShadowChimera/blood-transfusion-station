<?php   include $_SERVER["DOCUMENT_ROOT"] . "/php/database-module/database.php";
        include "data-validation.php";

$db = connectToDatabase();
if (is_null($db)) {
    $message = "execution is not possible without a connection to the database";
    addErrorToLog($message, "auth-module/registration.php");
    sendLogAsResponse();
    return;
}


// ``````````


$email = null;
$phone = null;
$password = null;
$user_type = null;

if (isset($_POST["email"])) {
    $email = $_POST["email"];
    // $email = $email === "" ? null : $email;
}

if (isset($_POST["phone"])) {
    $phone = $_POST["phone"];
    // $phone = $phone === "" ? null : $phone;

}

if (isset($_POST["password"])) {
    $password = $_POST["password"];
    // $password = $password === "" ? null : $password;
}

if (isset($_POST["user-type"])) {
    $user_type = $_POST["user-type"];
    // $user_type = $user_type === "" ? null : $user_type;
}

if ($user_type !== "donor") {
    $message = "only the donor table is currently available";
    addErrorToLog($message, "auth-module/registration.php");
    sendLogAsResponse();
    return;
}

if (!isRegistrationDataValid($email, $phone, $password)) {
    sendLogAsResponse();
    return;
}


// ``````````


const SQL_CHECK_DONORS = "
SELECT donor_email, donor_phone 
FROM donors 
WHERE 
(
    donor_email IS NOT NULL
    AND 
    donor_email = :donor_email
) 
OR 
(
    donor_phone IS NOT NULL
    AND 
    donor_phone = :donor_phone
)
";

try {
    $checking_donors_params = [
        ":donor_email" => $email,
        ":donor_phone" => $phone
    ];
    
    $check_donors_statement = $db->prepare(SQL_CHECK_DONORS);
    $check_donors_statement->execute($checking_donors_params);
    
    if ($check_donors_statement->rowCount()) {
        $user = $check_donors_statement->fetch();
        $message = "";

        if ($email && $user["donor_email"] === $email) {
            $message = "an account with this email is already registered";
        }
        else if ($phone && $user["donor_phone"] === $phone) {
            $message = "an account with this phone is already registered";
        }
    
        if (!empty($message)) {
            addErrorToLog($message, "auth-module/registration.php");    
            sendLogAsResponse();
            return;
        }
    }
}
catch (PDOException $e) {
    $message = "donor checking failed: <br>" . $e->getMessage();
    addErrorToLog($message, "auth-module/registration.php");
    sendLogAsResponse();
    return;
}


// ``````````


const SQL_ADD_DONOR = "
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
)
";

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$registration_data = [
    ":donor_email" => $email,
    ":donor_phone" => $phone,
    ":donor_password" => $passwordHash
];

try {
    $register_statement = $db->prepare(SQL_ADD_DONOR);
    $register_statement->execute($registration_data);
}
catch (PDOException $e) {
    $message = "registration failed:<br>" . $e->getMessage();
    addErrorToLog($message, "auth-module/registration.php");
}

$message = "registration successful";
$global_sm_log[] = [
    "status" => "ok",
    "message" => getServerMessage($message),
    "from" => "auth-module/registration.php"
];

sendLogAsResponse();

?>