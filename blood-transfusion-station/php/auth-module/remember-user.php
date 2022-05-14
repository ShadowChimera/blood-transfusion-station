<?php   include "salt.php";

function remember_user($user_id, $user_type, $db) {
    $cookie_time = time()+60*60*24*30;
    $sql_update_cookie = get_sql_update_cookie($user_type);

    try {
        $auto_auth_key = generateSalt();
        $auto_auth_id = $user_id . generateSalt(6);
        
        setcookie('AUTOAUTHTYPE', $user_type, $cookie_time, '/');
        setcookie('AUTOAUTHID', $auto_auth_id, $cookie_time, '/');
        setcookie('AUTOAUTHKEY', $auto_auth_key, $cookie_time, '/');

        $update_cookies_data = [
            ":cookie_key" => $auto_auth_key,
            ":cookie_id" => $auto_auth_id,
            ":user_id" => $user_id,
        ];

        $update_cookie_statement = $db->prepare($sql_update_cookie);
        $update_cookie_statement->execute($update_cookies_data);
    }
    catch (PDOException $e) {
        $message = "donor checking failed: <br>" . $e->getMessage();
        addErrorToLog($message, "auth-module/authorization.php");
        return false;
    }

    return true;
}

function get_sql_update_cookie($user_type) {
    $sql_update_cookie = sprintf(
        'UPDATE %1$ss 
        SET %1$s_cookie_key = :cookie_key, 
            %1$s_cookie_id = :cookie_id
        WHERE %1$s_id = :user_id',
        $user_type
    );

    return $sql_update_cookie;
}

?>