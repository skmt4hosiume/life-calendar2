<?php

// 로그아웃 코드 

session_start();

//세션 종료
session_unset();
session_destroy();
header("Location: ../index.html");
exit();
?>
