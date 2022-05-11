<?php   include $_SERVER['DOCUMENT_ROOT'] . '/php/database-module/database.php';

$db = connectToDatabase();
if (is_null($db)) {
    $message = 'execution is not possible without a connection to the database';
    echo getServerMessage($message);
    return;
}

$message = 'database connection established';

echo getServerMessage($message);

?>