<?php
session_start();
include("mysqlInc_final.php");
?>

<?php
	//echo $_GET['value'];
	$music_data = $_GET['music_data'];
	$music_name = $_GET['music_name'];//$_POST['name'];
	$user = $_GET['user'];
	$sql = "INSERT into music (Music_data,MusicName,Creater) values ('$music_data','$music_name','$user')";
	if(mysql_query($sql)) {
                echo "<script>alert(\"Save Success!\");</script>";
                echo '<meta http-equiv=REFRESH CONTENT=0;url=final_index.php>';
        }
        else {
                echo "<script>alert(\"Save Fail!\");</script>";
                echo '<meta http-equiv=REFRESH CONTENT=0;url=final_index.php>';
		}
?>

<html><head>
<link href="css/final.css" rel="stylesheet" type="text/css" />
</head>
<body>
</body>