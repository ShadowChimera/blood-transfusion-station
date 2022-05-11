<?php   include $_SERVER['DOCUMENT_ROOT'] . '/php/database-module/database.php';

$db = connectToDatabase();
if (is_null($db)) {
    $message = 'execution is not possible without a connection to the database';
    echo json_encode([
        'status' => 'error',
        'message' => getServerMessage($message),
        'from' => 'test.php'
    ]);
    return;
}

try {
    $sql = "SELECT * FROM donors WHERE donor_id = :donor_id";
    $stmt = $db->prepare($sql);
    $stmt->execute([':donor_id' => '2']);

    $row_count = $stmt->rowCount();
    
    $users_list = [];
    
    foreach($stmt as $user){
        $users_list[] = $user;
    }

    echo json_encode([
        'status' => 'ok',
        'message' => "row count: $row_count",
        'result' => $users_list,
        'from' => 'test.php'
    ]);
}
catch (PDOException $e) {
    $message = 'registration failed:<br>' . $e->getMessage();
    echo json_encode([
        'status' => 'error',
        'message' => getServerMessage($message),
        'from' => 'test.php'
    ]);
}

?>