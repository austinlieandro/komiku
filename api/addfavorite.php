<?php
header("Access-Control-Allow-Origin: *");

$arr = null;
include("connenction.php");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
} else {
    extract($_POST);

    $sql = "INSERT INTO favorit_users (users_id, komiks_id) VALUES (?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $user_id, $komik_id);
    $stmt->execute();

    $row_num = $stmt->affected_rows;
    if ($row_num > 0) {
        $arr = ["result" => "success"];
    } else {
        $arr = ["result" => "error", "message" => "Insert Favorite Failed!"];
    }
}
echo json_encode($arr);
$conn->close();
