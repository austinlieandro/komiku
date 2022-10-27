<?php
    header("Access-Control-Allow-Origin: *");
$arr = null;
include("conn.php");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
} else {
        extract($_POST);
        $sql = "SELECT *,AVG(r.nilai) FROM `komiks` k INNER JOIN rating r on k.id = r.komik_id GROUP BY k.id  HAVING AVG(r.nilai) > 8.5 ORDER BY AVG(r.nilai) DESC ";
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
?>