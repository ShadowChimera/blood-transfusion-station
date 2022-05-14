<?php

const EMAIL_PATTERN = "/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i";
const PHONE_PATTERN = "/^\+\d{12}$/";
const PASSWORD_PATTERN = "/^[0-9a-zA-Z!@#$%^&*_]+$/";

function isEmailValid($email, $is_empty_allowed = true) {
    if ($is_empty_allowed && !$email) {
        return true;
    }
    
    return (bool) preg_match(EMAIL_PATTERN, $email);
}

function isPhoneValid($phone, $is_empty_allowed = true) {
    if ($is_empty_allowed && !$phone) {
        return true;
    }
    
    return (bool) preg_match(PHONE_PATTERN, $phone);
}

function isLoginValid($login) {
    return isEmailValid($login, false) || isPhoneValid($login, false);
}

function isPasswordValid($password) {
    return (bool) preg_match(PASSWORD_PATTERN, $password);
}

function isRegistrationDataValid($email, $phone, $password) {
    $isValid = true;
    // $message = "";

    if (is_null($email) && is_null($phone)) {
        $message = "email or phone can't be null";
        addErrorToLog($message, "auth-module/data-validation.php");
        $isValid = false;
    }
    if (is_null($password)) {
        $message = "password can't be null";
        addErrorToLog($message, "auth-module/data-validation.php");
        $isValid = false;
    }

    if (!$isValid) {
        // addErrorToLog($message, "auth-module/data-validation.php");
        return false;
    }
    
    // $message = "";
    
    if (!isEmailValid($email)) {
        $message = "email is invalid";
        addErrorToLog($message, "auth-module/data-validation.php");
        $isValid = false;
    }
    if (!isPhoneValid($phone)) {
        $message = "phone is invalid";
        addErrorToLog($message, "auth-module/data-validation.php");
        $isValid = false;
    }
    if (!isPasswordValid($password)) {
        $message = "password is invalid";
        addErrorToLog($message, "auth-module/data-validation.php");
        $isValid = false;
    }

    return $isValid;
    
    // if (!$isValid) {
    //     // addErrorToLog($message, "auth-module/data-validation.php");
    //     return false;
    // }

    // return true;
}

?>