<?php

// 메모장 텍스트 저장하는 코드

session_start();
require 'config.php';

// 세션에서 user_id 가져오기
$user_id = $_SESSION['user_id'];

// 기존 데이터 가져오기 준비
$sql_select = "SELECT memodata FROM member WHERE id = ?";
$stmt_select = mysqli_prepare($con, $sql_select);

// 바인딩 및 실행
mysqli_stmt_bind_param($stmt_select, "s", $user_id);
$result_select = mysqli_stmt_execute($stmt_select);

if (!$result_select) {
    // 실행에 실패한 경우 == 로그인을 안한 상태인 경우
    echo json_encode(["status" => "error", "message" => "Failed to execute statement: " . mysqli_error($con)]);
    exit();
}

// 기존 데이터 가져오기
$result_set = mysqli_stmt_get_result($stmt_select);
$row = mysqli_fetch_assoc($result_set);

// memodata 값이 NULL인 경우 초기 값을 []로 설정
$existing_data = $row['memodata'] ? json_decode($row['memodata'], true) : [];

// 새로운 데이터 가져오기
$inputData = file_get_contents("php://input");
$new_data = isset($inputData) ? json_decode($inputData, true) : [];

// 새로운 데이터의 키와 값으로 기존 데이터 병합
$combined_data = array_merge($existing_data, $new_data);

// 중복된 키를 덮어쓰기 위해 빈 배열 사용
$uniqueData = [];

// 배열을 순회하며 키에 해당하는 값 덮어쓰기
foreach ($combined_data as $item) {
    foreach ($item as $key => $value) {
        $uniqueData[$key] = $value;
    }
}

// 최종 배열로 변환
$filteredDataArray = [];
foreach ($uniqueData as $key => $value) {
    $filteredDataArray[] = [$key => $value];
}


// 업데이트
$sql_update = "UPDATE member SET memodata = ? WHERE id = ?";
$stmt_update = mysqli_prepare($con, $sql_update);

if (!$stmt_update) {
    // 쿼리 준비에 실패한 경우
    echo json_encode(["status" => "error", "message" => "Failed to prepare statement: " . mysqli_error($con)]);
    exit;
}

// JSON 형식으로 변환하여 바인딩 및 실행
$json_combined_colordata = json_encode($filteredDataArray, JSON_UNESCAPED_UNICODE);
mysqli_stmt_bind_param($stmt_update, "ss", $json_combined_colordata, $user_id);
$result_update = mysqli_stmt_execute($stmt_update);

if ($result_update) {
    // 성공한 경우
    echo json_encode(["status" => "success", "message" => "Data successfully updated"]);
} else {
    // 실패한 경우
    echo json_encode(["status" => "error", "message" => "Failed to update data: " . mysqli_error($con)]);
}

// 리소스 해제
mysqli_stmt_close($stmt_select);
mysqli_stmt_close($stmt_update);
mysqli_close($con);

?>