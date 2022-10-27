<?php

header("Access-Control-Allow-Origin: *");
$arr = null;
include("connection.php");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
} else {
        extract($_POST);
        $sql = "SELECT k.id, k.judul, k.deskripsi,k.url_poster,avg(r.nilai) FROM komiks k left join rating r on k.id = r.komik_id WHERE judul LIKE '%$keyword%' GROUP BY k.id";
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
