<?php

const SM_START_TAG = '<p class="server-message">';
const SM_END_TAG = '</p>';

$global_sm_log = [];

function getServerMessage($message) {
    return SM_START_TAG . $message . SM_END_TAG;
}

function addErrorToLog($message, $from) {
    global $global_sm_log;

    $global_sm_log[] = [
        'status' => 'error',
        'message' => getServerMessage($message),
        'from' => $from
    ];
}

function sendLogAsResponse() {
    global $global_sm_log;
    echo json_encode($global_sm_log);
}

?>