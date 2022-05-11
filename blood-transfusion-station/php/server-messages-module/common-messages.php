<?php

const SM_START_TAG = '<p class="server-message">';
const SM_END_TAG = '</p>';

function getServerMessage($message) {
    return SM_START_TAG . $message . SM_END_TAG;
}

?>