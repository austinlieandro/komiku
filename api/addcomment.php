<?php
header("Access-Control-Allow-Origin: *");

$arr = null;
include("connection.php");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
} else {
    extract($_POST);

    $sql = "INSERT INTO comment (users_id, komiks_id,comment) VALUES (?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sis", $user_id, $komik_id,$comment);
    $stmt->execute();

    $row_num = $stmt->affected_rows;
    if ($row_num > 0) {
        $arr = ["result" => "success"];
    } else {
        $arr = ["result" => "error", "message" => "Insert Comment Failed!"];
    }
}
echo json_encode($arr);
$conn->close();
