<?php
session_start();
include("mysqlInc_final.php");
?>

<?php
	$creater = $_SESSION['UserName'];
	$sql = "SELECT * FROM music where Creater = '$creater'";
	$result = mysql_query($sql);
	while($row = mysql_fetch_array($result)){
		if($row['State']==2){
			echo "<a href=\"music\\".$creater."_".$row['MusicName']."\">".$row['MusicName']."</a>";
			echo "</br>";
		}
	}

?>

<html>
<head>
	<link href="css/final.css" rel="stylesheet" type="text/css" />
</head>
<body>
</body>
</html>