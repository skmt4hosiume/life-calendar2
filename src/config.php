<?php 

$con = mysqli_connect('localhost', 'user', '12345', 'calendar');

if ($con) {
    print "DB접속 성공";
} else {
    print "DB접속 실패";
}

?>