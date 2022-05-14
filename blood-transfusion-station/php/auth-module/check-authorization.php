<?php   include "auto-authorization.php";;
        session_start();

$authorized = false;

if (isset($_SESSION["authorized"])) {
    $authorized = $_SESSION["authorized"];

    if ($authorized === "true") {
        $authorized = true;
    }
    else {
        $authorized = false;
    }
}

if (!$authorized) {
    $authorized = doAutoAuthorization();
}

addResultToLog(null, $authorized, "auth-module/check-authorization.php");
sendLogAsResponse();

?>