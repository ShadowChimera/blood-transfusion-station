<?php

const EMAIL_PATTERN = '/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i';
// const PHONE_PATTERN = '/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/';
const PHONE_PATTERN = '/^\+\d{12}$/';
const PASSWORD_PATTERN = '/^[0-9a-zA-Z!@#$%^&*_]+$/';

function isEmailValid($email) {
    return (bool) preg_match(EMAIL_PATTERN, $email);
}

function isPhoneValid($phone) {
    return (bool) preg_match(PHONE_PATTERN, $phone);
}

function isPasswordValid($password) {
    return (bool) preg_match(PASSWORD_PATTERN, $password);
}

function isRegistrationParametersValid($email, $phone, $password) {
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
            'from' => 'auth-module/data-validation.php'
        ]);
        return false;
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
            'from' => 'auth-module/data-validation.php'
        ]);
        return false;
    }

    return true;
}

?>