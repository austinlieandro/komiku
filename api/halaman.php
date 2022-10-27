<?php

header("Access-Control-Allow-Origin: *");
$arr = null;
include("connection.php");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
} else {
        extract($_POST);
        $sql = "SELECT * FROM lembars WHERE komiks_id = $komik_id";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $komik = [];
            while ($r = mysqli_fetch_assoc($result)) {
                array_push($komik, $r);
            }

            $arr = ["result" => "success", "data" => $komik];
        } else {
            $arr = ["result" => "error", "message" => "sql error : $sql"];
        }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
}
