<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 창</title>
    <link rel="stylesheet" href="login.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Poetsen+One&display=swap"rel="stylesheet">
    <script src="login.js"></script>
</head>

<body>
    <header class="header">
        <div class="logo">
            <a href="../index.html">
                <img class="logo_img" src="../image/아이콘.png" alt="로고 이미지">
                <h1> DayDream<br> Capture Your Moment </h1>
            </a>
        </div>
        <div class="nav-container">
            <ul class="nav-list">
                <li>
                    <a href="../">Home</a>
                </li>
                <li>
                    <a href="../about.html">ABOUT</a>
                </li>
            </ul>
        </div>
    </header>

    <div class="login-container">
        <h2>회원가입</h2>

        <?php if(isset($_GET['error'])) {?>
        <p class="error"><?php echo $_GET['error']; ?></p>
        <?php } ?>

        <?php if(isset($_GET['success'])) {?>
        <p class="success"><?php echo $_GET['success']; ?></p>
        <?php } ?>

        <form action="../src/register_server.php" method="post">
            <label for="username">아이디</label>
            <input type="text" id="id" name="user_id" required>

            <label for="password">비밀번호</label>
            <input type="password" id="password" name="password1" required>

            <label for="password">비밀번호 확인</label>
            <input type="password" id="password" name="password2" required>
            <a href="login.php">이미 회원이신가요?</a>
            <button type="submit">회원가입</button>
        </form>
    </div>
</body>

</html>
