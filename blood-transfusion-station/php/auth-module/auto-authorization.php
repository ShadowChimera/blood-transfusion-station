<?php   include $_SERVER["DOCUMENT_ROOT"] . "/php/database-module/database.php";
        include "remember-user.php";
        session_start();

$db = connectToDatabase();
if (is_null($db)) {
    $message = "execution is not possible without a connection to the database";
    addErrorToLog($message, "auth-module/auto-authorization.php");
    sendLogAsResponse();
    return;
}

// `````````

function doAutoAuthorization() {
    global $db;

    $user_type = null;
    $auth_id = null;
    $auth_key = null;

    if (isset($_COOKIE['AUTOAUTHTYPE'])) {
        $user_type = $_COOKIE['AUTOAUTHTYPE'];
    }

    if (isset($_COOKIE['AUTOAUTHID'])) {
        $auth_id = $_COOKIE['AUTOAUTHID'];
    }

    if (isset($_COOKIE['AUTOAUTHKEY'])) {
        $auth_key = $_COOKIE['AUTOAUTHKEY'];
    }

    if (
        $user_type === null || 
        $auth_id === null || 
        $auth_key === null
    ) {
        return false;
    }

    $checked_user_id = null;

    if (!check_user($auth_id, $auth_key, $user_type, $checked_user_id)) {
        return false;
    }

    $_SESSION['authorized'] = 'true';
    $_SESSION['auth_user_id'] = $checked_user_id;

    remember_user($checked_user_id, $user_type, $db);

    return true;
}

// `````````

function check_user($user_id, $auth_key, $user_type, &$checked_user_id) {
    global $db;

    $sql_check_user = get_sql_check_user($user_type);

    try {
        $check_user_statement = $db->prepare($sql_check_user);
        $check_user_statement->bindValue(':auth_id', $user_id);
        $check_user_statement->execute();
    
        $user = $check_user_statement->fetch();
        
        if (
            !$check_user_statement->rowCount() || 
            $auth_key !== $user['donor_cookie_key']
        ) {
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

function get_sql_check_user($user_type) {
    $sql_check_user = sprintf(
        'SELECT %1$s_id, %1$s_cookie_key 
        FROM %1$ss 
        WHERE 
        (
            %1$s_cookie_id IS NOT NULL
            AND 
            %1$s_cookie_id = :auth_id
        )',
        $user_type
    );

    return $sql_check_user;
}

?>