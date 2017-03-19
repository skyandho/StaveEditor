<?php
session_start();
include("mysqlInc_final.php");
?>
 
<?php
if($_SESSION['UserName']!=null){ // 如果登入過，則直接轉到登入後頁面
    echo '<meta http-equiv=REFRESH CONTENT=0;url=final_index.php>';
}
else {
    $acc = $_POST['account'];
    $pwd = $_POST['password'];
    $acc = preg_replace("/[^A-Za-z0-9]/","",$acc);//正規
    $pwd = preg_replace("/[^A-Za-z0-9]/","",$pwd);
    if($acc!=NULL && $pwd!=NULL){
        $sql = "SELECT UserName, password, NickName FROM user where UserName = '$acc'";
        $result = mysql_query($sql);
        $row = mysql_fetch_array($result);
        // 比對密碼
        if($row['password']==md5($pwd)){		
            $_SESSION['UserName'] = $row['UserName'];
            $_SESSION['password'] = $row['password'];
            $_SESSION['NickName'] = $row['NickName'];
			echo "<script>alert(\"Login Success!\");</script>";
            echo '<meta http-equiv=REFRESH CONTENT=0;url=final_index.php>';
        }
		else echo "<script>alert(\"Wrong password or account!\");</script>";
    }
     
}
?>
 
<html><head>
<link href="css/final.css" rel="stylesheet" type="text/css" />
</head>
<body>
 <center>
	 <table>
		<td>
			<form name="login" action="final_login.php" method="post">
				<p>LOGIN</p>
				<p>account:<input type="text" name="account"></p>
				<p>password:<input type="password" name="password"></p>
				<input type="submit" value="login">
			</form>
		</td>
		<td>
			<form name="register" action="final_register.php" method="post" >
				<p>REGISTER</p>
				<p>account:<input type="text" name="id"></p>
				<p>nickname:<input type="text" name="nickname"></p>
				<p>password:<input type="password" name="pwd"></p>
				<p>re-type password:<input type="password" name="repwd"></p>
				<input type="submit" value="register">
			</form> 
		</td>
	</table>
</center>
</body></html>