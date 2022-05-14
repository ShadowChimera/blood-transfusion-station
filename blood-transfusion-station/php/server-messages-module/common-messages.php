<?php

const SM_START_TAG = '<p class="server-message">';
const SM_END_TAG = '</p>';

$global_sm_log = [];

function addErrorToLog($message, $from) {
    addMessageToLog('error', $message, $from);

    // $global_sm_log[] = [
    //     'status' => 'error',
    //     'message' => getServerMessage($message),
    //     'from' => $from
    // ];
}

function addSuccessToLog($message, $from) {
    addMessageToLog('ok', $message, $from);
}

function addResultToLog($message, $result, $from) {
    addMessageToLog('ok', $message, $from, $result);
}

function addMessageToLog($status, $message, $from, $result = null) {
    global $global_sm_log;

    $new_message = [
        'status' => $status,
        'message' => getServerMessage($message),
        'from' => $from
    ];

    if ($result !== null) {
        $new_message['result'] = $result;
    }

    $global_sm_log[] = $new_message;
}

function getServerMessage($message) {
    return SM_START_TAG . $message . SM_END_TAG;
}

function sendLogAsResponse() {
    global $global_sm_log;
    echo json_encode($global_sm_log);
}


?>