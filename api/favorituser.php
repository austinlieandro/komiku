<?php

header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160420079", "ubaya", "hybrid_160420079");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
} else {
        extract($_POST);
        $sql = "SELECT *,avg(r.nilai) as nilai FROM komiks k INNER JOIN favorit_users fu on k.id = fu.komiks_id left join rating r on k.id = r.komiks_id WHERE fu.users_id = $user_id group by k.id";
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
