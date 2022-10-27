<?php

header("Access-Control-Allow-Origin: *");
$arr = null;
$conn = new mysqli("localhost", "hybrid_160420079", "ubaya", "hybrid_160420079");

if ($conn->connect_error) {
    $arr = ["result" => "error", "message" => "Unable to connect"];
} else {
        extract($_POST);
        $komikId = $komik_id;
        $sql = "SELECT * FROM komiks WHERE id = $komik_id";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();

	    $sql1 = "SELECT k.nama FROM komiks_kategoris kk INNER JOIN kategoris k on kk.kategoris_id = k.id WHERE kk.komiks_id = $komik_id";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->execute();
        $result1 = $stmt1->get_result();

	    $sql2 = "SELECT * FROM users u INNER JOIN comment c on u.id = c.users_id WHERE c.komiks_id = $komik_id";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
	
	    $komik = [];
        $kategori = [];
        $comment = [];
        if ($result->num_rows > 0) {
            while ($r = mysqli_fetch_assoc($result)) {
                array_push($komik, $r);
            }
        } 
        if ($result1->num_rows > 0) {
            while ($r = mysqli_fetch_assoc($result1)) {
                array_push($kategori, $r);
            }
        }
        if ($result2->num_rows > 0) {
            while ($r = mysqli_fetch_assoc($result2)) {
                array_push($comment, $r);
            }
        }
        $komik['kategori'] = $kategori;
        $komik['comment'] = $comment;
        $arr = ["result" => "success", "data" => $komik];

    echo json_encode($arr);
    $stmt->close();
    $conn->close();
}
?>
