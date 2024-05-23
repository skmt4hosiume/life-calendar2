<?php

// 로그인 상태 판별 코드

session_start();
$response = array('logged_in' => false);

if (isset($_SESSION['user_id'])) {
    $response['logged_in'] = true;
}

echo json_encode($response);
?>
