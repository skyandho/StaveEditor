<?php
session_start();
include("mysqlInc_final.php");
?>

<?php
	$id = $_POST['id'];
	$nickname = $_POST['nickname'];
	$pwd = $_POST['pwd'];
	$repwd = $_POST['repwd'];
	
	if($id != null && $pwd != null && $repwd != null && $pwd == $repwd){
		$md5pwd=md5($pwd);
		 $sql = "INSERT into user (UserName, Password,NickName) values ('$id', '$md5pwd','$nickname')";
        if(mysql_query($sql)) {
                echo "<script>alert(\"Register Success!\");</script>";
                echo '<meta http-equiv=REFRESH CONTENT=0;url=final_login.php>';
        }
        else {
                echo "<script>alert(\"Register Fail!\");</script>";
                echo '<meta http-equiv=REFRESH CONTENT=0;url=final_login.php>';
		}
	}
		else {
			echo "<script>alert(\"Wrong Input Type!\");</script>";
			echo '<meta http-equiv=REFRESH CONTENT=0;url=final_login.php>';
		}
?>