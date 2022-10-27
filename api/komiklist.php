<?php

header("Access-Control-Allow-Origin: *");
$arr = null;
include("connection.php");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
} else {
        extract($_POST);
        $sql = "";
        if(isset($_POST['kategori_id'])){
            $sql = "SELECT *,avg(r.nilai) as nilai FROM komiks k INNER JOIN komiks_kategoris kk ON k.id = kk.komiks_id INNER JOIN kategoris kg ON kk.kategoris_id = kg.id left join rating r on k.id = r.komiks_id WHERE kk.kategoris_id = $kategori_id group by k.id";
        }
        else{
            $sql = "SELECT *,avg(r.nilai) as nilai FROM komiks k left join rating r on k.id = r.komiks_id group by k.id";
        }
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
