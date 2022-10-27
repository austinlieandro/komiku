<?php
    header("Access-Control-Allow-Origin: *");
    $arr = null;
    $conn = new mysqli("localhost", "hybrid_160420079", "ubaya", "hybrid_160420079");

    if($conn->connect_error){
        $arr = ["result" => "error", "message" => "Unable to connect"];
    }
    else{
        extract($_POST);
        $sql = "SELECT * FROM users where username='$user_id'
        and password='$user_password'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
	
	$data = [];
        
        if ($result->num_rows > 0) {
	$row = $result->fetch_assoc();
        array_push($data, $row);
        $arr=["result"=>"success","data"=>$data];
        } else {
        $arr= ["result"=>"error","message"=>"sql error: $sql"];
        }
        echo json_encode($arr);
        $stmt->close();
        $conn->close();
    }
