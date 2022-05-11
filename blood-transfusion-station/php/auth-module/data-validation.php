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

?>