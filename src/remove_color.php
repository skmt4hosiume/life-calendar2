<?php

// 선택된 날짜의 색깔 및 정보를 데이터베이스에서 제거하는 코드

session_start();
require 'config.php';

// 세션에서 user_id 가져오기
$user_id = $_SESSION['user_id'];

// 로그인 상태 체크
if (!isset($_SESSION['user_id'])) {
    exit;
}

// 기존 데이터 가져오기
$sql_select = "SELECT colordata FROM info WHERE id = ?";
$stmt_select = mysqli_prepare($con, $sql_select);

// 바인딩 및 실행
mysqli_stmt_bind_param($stmt_select, "s", $user_id);
$result_select = mysqli_stmt_execute($stmt_select);

if (!$result_select) {
    // 실행에 실패한 경우 == 로그인을 안한 상태인 경우
    echo json_encode(["status" => "error", "message" => "Failed to execute statement: " . mysqli_error($con)]);
    exit;
}

// 결과 가져오기
$result_set = mysqli_stmt_get_result($stmt_select);
$row = mysqli_fetch_assoc($result_set);
$existing_colordata = json_decode($row['colordata'], true);

// 삭제할 항목의 id
$delete_id = file_get_contents("php://input");

// colordata에서 삭제할 항목 찾아서 제거
foreach ($existing_colordata as $index => $element) {
    foreach ($element as $key => $value) {
        if ($key === $delete_id) {
            unset($existing_colordata[$index]);
        }
    }
}

// colordata 업데이트
$sql_update = "UPDATE info SET colordata = ? WHERE id = ?";
$stmt_update = mysqli_prepare($con, $sql_update);

if (!$stmt_update) {
    // 쿼리 준비에 실패한 경우
    echo json_encode(["status" => "error", "message" => "Failed to prepare statement: " . mysqli_error($con)]);
    exit;
}

// JSON 형식으로 변환하여 바인딩 및 실행
$json_colordata = json_encode($existing_colordata);
mysqli_stmt_bind_param($stmt_update, "ss", $json_colordata, $user_id);
$result_update = mysqli_stmt_execute($stmt_update);

if ($result_update) {
    // 성공한 경우
    echo json_encode(["status" => "success", "message" => "Item with id '$delete_id' successfully deleted from colordata"]);
} else {
    // 실패한 경우
    echo json_encode(["status" => "error", "message" => "Failed to delete item from colordata: " . mysqli_error($con)]);
}

// 리소스 해제
mysqli_stmt_close($stmt_select);
mysqli_stmt_close($stmt_update);
mysqli_close($con);

?>
