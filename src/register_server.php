<?php 

// 회원가입 코드

include 'config.php';

// 문자 이스케이프 처리 (SQL인젝션 공격 방지를 위한 절차)
$user_id = mysqli_real_escape_string($con, $_POST['user_id']);
$password1 = mysqli_real_escape_string($con, $_POST['password1']);
$password2 = mysqli_real_escape_string($con, $_POST['password2']);

if ($password1 !== $password2) {
    header("Location: ../loginProcess/register.php?error=비밀번호가 일치하지 않아요.");
    exit();
}

//암호화
$password1 = password_hash($password1, PASSWORD_DEFAULT);

// id 중복체크
$sql_same = "select * from info where id = '$user_id'";
$order = mysqli_query($con, $sql_same);

if (mysqli_num_rows($order) > 0) {
    header("Location: ../loginProcess/register.php?error=아이디가 이미 있어요.");
    exit();
}
else {
    $sql_save = "INSERT INTO `info`(`id`, `password`) VALUES ('$user_id','$password1')";
    $result = mysqli_query($con, $sql_save);

    if ($result) {
        header("Location: ../loginProcess/register.php?success=성공적으로 가입이 되었습니다.");
        exit();
    }
}

?>