//this is the most basic, what about saving off the img? what about redrawing but slower so you could see it? currently button redraw is as fast as the loop that reads it.
var theCircleOfStuff;
var t = [];
var upkey = 'z';
var downkey = 'y';
var leftkey = 'n';
var rightkey = 'm';

function circle(x, y, canvasid, scale, r) {
        this.x = x;
        this.y = y;
        this.scale = scale;
		this.canvas = canvasid;
		this.r = r;
}

//key and button presses, capture keyPress instead of keyDown bc of repeating keystrokes as you hold it
//make the keypress have the same 'graphic' as clicking the button, that would be keydown/keyup, activate hover while keydown, remove when up, only have for specified keys
function CaptureKey(e) {
//return bc can't capture more than one at a time
//update this later to use custom input, check if keycode == customkey.key/char code? will that work?
	if (e.target.tagName.toLowerCase() == 'input'){
		return;
	}

	if (e.keyCode == 77 || e.keyCode == 109 || e.charCode == 109 || e.charCode == 77) { //apparently I am getting the ascii code no matter what in chrome. test in other browsers, FF uses charcode...
        AddCommand("M");
        return;
    }

    if (e.keyCode == 78 || e.keyCode == 110 || e.charCode == 110 || e.charCode == 78) { 
        AddCommand("N");
        return;
    }

    if (e.keyCode == 88 || e.keyCode == 120 || e.charCode == 120 || e.charCode == 88) {
        AddCommand("X");
        return;
    }

    if (e.keyCode == 90 || e.keyCode == 122 || e.charCode == 122 || e.charCode == 90) {
        AddCommand("Z");
        return;
     }

}

//add a handler on mousedown that starts an interval of calling this then remove it on mouseup and clear interval, this will help with having to click constantly and should work with holding click
function IMGClick(div, e) {
    var x = e.pageX - (div.offsetLeft || div.offsetParent.offsetLeft); //it worked. shocking
    var y = e.pageY - (div.offsetTop || div.offsetParent.offsetTop);
    var width = (div.width || div.style.width || div.clientWidth);

    if (div.className == "ubutton") {
        AddCommand("Z");
        }
    else if (div.className == "dbutton") {
            AddCommand("X");
        }
    else if (div.className == "lbutton") {
            AddCommand("N");
        }
    else if (div.className == "rbutton") {
            AddCommand("M");
        }
    }

    //when the button is pressed down on the images it will register the stop click event for when it's released, until then the interval will call the original click button every 30 ms
    //it's really cool that using the button while holding will make the diagonal (although not perfectly)
    function IMGDown(div, e) {
        window.addEventListener("mouseup", StopClicking, false);
       
        t[t.length] = setInterval(function () { IMGClick(div, e); }, 30); 

    }

    function StopClicking() {
	//added loop to get all intervals stopped because of dragging and touch
        while (t.length > 0){
		clearInterval(t[t.length-1]);
		t.pop();
		}
		
        window.removeEventListener("mouseup", StopClicking);
        
    }

//Textarea to read/write from functions
function AddCommand(key) {
    var txt = document.getElementById("keys");
    if (txt.value == "") {
        txt.value += key;
        return;
    }
    txt.value += "," + key;
	txt.scrollTop = txt.scrollHeight

    if (key == "M") {
        theCircleOfStuff.right();
    }
    else if (key == "N") {
        theCircleOfStuff.left();
    }
    else if (key == "X") {
        theCircleOfStuff.down();
    }
    else if (key == "Z") {
        theCircleOfStuff.up();
    }
	
	SetSaveValues();

}

//moving functions
circle.prototype.left = function () {
    var canvas = document.getElementById(this.canvas);

    var dx = this.x;

    if (this.x*this.scale - 1 > 0) {
        dx = this.x - 1;
    }
	else
	{
		StopClicking(); 		
	}

    this.x = dx;

    this.draw(this.x*this.scale, this.y*this.scale, this.r);
}

circle.prototype.right = function () {

    var canvas = document.getElementById(this.canvas);

    var dx = this.x;

    if (this.x*this.scale + 1 < canvas.width) {
        dx = this.x + 1;
    }
	else
	{
		StopClicking();
	}

    this.x = dx;
    this.draw(this.x*this.scale, this.y*this.scale, this.r);
}

circle.prototype.up = function () {
    var canvas = document.getElementById(this.canvas);

    dy = this.y;

    if (this.y*this.scale - 1 > 0) {
        dy = this.y - 1;
    }
	else
	{
		StopClicking();
	}

    this.y = dy;
    this.draw(this.x*this.scale, this.y*this.scale, this.r);
}

circle.prototype.down = function () {
    var canvas = document.getElementById(this.canvas);

    dy = this.y;

    if (this.y*this.scale + 1 < canvas.height) {
        dy = this.y + 1;
    }
	else
	{
		StopClicking();
	}

    this.y = dy;
    this.draw(this.x*this.scale, this.y*this.scale, this.r);
}

circle.prototype.draw = function (x, y, r) {
    var c = document.getElementById(this.canvas);
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

	DisplayXY();
}

function SetUp() {
    //document.onkeypress = CaptureKey; //this worked but my old code had listeners so went there
    window.addEventListener("keypress", CaptureKey, false); //on screen keyboard not handled, what about keydown instead? while keydown call keypress, when keyup stop event? or will keydown work the same as keypress...
    theCircleOfStuff = new circle(0, 0, "can", 1, 0.5);

	var txt = document.getElementById("keys");
	txt.addEventListener("keypress", function(e) {e.preventDefault()}, false); //don't type the keystrokes inside the textarea so it doesn't double type keys
	
	//for pasting
	$(txt).on('input propertychange', function() {CheckPaste(this);});
	
	//not all browsers were clearing the textarea even with autocomplete off so make sure each refresh empties it
	$(txt).val('');
	$('#drawing_commands').val('');
	
	//ignore dragging, still fires the mouse up/down but won't break when it drags a bit, disables it for the whole window
	window.addEventListener("dragstart", function(event) {event.preventDefault();}, false);
	
}

function ClearCanvas() {

    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    
    var FC = document.getElementById("FullClear");
    if (FC.checked == true) {
        //window.location.href = window.location.pathname; //technically it works ;)
        theCircleOfStuff = new circle(0, 0, "can", 1, 0.5);
        ctx.moveTo(0, 0);
        }

    ctx.save();
    

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.restore();

	ClearCommands();
	
	//this is the only time I need to change the x/y, before it should have started on 0,0
    $('#drawing_startx').val(theCircleOfStuff.x);
	$('#drawing_starty').val(theCircleOfStuff.y);
	DisplayXY();
}

function ClearCommands(){
	var txt = document.getElementById("keys");
    txt.innerHTML = ""; //ie
	txt.value = ""; //ff-chroem
    
	var cmds = document.getElementById('drawing_commands');
	cmds.value = "";
}

function CheckPaste(txt){

	var previousCMDS = $('#drawing_commands').val().slice(0,-1); //remove trailing comma
	
	var newCMDS = $(txt).val().replace(previousCMDS,''); //only the new text now, could have just sliced this from the start length of the previouscmds...oh well
	
	var keyarray = newCMDS.split(',');
	
	var allowedkeys = [];
	
	for (var i = 0; i < keyarray.length; i++) {
        if (keyarray[i].replace(',') == "M" || keyarray[i].replace(',') == "m") {
            allowedkeys.push(keyarray[i].replace(','));
        }
        else if (keyarray[i].replace(',') == "N" || keyarray[i].replace(',') == "n") {
            allowedkeys.push(keyarray[i].replace(','));
        }
        else if (keyarray[i].replace(',') == "X" || keyarray[i].replace(',') == "x") {
            allowedkeys.push(keyarray[i].replace(','));
        }
        else if (keyarray[i].replace(',') == "Z" || keyarray[i].replace(',') == "z") {
            allowedkeys.push(keyarray[i].replace(','));
        }
    }
	
	if(allowedkeys.length == 0){
		//nothing to allow pasted!
		$(txt).val(previousCMDS);
		return;
	}
	
	if(previousCMDS != ""){
		previousCMDS = previousCMDS + ',';
	}
		
	$(txt).val(previousCMDS + allowedkeys.join(','));
	
	ReadKeys(allowedkeys.join(','));
	
	SetSaveValues();
	
}

function ReadKeys(keyarray){
//this is different from runcommands because it actually moves the point
	for (var i = 0; i < keyarray.length; i++) {
        if (keyarray[i] == "M" || keyarray[i] == "m") {
            theCircleOfStuff.right();
        }
        else if (keyarray[i] == "N" || keyarray[i] == "n") {
            theCircleOfStuff.left();
        }
        else if (keyarray[i] == "X" || keyarray[i] == "x") {
            theCircleOfStuff.down();
        }
        else if (keyarray[i] == "Z" || keyarray[i] == "z") {
            theCircleOfStuff.up();
        }
    }
	
}

function ReadText() {
//not using onchange bc I write to it so using button click
    var txt = document.getElementById("keys");

	if (txt.value == ""){
		return;
	}
	
    ReadKeys(txt.value);

	txt.value += ',' + txt.value;
	SetSaveValues();
}

function RunCommands(cmds, canvas, startx, starty, scale,r) {
    var txt = cmds;

    var txtarray = txt.split(',');

	tempCircle = new circle(startx, starty, canvas, scale, r); 
	
    for (var i = 0; i < txtarray.length; i++) {
        if (txtarray[i] == "M" || txtarray[i] == "m") {
            tempCircle.right();
        }
        else if (txtarray[i] == "N" || txtarray[i] == "n") {
            tempCircle.left();
        }
        else if (txtarray[i] == "X" || txtarray[i] == "x") {
            tempCircle.down();
        }
        else if (txtarray[i] == "Z" || txtarray[i] == "z") {
            tempCircle.up();
        }
    }
}

function SetSaveValues(){
	$('#drawing_commands').val(document.getElementById("keys").value + ',');
}

function DisplayXY(){
	if (theCircleOfStuff){
		$('#xLabel').text(theCircleOfStuff.x);
		$('#yLabel').text(theCircleOfStuff.y);
	}
}
