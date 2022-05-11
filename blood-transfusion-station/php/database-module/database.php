<?php   include $_SERVER['DOCUMENT_ROOT'] . '/php/server-messages-module/common-messages.php';

const DB_HOST = 'localhost';
const DB_PORT = null;
const DB_NAME = 'blood_transfusion_station_db';
const DB_USERNAME = 'root';
const DB_PASSWORD = 'vjz,fpflfyys[';


// ```````````


function connectToDatabase() {
    $db_options = getDatabaseConnectionOptions();

    try {
        $db = new PDO($db_options, DB_USERNAME, DB_PASSWORD);
        return $db;
    }
    catch (PDOException $e) {
        $message = 'Connection to the database failed:<br>' . $e->getMessage();
        echo json_encode([
            'status' => 'error',
            'message' => getServerMessage($message),
            'from' => 'database-module/database.php'
        ]);
        return null;
    }
}


function getDatabaseConnectionOptions() {
    $options = 'mysql:';

    if (!is_null(DB_HOST)) {
        $options .= 'host=' . DB_HOST . ';';
    }
    if (!is_null(DB_PORT)) {
        $options .= 'port=' . DB_PORT . ';';
    }
    if (!is_null(DB_NAME)) {
        $options .= 'dbname=' . DB_NAME . ';';
    }

    return $options;
}

?>