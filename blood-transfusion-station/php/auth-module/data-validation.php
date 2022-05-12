<?php

const EMAIL_PATTERN = '/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i';
// const PHONE_PATTERN = '/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/';
const PHONE_PATTERN = '/^\+\d{12}$/';
const PASSWORD_PATTERN = '/^[0-9a-zA-Z!@#$%^&*_]+$/';

function isEmailValid($email) {
    if ($email === null) {
        return true;
    }
    
    return (bool) preg_match(EMAIL_PATTERN, $email);
}

function isPhoneValid($phone) {
    if ($phone === null) {
        return true;
    }
    
    return (bool) preg_match(PHONE_PATTERN, $phone);
}

function isPasswordValid($password) {
    return (bool) preg_match(PASSWORD_PATTERN, $password);
}

function isRegistrationParametersValid($email, $phone, $password) {
    $isValid = true;
    $message = '';

    if (is_null($email) && is_null($phone)) {
        $message .= "email or phone can't be null; ";
        $isValid = false;
    }
    if (is_null($password)) {
        $message = "password can't be null; ";
        $isValid = false;
    }

    if (!$isValid) {
        addErrorToLog($message, 'auth-module/data-validation.php');
        return false;
    }
    
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
        addErrorToLog($message, 'auth-module/data-validation.php');
        return false;
    }

    return true;
}

?>