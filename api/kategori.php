<?php

header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160420079", "ubaya", "hybrid_160420079");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
} else {
        $sql = "SELECT * FROM kategoris";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $kategori = [];
            while ($r = mysqli_fetch_assoc($result)) {
                array_push($kategori, $r);
            }

            $arr = ["result" => "success", "data" => $kategori];
        } else {
            $arr = ["result" => "error", "message" => "sql error : $sql"];
        }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
}
