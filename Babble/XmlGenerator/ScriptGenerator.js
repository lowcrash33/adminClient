// File 핸들링
var count = 0;
var fileName = "1.mp3";
var audio;
var speed = 1;
function scriptObj(time, script, category){
		this.startTime = time;
		this.text = script; 
		this.category = category;
};

$(function() {
	$("#mp3").bind("change", function(event) {
		var files = event.target.files;
		audio = $("audio")[0];
		for(var i=0, f; f=files[i]; i++) {
	
			if(f.type != "audio/mp3")
				alert("지원하는 타입이 아닙니다. ");
			else{
				audio.src = f.name;
				fileName = f.name;
				$("#preview").append($("<button type='button' onclick='doubleSpeed()'>Play speed</button><button type='button' onclick='addScript()'>Add phase</button><button type='button' onclick='generateScriptXML()'>Script XML Generate</button>"));
			}
		}
	});
});


function doubleSpeed(){
	if(speed == 1){
		audio.playbackRate = 2;
		speed =2;
	}
	else{
		audio.playbackRate = 1;
		speed =1;
	}
}
function addScript() {
		var currentInt = audio.currentTime * 1000;
		
		if(currentInt < 0){
			currentInt = 0;
		}
		
		var currentAudio = currentInt.toString();
		var currentSec = currentAudio.split(".");
		
		
		 $("#list").append($("<li id='"+count+"' >StartTime :<input type='text' id='starttime"+count+"' value='"+currentSec[0]+"' style='width:100px;'/>" +
		 		"   Script : <input type='text' id='script"+count+"' style='width:300px;' /> " +
				"<input type='checkbox' id='category"+count+"'>Category <button type='button' id='"+count+"'onclick='deleteScript(this)'>Delete</button>" +
						"<button type='button' id='"+count+"'onclick='playScript(this)'>Play</button>   Trans : <input type='text' id='convscript"+count+"' style='width:300px;' /></li>"));
		count++;
}

function deleteScript(val){
	//$("#list").getElementsByTagName("li")[val.id].remove();
	$("li[id="+val.id+"]").remove();
	count--;
}

function generateScriptXML(){
	
	var scriptList = new Array();

    var XmlDoc="<?xml version=\"1.0\" encoding=\"utf-8\"?>";
    
    var rootNode="<Script>";
    var rootNodeEnd="</Script>";
    XmlDoc += rootNode;
    
    //3. 엘리먼트
    var phaseNode="<Phase>";
    var phaseNodeEnd="</Phase>";
    var textNode="<Text>";
    var textNodeEnd="</Text>";
    var convtextNode="<Convtext>";
    var convtextNodeEnd="</Convtext>";
    var starttimeNode="<Starttime>";
    var starttimeNodeEnd="</Starttime>";
    var categoryNode="<Category>";
    var categoryNodeEnd="</Category>";
	
	for(var i=0;i<count;i++){
		
		var script = document.getElementById("script"+i).value;
		var convscript = document.getElementById("convscript"+i).value;
		var time = document.getElementById("starttime"+i).value;
		var category = document.getElementById("category"+i).checked;
		var sobject = new scriptObj(time,script,category);
		console.log("순번:"+ scriptList.length + " Starttime : "+sobject.startTime+ " Script : "+sobject.text+" Category : "+sobject.category);
		
		var phase = phaseNode+textNode+script+textNodeEnd +convtextNode+convscript+convtextNodeEnd +starttimeNode+time+starttimeNodeEnd+categoryNode+category+categoryNodeEnd+phaseNodeEnd;
		XmlDoc += phase
	}
	
	XmlDoc+=rootNodeEnd;
	
	XmlDoc.replace("’", "'");
	
	$("#list").append($("<br><textarea style='width:800px; height:300px;' >"+XmlDoc+"</textarea>"));	
	
	count = 0;
}


function playScript(time){
	var time = document.getElementById("starttime"+time.id).value;
	audio.currentTime = time/1000;
	audio.play();
}

