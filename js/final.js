var  canvas = $("div.one div.a canvas")[0];
var  renderer = new Vex.Flow.Renderer(canvas,Vex.Flow.Renderer.Backends.CANVAS);
var  ctx = renderer.getContext();
staveBar = new Array();//小節
notesBar = new Array();//音符
var  MUSIC_DATA = new Array();
var  k;
var  key;
key=document.fmami.mami.value;
/*--------------------------------輸出樂譜-------------------------------------*/
function output() {
	window.open(document.getElementById('myCanvas').toDataURL());
}
/*--------------------------------印出三行--------------------------------------*/
for(k=1;k<13;k++){//選擇要幾個小節		
	key=document.fmami.mami.value;
	if(k==1){
		staveBar[k] = new Vex.Flow.Stave(10, 40, 250);
		staveBar[k].addClef("treble");
		staveBar[k].addTimeSignature("4/4");//4/4拍(一小節4拍,4分音符為一拍)
		staveBar[k].addKeySignature(key);//D大調(所以會有升fa升Do)
		staveBar[k].setContext(ctx).draw();
		notesBar[k] = [];//空的音符群
		// Helper function to justify and draw a 4/4 voice
		Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[k], notesBar[k]);
	}
	else if(k!=1&&k%4==1){
		staveBar[k] = new Vex.Flow.Stave(staveBar[k-4].x, staveBar[k-4].y+staveBar[k-4].height, 250);
		staveBar[k].addClef("treble");
		staveBar[k].addKeySignature(key);
		staveBar[k].setContext(ctx).draw();
		notesBar[k] = [];//空的音符群
		// Helper function to justify and draw a 4/4 voice
		Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[k], notesBar[k]);
	}
	else{
		staveBar[k] = new Vex.Flow.Stave(staveBar[k-1].width + staveBar[k-1].x, staveBar[k-1].y, 250);
		
		staveBar[k].setContext(ctx).draw();
		notesBar[k] = [];
		Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[k], notesBar[k]);      
	}						
}					
var beat=0;
var i=1;
var a;//印全部小節，k來記錄tot多少，所以k不能被洗掉
var dur;//音長
var durn;//音長1
var durn_java;
var restSignal;
/*-----------------------------加音符------------------------------------------*/
function add(){//更動:先決定要不要換小節，才考慮加音符，這會影響結束音節的功能
	if(event.keyCode==49||event.keyCode==50||event.keyCode==51||event.keyCode==52||event.keyCode==53||event.keyCode==54||event.keyCode==55||event.keyCode==82){
		if(close==1){return;}
		if(beat == 4){//換下一個小節
			beat = 0;
			i++;
		}						
		if(i>k-1){
			addstave();
		}
		restSignal = document.adjust.rest.value;
		dur = document.adjust.ndur.value;
		if(event.keyCode==49||event.keyCode==50||event.keyCode==51||event.keyCode==52||event.keyCode==53||event.keyCode==54||event.keyCode==55){
			if(dur == "Quarter note"){beat += 1;durn = "q";durn_java="q";}//一拍(四分音符)
			else if(dur == "8th note"){beat += 0.5;durn = "8";durn_java="i";}//半拍(八分音符)
			else if(dur == "16th note"){beat += 0.25;durn = "16";durn_java="s";}//四分之一拍(十六分音符)
			else if(dur == "Half note"){beat += 2;durn = "h";durn_java="h";}//兩拍(二分音符)
			else if(dur == "Whole note"){beat += 4;durn = "w";durn_java="w";}//四拍(全音符)
			else if(dur == "Dotted quarter note"){beat += 1.5;durn = "qd";}//一拍半(附點四分音符)
			else if(dur == "Dotted 8th note"){beat += 0.75;durn = "8d";}//(附點八分音符)
			else if(dur == "Dotted 16th note"){beat += 0.375;durn = "16d";}//(附點十六分音符)
			else if(dur == "Dotted half note"){beat += 3;durn = "hd";}//三拍(附點二分音符)
		}
		else if(event.keyCode==82){
			if(restSignal == "Quarter rest"){beat += 1;durn = "qr";durn_java="q";}//休息一拍(四分休止符)
			else if(restSignal == "8th rest"){beat += 0.5;durn = "8r";durn_java="i";}//休息半拍(八分休止符)
			else if(restSignal == "16th rest"){beat += 0.25;durn = "16r";durn_java="s";}//休息四分之一拍(十六分休止符)
			else if(restSignal == "Half rest"){beat += 2;durn = "hr";durn_java="h";}//休息兩拍(二分休止符)
			else if(restSignal == "Whole rest"){beat += 4;durn = "wr";durn_java="w";}//休息四拍(全休止符)
		}
		
		//超過4拍(4 beats)的話就不給填，加上去的beat要扣回來
		if(beat > 4){
			alert("exceeds 4 beat!");
			if(event.keyCode==49||event.keyCode==50||event.keyCode==51||event.keyCode==52||event.keyCode==53||event.keyCode==54||event.keyCode==55){
				if(dur == "Quarter note"){beat -= 1;durn = "q";}
				else if(dur == "8th note"){beat -= 0.5;durn = "8";}
				else if(dur == "16th note"){beat -= 0.25;durn = "16";}
				else if(dur == "Half note"){beat -= 2;durn = "h";}
				else if(dur == "Whole note"){beat -= 4;durn = "w";}
				else if(dur == "Dotted quarter note"){beat -= 1.5;durn = "q";}
				else if(dur == "Dotted 8th note"){beat -= 0.75;durn = "8";}
				else if(dur == "Dotted 16th note"){beat -= 0.375;durn = "16";}
				else if(dur == "Dotted half note"){beat -= 3;durn = "h";}
			}
			else if(event.keyCode==82){
				if(restSignal == "Quarter rest"){beat -= 1;durn = "qr";}//休息一拍(四分休止符)
				else if(restSignal == "8th rest"){beat -= 0.5;durn = "8r";}//休息半拍(八分休止符)
				else if(restSignal == "16th rest"){beat -= 0.25;durn = "16r";}//休息四分之一拍(十六分休止符)
				else if(restSignal == "Half rest"){beat -= 2;durn = "hr";}//休息兩拍(二分休止符)
				else if(restSignal == "Whole rest"){beat -= 4;durn = "wr";}//休息四拍(全休止符)
			}
			return;
		}
		//alert("beat = "+beat);
		ctx.clearRect(10,0,canvas.width,canvas.height);
		//stave.addClef("treble");
		for(a = 1; a < k; a++){//全部小節都印一遍
			staveBar[a].setContext(ctx).draw();
		}
		if(document.adjust.high.value=="Middle"){
			if(document.adjust.shafla.value=="normal"){				
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/4"] , duration: durn }).addDotToAll());MUSIC_DATA.push("C4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/4"] , duration: durn }));MUSIC_DATA.push("C4"+durn_java);}}
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/4"] , duration: durn }).addDotToAll());MUSIC_DATA.push("d4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/4"] , duration: durn }));MUSIC_DATA.push("d4"+durn_java);}
				}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/4"] , duration: durn }).addDotToAll());MUSIC_DATA.push("e4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/4"] , duration: durn }));MUSIC_DATA.push("e4"+durn_java);}}
				else if(event.keyCode==52){if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/4"] , duration: durn }).addDotToAll());MUSIC_DATA.push("f4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/4"] , duration: durn }));MUSIC_DATA.push("f4"+durn_java);}}
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/4"] , duration: durn }).addDotToAll());MUSIC_DATA.push("g4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/4"] , duration: durn }));MUSIC_DATA.push("g4"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/4"] , duration: durn }).addDotToAll());MUSIC_DATA.push("a4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/4"] , duration: durn }));MUSIC_DATA.push("a4"+durn_java);}				}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }).addDotToAll());MUSIC_DATA.push("b4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("b4"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
			else if(document.adjust.shafla.value=="sharp"){
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("C#4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("C#4"+durn_java);}}
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("D#4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("D#4"+durn_java);}}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("E#4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("E#4"+durn_java);}}
				else if(event.keyCode==52){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("F#4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("F#4"+durn_java);}}
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("G#4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("G#4"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("A#4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("A#4"+durn_java);}}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("B#4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b#/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("B#4"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
			else if(document.adjust.shafla.value=="flat"){
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["cb/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Cb4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["cb/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Cb4"+durn_java);}}				
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["db/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Db4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["db/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Db4"+durn_java);}}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["eb/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Eb4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["eb/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Eb4"+durn_java);}}
				else if(event.keyCode==52){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["fb/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Fb4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["fb/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Fb4"+durn_java);}}					
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["gb/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Gb4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["gb/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Gb4"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["ab/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Ab4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["ab/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Ab4"+durn_java);}}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["bb/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Bb4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["bb/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Bb4"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
			else if(document.adjust.shafla.value=="natural"){
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Cn4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Cn4"+durn_java);}}				
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Dn4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Dn4"+durn_java);}}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("En4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("En4"+durn_java);}}
				else if(event.keyCode==52){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Fn4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Fn4"+durn_java);}}
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Gn4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Gn4"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("An4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("An4"+durn_java);}}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Bn4"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Bn4"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
		}
		if(document.adjust.high.value=="High"){
			if(document.adjust.shafla.value=="normal"){
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/5"] , duration: durn , stem_direction: -1}).addDotToAll());MUSIC_DATA.push("C5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/5"] , duration: durn , stem_direction: -1}));MUSIC_DATA.push("C5"+durn_java);}}				
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/5"] , duration: durn , stem_direction: -1}).addDotToAll());MUSIC_DATA.push("D5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/5"] , duration: durn , stem_direction: -1}));MUSIC_DATA.push("D5"+durn_java);}}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/5"] , duration: durn , stem_direction: -1}).addDotToAll());MUSIC_DATA.push("E5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/5"] , duration: durn , stem_direction: -1}));MUSIC_DATA.push("E5"+durn_java);}}
				else if(event.keyCode==52){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/5"] , duration: durn , stem_direction: -1}).addDotToAll());MUSIC_DATA.push("F5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/5"] , duration: durn , stem_direction: -1}));MUSIC_DATA.push("F5"+durn_java);}}
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/5"] , duration: durn , stem_direction: -1}).addDotToAll());MUSIC_DATA.push("G5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/5"] , duration: durn , stem_direction: -1}));MUSIC_DATA.push("G5"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/5"] , duration: durn , stem_direction: -1}).addDotToAll());MUSIC_DATA.push("A5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/5"] , duration: durn , stem_direction: -1}));MUSIC_DATA.push("A5"+durn_java);}}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/5"] , duration: durn , stem_direction: -1}).addDotToAll());MUSIC_DATA.push("B5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/5"] , duration: durn , stem_direction: -1}));MUSIC_DATA.push("B5"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
			else if(document.adjust.shafla.value=="sharp"){
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("C#5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("C#5"+durn_java);}}					
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("D#5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("D#5"+durn_java);}}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("E#5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("E#5"+durn_java);}}
				else if(event.keyCode==52){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("F#5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("F#5"+durn_java);}}
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("G#5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("G#5"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("A#5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("A#5"+durn_java);}}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("B#5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("B#5"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
			else if(document.adjust.shafla.value=="flat"){
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Cb5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Cb5"+durn_java);}}				
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Db5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Db5"+durn_java);}}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Eb5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Eb5"+durn_java);}}
				else if(event.keyCode==52){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Fb5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Fb5"+durn_java);}}
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Gb5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Gb5"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Ab5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Ab5"+durn_java);}}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Bb5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b#/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Bb5"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
			else if(document.adjust.shafla.value=="natural"){
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Cn5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Cn5"+durn_java);}}					
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Dn5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Dn5"+durn_java);}}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("En5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("En5"+durn_java);}}
				else if(event.keyCode==52){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Fn5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Fn5"+durn_java);}}
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Gn5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Gn5"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("An5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("An5"+durn_java);}}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Bn5"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/5"] , duration: durn , stem_direction: -1}).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Bn5"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
			
		}
		if(document.adjust.high.value=="Low"){
			if(document.adjust.shafla.value=="normal"){
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/3"] , duration: durn }).addDotToAll());MUSIC_DATA.push("C3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/3"] , duration: durn }));MUSIC_DATA.push("C3"+durn_java);}}
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/3"] , duration: durn }).addDotToAll());MUSIC_DATA.push("D3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/3"] , duration: durn }));MUSIC_DATA.push("D3"+durn_java);}}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/3"] , duration: durn }).addDotToAll());MUSIC_DATA.push("E3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/3"] , duration: durn }));MUSIC_DATA.push("E3"+durn_java);}}
				else if(event.keyCode==52){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/3"] , duration: durn }).addDotToAll());MUSIC_DATA.push("F3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/3"] , duration: durn }));MUSIC_DATA.push("F3"+durn_java);}}
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/3"] , duration: durn }).addDotToAll());MUSIC_DATA.push("G3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/3"] , duration: durn }));MUSIC_DATA.push("G3"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/3"] , duration: durn }).addDotToAll());MUSIC_DATA.push("A3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/3"] , duration: durn }));MUSIC_DATA.push("A3"+durn_java);}}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/3"] , duration: durn }).addDotToAll());MUSIC_DATA.push("B3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/3"] , duration: durn }));MUSIC_DATA.push("B3"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
			else if(document.adjust.shafla.value=="sharp"){
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("C#3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("C#3"+durn_java);}}
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("D#3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("D#3"+durn_java);}}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("E#3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("E#3"+durn_java);}}
				else if(event.keyCode==52){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("F#3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("F#3"+durn_java);}}
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("G#3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("G#3"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("A#3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("A#3"+durn_java);}}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")).addDotToAll());MUSIC_DATA.push("B#3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b#/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("#")));MUSIC_DATA.push("B#3"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
			else if(document.adjust.shafla.value=="flat"){
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["cb/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Cb3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["cb/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Cb3"+durn_java);}}
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["db/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Db3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["db/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Db3"+durn_java);}}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["eb/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Eb3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["eb/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Eb3"+durn_java);}}
				else if(event.keyCode==52){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["fb/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Fb3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["fb/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Fb3"+durn_java);}}				
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["gb/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Gb3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["gb/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Gb3"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["ab/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Ab3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["ab/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Ab3"+durn_java);}}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["bb/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")).addDotToAll());MUSIC_DATA.push("Bb3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["bb/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("b")));MUSIC_DATA.push("Bb3"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
			else if(document.adjust.shafla.value=="natural"){
				if(event.keyCode==49){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Cn3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["c/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Cn3"+durn_java);}}					
				else if(event.keyCode==50){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Dn3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["d/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Dn3"+durn_java);}}
				else if(event.keyCode==51){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("En3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["e/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("En3"+durn_java);}}
				else if(event.keyCode==52){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Fn3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["f/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Fn3"+durn_java);}}
				else if(event.keyCode==53){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Gn3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["g/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Gn3"+durn_java);}}
				else if(event.keyCode==54){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("An3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["a/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("An3"+durn_java);}}
				else if(event.keyCode==55){
					if(dur == "Dotted quarter note"||dur == "Dotted 8th note"||dur == "Dotted 16th note"||dur == "Dotted half note"){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")).addDotToAll());MUSIC_DATA.push("Bn3"+durn_java);}
					else{notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/3"] , duration: durn }).addAccidental(0, new Vex.Flow.Accidental("n")));MUSIC_DATA.push("Bn3"+durn_java);}}
				if(restSignal != "no rest"){
					if(event.keyCode==82){notesBar[i].push(new Vex.Flow.StaveNote({ keys: ["b/4"] , duration: durn }));MUSIC_DATA.push("R"+durn_java);}//休止符
				}
			}
		}
		for(a = 1; a < k; a++){//全部音符印一遍
			Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[a], notesBar[a]);
		}
	}						
}
document.onkeyup = add;

/*--------------------------復原-----------------------------------*/
var lastOne;//最後一個音符
function undo(){
	if(close==1){return;}
	if(event.ctrlKey && event.keyCode==90){//按ctrl+z可復原
		if(notesBar[1].length>0){//防呆  確保沒東西時按復原不會有bug
			if(beat<=0){
				i--;//復原到該小節沒音了，那就再往前一小節
				beat = 4;//因為是新的小節，所以beat回到4拍
			}
			lastOne=notesBar[i].pop();
			MUSIC_DATA.pop();
			if(lastOne.duration == "q"){beat -= 1;}
			else if(lastOne.duration == 8){beat -= 0.5;}
			else if(lastOne.duration == 16){beat -= 0.25;}
			else if(lastOne.duration == "h"){beat -= 2;}
			else if(lastOne.duration == "w"){beat -= 4;}
			else if(lastOne.duration == "qd"){beat -= 1.5;}
			else if(lastOne.duration == "8d"){beat -= 0.75;}
			else if(lastOne.duration == "16d"){beat -= 0.375;}
			else if(lastOne.duration == "hd"){beat -= 3;}
			//alert("beat = "+beat);
			ctx.clearRect(10,0,canvas.width,canvas.height);
			for(a = 1; a < k; a++){
				staveBar[a].setContext(ctx).draw();
			}
			for(a = 1; a < k; a++){
				Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[a], notesBar[a]);
			}
		}
	}
}
document.onkeydown = undo;
/*--------------------------------增加音節---------------------------------*/
function addstave(){
	canvas.height=canvas.height+90;//增加高度
	ctx.clearRect(10,0,canvas.width,canvas.height);//重畫開始
	key=document.fmami.mami.value;
	
	for(a = 1; a < k; a++){
		staveBar[a].setContext(ctx).draw();
	}
	for(a = 1; a < k; a++){
		Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[a], notesBar[a]);
	}//重畫結束
	var b;
	for(b=k;b<k+4;b++){//利用b值代替k值來增加
		if(b%4==1){//若是每行的第一節，重新取位置
			staveBar[b] = new Vex.Flow.Stave(staveBar[b-4].x, staveBar[b-4].y+staveBar[b-4].height, 250);
			staveBar[b].addClef("treble")
			staveBar[k].addKeySignature(key);
			staveBar[b].setContext(ctx).draw();
			notesBar[b] = [];//空的音符群
			// Helper function to justify and draw a 4/4 voice
			Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[b], notesBar[b]);
		}
		else{//不是就接著印
			staveBar[b] = new Vex.Flow.Stave(staveBar[b-1].width + staveBar[b-1].x, staveBar[b-1].y, 250);
			
			staveBar[b].setContext(ctx).draw();
			notesBar[b] = [];
			Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[b], notesBar[b]);      
		}	
	}
	k=k+4;//新增一行，k也要增加，因為迴圈的關係，所以k值會比實際的小節數多1喔~
}
/*--------------------------------結束音節---------------------------------*/
var j
var close=0;
function endstave(){
	if(document.endout.endstart.value=="END"){document.endout.endstart.value = "START";}
	else if(document.endout.endstart.value=="START"){document.endout.endstart.value = "END";}
	if(close==0){
		//alert("目前第" + i + "小節");
		//alert("i%4=" + i%4);
		//算出目前那行的最後一小節
		if(i%4==0){//若剛好是此行最後一小節，則直接加
			j=i;
		}
		else{//若不是，先算出比前一行多幾小節，將其剪掉再加四行到此行最後一小節
			j=i-i%4+4;//別問我為何寫這麼複雜，我本來寫i/4，他給我算到小數，會有問題= =
		}
		//alert("第" + j + "小節");						
		ctx.clearRect(10,0,canvas.width,canvas.height);
		staveBar[j].setEndBarType(Vex.Flow.Barline.type.END);//最後一小節加上終止線
		for(a = 1; a <= j; a++){//重新印  印直到第j小節為止  之後都不印
			staveBar[a].setContext(ctx).draw();
		}
		for(a = 1; a <= j; a++){
			Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[a], notesBar[a]);
		}
		k=j+1;//紀錄現在的小節數該有多少，加1的原因是前面跑印全部的設計時，就寫k會比實際上的小節數還多1
		close=1;//確認現在已結束樂譜
		
	}/*--------------------------------取消結束----------------------------------*/
	else{					
		//alert("" + j);
		if(typeof(j)=="undefined"){//代表沒有設定過終止線
			alert("fail");
			return;
		}
		else{//如果有，要取消，那重新畫一遍
			ctx.clearRect(10,0,canvas.width,canvas.height);
			staveBar[j].setEndBarType(Vex.Flow.Barline.type.SINGLE);
			for(a = 1; a < j+1; a++){//重新印  印直到第j小節為止  之後都不印
				staveBar[a].setContext(ctx).draw();
			}
			for(a = 1; a < j+1; a++){
				Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[a], notesBar[a]);
			}
		}
		close=0;							
	}	
}
/*---------------------------------改變調性------------------------------------*/
function keyChange(){
	ctx.clearRect(10,0,canvas.width,canvas.height);
	key=document.fmami.mami.value;
	for(a = 1; a < k; a++){
		if(a==1){
			staveBar[a] = new Vex.Flow.Stave(10, 40, 250);
			staveBar[a].addClef("treble")
			staveBar[a].addTimeSignature("4/4");//4/4拍(一小節4拍,4分音符為一拍)
			staveBar[a].addKeySignature(key);//D大調(所以會有升fa升Do)
			staveBar[a].setContext(ctx).draw();
			//notesBar[a] = [];//空的音符群
			// Helper function to justify and draw a 4/4 voice
			Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[a], notesBar[a]);
		}
		else if(a!=1&&a%4==1){
			staveBar[a] = new Vex.Flow.Stave(staveBar[a-4].x, staveBar[a-4].y+staveBar[a-4].height, 250);
			staveBar[a].addClef("treble")
			staveBar[a].addKeySignature(key);
			staveBar[a].setContext(ctx).draw();
			//notesBar[a] = [];//空的音符群
			// Helper function to justify and draw a 4/4 voice
			Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[a], notesBar[a]);
		}
		else{
			staveBar[a] = new Vex.Flow.Stave(staveBar[a-1].width + staveBar[a-1].x, staveBar[a-1].y, 250);
			
			staveBar[a].setContext(ctx).draw();
			//notesBar[a] = [];
			Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar[a], notesBar[a]);      
		}			
	}
}	
	function  saved(){
	//alert("test");
	var  music_data=MUSIC_DATA.join(" ");
	var  music_name = document.getElementById('music_name').value;
	//var  user = document.getElementById('creater').innerHTML ;
	 //location.href="final_save.php?music_data="+ music_data+"&music_name="+music_name+"&user="+user;
}
function noteOnclick(){
	ok1.style.display=ok1.style.display=='none'?'':'none';
	ok2.style.display=ok2.style.display=='none'?'':'none';
	ok3.style.display=ok3.style.display=='none'?'':'none';
	ok4.style.display=ok4.style.display=='none'?'':'none';
	ok5.style.display=ok5.style.display=='none'?'':'none';
	ok6.style.display=ok6.style.display=='none'?'':'none';
	ok7.style.display=ok7.style.display=='none'?'':'none';
	ok8.style.display=ok8.style.display=='none'?'':'none';
}
function shaflaOnclick(){
	s.style.display=s.style.display=='none'?'':'none';
	f.style.display=f.style.display=='none'?'':'none';
	n.style.display=n.style.display=='none'?'':'none';
	c.style.display=c.style.display=='none'?'':'none';
}
function highOnclick(){
	ihigh.style.display=ihigh.style.display=='none'?'':'none';
	middle.style.display=middle.style.display=='none'?'':'none';
	low.style.display=low.style.display=='none'?'':'none';
}
function restOnclick(){
	sixteenth.style.display=sixteenth.style.display=='none'?'':'none';
	eighth.style.display=eighth.style.display=='none'?'':'none';
	quarter.style.display=quarter.style.display=='none'?'':'none';
	half.style.display=half.style.display=='none'?'':'none';
	whole.style.display=whole.style.display=='none'?'':'none';
	no.style.display=no.style.display=='none'?'':'none';
}
