<?php 

// 로그인 코드

session_start();
include 'config.php';

$user_id = mysqli_real_escape_string($con, $_POST['user_id']);
$password = mysqli_real_escape_string($con, $_POST['password']);

$sql_same = "select * from info where id = '$user_id'";
$order = mysqli_query($con, $sql_same);

// 아이디가 없으면
if (mysqli_num_rows($order) === 0) {
    header("Location: ../loginProcess/login.php?error=아이디가 존재하지 않아요.");
    exit();
}  
else {
    $user = mysqli_fetch_assoc($order);
    $hashed_password = $user['password'];

    // 비밀번호 일치 확인 
    if (password_verify($password, $hashed_password)) {
        // 로그인 성공 시 세션 변수 설정
        $_SESSION['user_id'] = $user_id;
        header("Location: ../index.html");
    } else {
        header("Location: ../loginProcess/login.php?error=비밀번호가 일치하지 않아요.");
    }
    exit();
}


?>