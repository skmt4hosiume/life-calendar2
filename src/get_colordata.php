<?php

// 각 날짜 정보를 불러와서 반환하는 코드

session_start();
require 'config.php';

// 사용자 아이디 가져오기
$user_id = $_SESSION['user_id'];

// 사용자의 colordata 조회
$sql_select = "SELECT colordata FROM info WHERE id = ?";
$stmt_select = mysqli_prepare($con, $sql_select);

// 바인딩 및 실행
mysqli_stmt_bind_param($stmt_select, "s", $user_id);
$result = mysqli_stmt_execute($stmt_select);


// 결과 가져오기
$result_set = mysqli_stmt_get_result($stmt_select);
$row = mysqli_fetch_assoc($result_set);
$colordata = $row['colordata'];

// 데이터 반환
echo $colordata;

// 리소스 해제
mysqli_stmt_close($stmt_select);
mysqli_close($con);

?>
