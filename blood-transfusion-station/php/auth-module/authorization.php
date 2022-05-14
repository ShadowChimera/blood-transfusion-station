<?php   include $_SERVER["DOCUMENT_ROOT"] . "/php/database-module/database.php";
        include "data-validation.php";

$db = connectToDatabase();
if (is_null($db)) {
    $message = "execution is not possible without a connection to the database";
    addErrorToLog($message, "auth-module/authorization.php");
    sendLogAsResponse();
    return;
}


// ``````````


$login = null;
$password = null;
$user_type = null;

if (isset($_POST["login"])) {
    $login = $_POST["login"];
}

if (isset($_POST["password"])) {
    $password = $_POST["password"];
}

if (isset($_POST["user-type"])) {
    $user_type = $_POST["user-type"];
}

if ($user_type !== "donor") {
    $message = "only the donor table is currently available";
    addErrorToLog($message, "auth-module/authorization.php");
    sendLogAsResponse();
    return;
}

if (!isAuthorizationDataValid($login, $password)) {
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
    donor_email = :login
) 
OR 
(
    donor_phone IS NOT NULL
    AND 
    donor_phone = :login
)
";

try {
    $check_donors_statement = $db->prepare(SQL_CHECK_DONORS);
    $check_donors_statement->bindValue(':login', $login);
    $check_donors_statement->execute();

    $user = $check_donors_statement->fetch();
    
    if (
        !$check_donors_statement->rowCount() || 
        !password_verify($password, $user['password'])
    ) {
        $message = "wrong login or password";
        addErrorToLog($message, "auth-module/authorization.php");    
        sendLogAsResponse();
        return;
    }
}
catch (PDOException $e) {
    $message = "donor checking failed: <br>" . $e->getMessage();
    addErrorToLog($message, "auth-module/authorization.php");
    sendLogAsResponse();
    return;
}

$message = "authorization successful";
$global_sm_log[] = [
    "status" => "ok",
    "message" => getServerMessage($message),
    "from" => "auth-module/authorization.php"
];

sendLogAsResponse();

?>