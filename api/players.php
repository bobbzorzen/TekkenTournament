<?
    ini_set('display_errors', 'on');
    $data = array(
        array("name" => "Player1", "score" => 15),
        array("name" => "Player2", "score" => 10),
        array("name" => "Player3", "score" => 5),
    );
    header('Content-Type: application/json');
    echo json_encode($data);
?>