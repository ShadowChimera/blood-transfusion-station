<?php   include $_SERVER["DOCUMENT_ROOT"] . "/php/database-module/database.php";
        include "data-validation.php";
        include "remember-user.php";
        session_start();

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
$remember_me = false;

if (isset($_POST["login"])) {
    $login = $_POST["login"];
}

if (isset($_POST["password"])) {
    $password = $_POST["password"];
}

if (isset($_POST["user-type"])) {
    $user_type = $_POST["user-type"];
}

if (isset($_POST["remember-me"])) {
    $remember_me = $_POST["remember-me"];

    if ($remember_me === "true" || $remember_me === "checked" || $remember_me === "on") {
        $remember_me = true;
    }
    else {
        $remember_me = false;
    }
}

// `````````

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

$checked_user_id = null;
if (!check_user($login, $password, $user_type, $checked_user_id)) {
    sendLogAsResponse();
    return;
}

if ($remember_me) {
    $is_success = remember_user($checked_user_id, $user_type, $db);

    if (!$is_success) {
        sendLogAsResponse();
        return;
    }
}

$_SESSION['authorized'] = 'true';
$_SESSION['auth_user_id'] = $checked_user_id; 

$message = "authorization successful";
addSuccessToLog($message, "auth-module/authorization.php");
sendLogAsResponse();

// `````````

function check_user($login, $password, $user_type, &$checked_user_id) {
    global $db;

    $sql_check_user = get_sql_check_user($user_type);

    try {
        $check_user_statement = $db->prepare($sql_check_user);
        $check_user_statement->bindValue(':login', $login);
        $check_user_statement->execute();
    
        $user = $check_user_statement->fetch();
        
        if (
            !$check_user_statement->rowCount() || 
            !password_verify($password, $user['donor_password'])
        ) {
            $message = "wrong login or password";
            addErrorToLog($message, "auth-module/authorization.php");    
            return false;
        }
        
        $checked_user_id = $user['donor_id'];
    }
    catch (PDOException $e) {
        $message = "donor checking failed: <br>" . $e->getMessage();
        addErrorToLog($message, "auth-module/authorization.php");
        return false;
    }

    return true;
}

// `````````

function get_sql_check_user($user_type) {
    $sql_check_user = sprintf(
        'SELECT %1$s_id, %1$s_password  
        FROM %1$ss 
        WHERE 
        (
            %1$s_email IS NOT NULL
            AND 
            %1$s_email = :login
        ) 
        OR 
        (
            %1$s_phone IS NOT NULL
            AND 
            %1$s_phone = :login
        )',
        $user_type
    );

    return $sql_check_user;
}

?>