// File 핸들링
var i=0;
var files;

$(function() {
	
	$("#files").bind("change", function(event) {
		files = event.target.files;
		$("#preview").append($("<div>ISBN: <input type='text'></input><input type='checkbox' id='cast'>Cast?</input><button type='button' id=''onclick='generateScriptXML()'>Content XML 생성</button></div>"));
		addProperties(files[i]);
	});
});

function addProperties(f){
	if(i<files.length){
		var mp3Name = f.name.split(".")[0];
		var audio = new Audio(mp3Name+".mp3");
		audio.addEventListener('loadedmetadata', function() {
			console.log("Playing " + audio.src + ", for: " + audio.duration + "seconds.");
			
			var durationMil= audio.duration * 1000
			var durationSec = durationMil.toString().split(".")[0];
			$("#list").append($("<li id='"+i+"' ><input type='text' id='number"+i+"' value='"+mp3Name+"' style='width:30px;'/>   제목 : <input type='text' id='title"+i+"' style='width:200px;'/>" +
			"   추가정보(Data or Page) : <input type='text' id='info"+i+"' style='width:50px;' /> " +
			"   재생시간  : <input type='text' id='duration"+i+"' value='"+durationSec+"' style='width:100px;'/>   <button type='button' id='"+i+"'onclick='deleteScript(this)'>삭제</button></li>"));
			
			i++;
			addProperties(files[i]); //defer the execution of anonymous function for 3 seconds and go to next line of code. 
		});
	}
}


function deleteScript(val){
	//$("#list").getElementsByTagName("li")[val.id].remove();
	$("li[id="+val.id+"]").remove();
	i--;
}

function generateScriptXML(){
	var castOn = document.getElementById("cast");
	
    var XmlDoc="<?xml version=\"1.0\" encoding=\"utf-8\"?>";
    
    var rootNode="<Contents>";
    var rootNodeEnd="</Contents>";
    XmlDoc += rootNode;
    
    //3. 엘리먼트
    var ItemNode="<Item>";
    var ItemNodeEnd="</Item>";
    var NumberNode="<Number>";
    var NumberNodeNodeEnd="</Number>";
    var ItemtitleNode="<Itemtitle>";
    var ItemtitleNodeEnd="</Itemtitle>";
    var InfoNode="<Date>";
    var InfoNodeEnd="</Date>";
    if(!castOn.checked){
    	InfoNode="<Page>";
        InfoNodeEnd="</Page>";
    }
    var DurationNode="<Duration>";
    var DurationNodeEnd="</Duration>";
    
	
	for(var j=0;j<i;j++){
		
		var number = document.getElementById("number"+j).value;
		var title = document.getElementById("title"+j).value;
		var info = document.getElementById("info"+j).value;
		var duration = document.getElementById("duration"+j).value;
		
		var item = ItemNode +NumberNode+number+NumberNodeNodeEnd +ItemtitleNode+title+ItemtitleNodeEnd +InfoNode+info+InfoNodeEnd +DurationNode+duration+DurationNodeEnd+ ItemNodeEnd;
		XmlDoc += item
	}
	
	XmlDoc+=rootNodeEnd;
	
	XmlDoc.replace("’", "'");
	
	$("#list").append($("<br><textarea style='width:800px; height:300px;' >"+XmlDoc+"</textarea>"));	
	
	i = 0;
}


