<?php
session_start();
include("mysqlInc_final.php");
?>

<?php
if($_SESSION['UserName']==null){
    echo '<meta http-equiv=REFRESH CONTENT=0;url=final_login.php>';
}
else {
	echo"Hi," ."<font id=\"creater\">".$_SESSION['UserName']."</font>"."(".$_SESSION['NickName'].")";
	//echo "<p id=\"creater\">".$_SESSION['UserName']."</p>";
}
?>

<html> 
<a href="final_logout.php"><input type="button"  value="logout"></a>
<head>
	<title>final_v0.7</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link href="css/final.css" rel="stylesheet" type="text/css" />
	<link rel="shortcut icon" href="http://m99.nthu.edu.tw/~s9962201/src/sheep.ico">  
	<script src="js/vexflow-min.js" type="text/javascript"></script>
	<script src="js/jquery-1.8.3.js" type="text/javascript"></script>
	<script src="js/raphael.js" type="text/javascript"></script>

</head>

<body>
<div class="others">
<form name="adjust" class="others">
	<select name="ndur" style="DISPLAY: none">
        <option>16th note</option>
        <option>8th note</option>
        <option selected>Quarter note</option>
        <option>Half note</option>
		<option>Whole note</option>
		<option>Dotted 16th note</option>
        <option>Dotted 8th note</option>
        <option>Dotted quarter note</option>
        <option>Dotted half note</option>
    </select>
	<select name="shafla" style="DISPLAY: none">
        <option selected>normal</option>
        <option>sharp</option>
        <option>flat</option>
		<option>natural</option>
    </select>
	<select name="high" style="DISPLAY: none">
        <option>High</option>
        <option selected>Middle</option>
        <option>Low</option>
    </select>
	<select name="rest" style="DISPLAY: none">
		<option selected>no rest</option>
        <option>16th rest</option>
        <option>8th rest</option>
        <option>Quarter rest</option>
        <option>Half rest</option>
		<option>Whole rest</option>
    </select>
	<br>
	<p class="titles">MusicName:
	<input type="text" id="music_name" name="music_name" size="8"></p>
	<input type="button" name="save" class="csave" value="SAVE" onclick="saved()" onMouseOver="this.style.backgroundColor='rgba(255,255,153,0.8)'" onMouseOut="this.style.backgroundColor='rgba(255,255,153,0.5)'">
	<input type="submit" name="download" class="cdownload" value="DOWNLOAD" onMouseOver="this.style.backgroundColor='rgba(255,255,153,0.8)'" onMouseOut="this.style.backgroundColor='rgba(255,255,153,0.5)'">


</form>
</div>
<!--<form name="save" action="final_save.php" method="post">
	<input type="submit" name="save"  value="save">-->

<div class="functions">
<form name="note" class="cnote">
<table border="2">
	<tr>
		<td class="target" onclick="noteOnclick()"><img name="selected" src="pics/note/quarter_note.png" width="18"></td>
		<td id="ok1" onclick="document.adjust.ndur.value='16th note';document.note.selected.src='pics/note/sixteenth_note.png'"><img id="u" src="pics/note/sixteenth_note.png" width="18"></td>
		<td id="ok2" onclick="document.adjust.ndur.value='8th note';document.note.selected.src='pics/note/eighth_note.png'"><img src="pics/note/eighth_note.png" width="18"></td>
		<td id="ok3" onclick="document.adjust.ndur.value='Quarter note';document.note.selected.src='pics/note/quarter_note.png'"><img src="pics/note/quarter_note.png" width="18"></td>
		<td id="ok4" onclick="document.adjust.ndur.value='Half note';document.note.selected.src='pics/note/half_note.png'"><img src="pics/note/half_note.png" width="18"></td>
		<td id="ok5" onclick="document.adjust.ndur.value='Whole note';document.note.selected.src='pics/note/whole_note.png'"><img src="pics/note/whole_note.png" width="18"></td>
		<td id="ok6" onclick="document.adjust.ndur.value='Dotted 8th note';document.note.selected.src='pics/note/deighth_note.png'"><img src="pics/note/deighth_note.png" width="18"></td>
		<td id="ok7" onclick="document.adjust.ndur.value='Dotted quarter note';document.note.selected.src='pics/note/dquarter_note.png'"><img src="pics/note/dquarter_note.png" width="18"></td>
		<td id="ok8" onclick="document.adjust.ndur.value='Dotted half note';document.note.selected.src='pics/note/dhalf_note.png'"><img src="pics/note/dhalf_note.png" width="18"></td>
	</tr>
	

</table>
</form>
<form name="shafla" class="cshafla">
<table border="2">
	<tr>
		<td class="target" onclick="shaflaOnclick()"><img name="selected" src="pics/shafla/cross.png" width="10"></td>
		<td id="s" onclick="document.adjust.shafla.value='sharp';document.shafla.selected.src='pics/shafla/sharp.png'"><img id="u" src="pics/shafla/sharp.png" width="10"></td>
		<td id="f" onclick="document.adjust.shafla.value='flat';document.shafla.selected.src='pics/shafla/flat.png'"><img src="pics/shafla/flat.png" width="10"></td>
		<td id="n" onclick="document.adjust.shafla.value='natural';document.shafla.selected.src='pics/shafla/natural.png'"><img src="pics/shafla/natural.png" width="10"></td>
		<td id="c" onclick="document.adjust.shafla.value='normal';document.shafla.selected.src='pics/shafla/cross.png'"><img src="pics/shafla/cross.png" width="10"></td>
	</tr>
</table>
</form>
<form name="high" class="chigh">
<table border="2">
	<tr>
		<td class="target" onclick="highOnclick()"><img name="selected" src="pics/high/middle.png" width="18"></td>
		<td id="ihigh" onclick="document.adjust.high.value='High';document.high.selected.src='pics/high/high.png'"><img id="u" src="pics/high/high.png" width="18"></td>
		<td id="middle" onclick="document.adjust.high.value='Middle';document.high.selected.src='pics/high/middle.png'"><img src="pics/high/middle.png" width="18"></td>
		<td id="low" onclick="document.adjust.high.value='Low';document.high.selected.src='pics/high/low.png'"><img src="pics/high/low.png" width="18"></td>
	</tr>
</table>
</form>
<form name="rest" class="crest">
<table border="2">
	<tr>
		<td class="target" onclick="restOnclick()"><img name="selected" src="pics/rest/cross.png" width="18"></td>
		<td id="sixteenth" onclick="document.adjust.rest.value='16th rest';document.rest.selected.src='pics/rest/16th_rest.png'"><img id="u" src="pics/rest/16th_rest.png" width="18"></td>
		<td id="eighth" onclick="document.adjust.rest.value='8th rest';document.rest.selected.src='pics/rest/8th_rest.png'"><img src="pics/rest/8th_rest.png" width="18"></td>
		<td id="quarter" onclick="document.adjust.rest.value='Quarter rest';document.rest.selected.src='pics/rest/quarter_rest.png'"><img src="pics/rest/quarter_rest.png" width="18"></td>
		<td id="half" onclick="document.adjust.rest.value='Half rest';document.rest.selected.src='pics/rest/half_rest.png'"><img src="pics/rest/half_rest.png" width="18"></td>
		<td id="whole" onclick="document.adjust.rest.value='Whole rest';document.rest.selected.src='pics/rest/whole_rest.png'"><img src="pics/rest/whole_rest.png" width="18"></td>
		<td id="no" onclick="document.adjust.rest.value='no rest';document.rest.selected.src='pics/rest/cross.png'"><img src="pics/rest/cross.png" width="18"></td>
	</tr>
</table>
</form>
<form name="fmami" class="cmami">
	<select name="mami" onChange="keyChange()">
        <option>C</option>
        <option selected>F</option>
        <option>Bb</option>
        <option>Eb</option>
		<option>Db</option>
		<option>Gb</option>
		<option>Cb</option>
		<option>A</option>
		<option>G</option>
		<option>D</option>
		<option>E</option>
		<option>B</option>
		<option>F#</option>
		<option>C#</option>
		<option>Am</option>
		<option>Dm</option>
		<option>Gm</option>
		<option>Cm</option>
		<option>Fm</option>
		<option>Bb</option>
		<option>Eb</option>
		<option>Ab</option>
		<option>Em</option>
		<option>Bm</option>
		<option>F#</option>
		<option>C#</option>
		<option>G#</option>
		<option>D#</option>
		<option>A#</option>
    </select>
</form>	
<form name="endout">
	<input type="button" name="endstart" class="cend" value="END" title="結束編譜" onclick="endstave()" onMouseOver="this.style.backgroundColor='rgba(255,255,153,0.8)'" onMouseOut="this.style.backgroundColor='rgba(255,255,153,0.5)'">
	<input type="button" name="noutput" class="coutput" value="OUTPUT" title="輸出樂譜" onclick="output();" onMouseOver="this.style.backgroundColor='rgba(255,255,153,0.8)'" onMouseOut="this.style.backgroundColor='rgba(255,255,153,0.5)'">
</form>

</div>

<br>

<div class="content">
    <div class="description one">
		<div class="example a" example="a">
		<canvas id="myCanvas" width="1030" height="600"></canvas>
				
		</div>
    </div>
</div>
<script src="js/final.js" type="text/javascript"></script>
</body>
</html>