//this is the most basic, what about saving off the img? what about redrawing but slower so you could see it? currently button redraw is as fast as the loop that reads it.
var theCircleOfStuff;
var t;

function circle(x, y) {
        this.x = x;
        this.y = y;
        this.r = 0.5;
}

//key and button presses, capture keyPress instead of keyDown bc of repeating keystrokes as you hold it
//make the keypress have the same 'graphic' as clicking the button, that would be keydown/keyup, activate hover while keydown, remove when up, only have for specified keys
function CaptureKey(e) {
//return bc can't capture more than one at a time
    if (e.keyCode == 77 || e.keyCode == 109) { //apparently I am getting the ascii code no matter what in chrome. test in other browsers
        AddCommand("M");
        return;
    }

    if (e.keyCode == 78 || e.keyCode == 110) { 
        AddCommand("N");
        return;
    }

    if (e.keyCode == 88 || e.keyCode == 120) {
        AddCommand("X");
        return;
    }

    if (e.keyCode == 90 || e.keyCode == 122) {
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
       
        t = setInterval(function () { IMGClick(div, e); }, 30); //since you can't pass params directly use anonymous function and call within where you can, at least that's how I remembered :P

    }

    function StopClicking() {
        clearInterval(t);
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

}

//moving functions
circle.prototype.left = function () {
    var canvas = document.getElementById("can");

    var dx = this.x;

    if (this.x - 1 > 0) {
        dx = this.x - 1;
    }

    this.x = dx;

    theCircleOfStuff.draw(this.x, this.y);
}

circle.prototype.right = function () {

    var canvas = document.getElementById("can");

    var dx = this.x;

    if (this.x + 1 < canvas.width) {
        dx = this.x + 1;
    }

    this.x = dx;
    theCircleOfStuff.draw(this.x, this.y);
}

circle.prototype.up = function () {
    var canvas = document.getElementById("can");

    dy = this.y;

    if (this.y - 1 > 0) {
        dy = this.y - 1;
    }

    this.y = dy;
    theCircleOfStuff.draw(this.x, this.y);
}

circle.prototype.down = function () {
    var canvas = document.getElementById("can");

    dy = this.y;

    if (this.y + 1 < canvas.height) {
        dy = this.y + 1;
    }

    this.y = dy;
    theCircleOfStuff.draw(this.x, this.y);
}

circle.prototype.draw = function (x, y) {
    var c = document.getElementById('can');
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.arc(x, y, 0.5, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function SetUp() {
    //document.onkeypress = CaptureKey; //this worked but my old code had listeners so went there
    window.addEventListener("keypress", CaptureKey, false);
    theCircleOfStuff = new circle(0, 0);

    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    
}

function ClearCanvas() {

    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    
    var FC = document.getElementById("FullClear");
    if (FC.checked == true) {
        //window.location.href = window.location.pathname; //technically it works ;)
        theCircleOfStuff = new circle(0, 0);
        ctx.moveTo(0, 0);
        }

    ctx.save();
    

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.restore();

    var txt = document.getElementById("keys");
    txt.innerHTML = "";

    
    
}

//function Erase() {
//    var canvas = document.getElementById("can");
//    var ctx = canvas.getContext("2d");

//    ctx.save();

//    ctx.setTransform(1, 0, 0, 1, 0, 0);
//    ctx.clearRect(0, 0, canvas.width, canvas.height);

//    ctx.restore();
//}

function ReadText() {
//not using onchange bc I write to it so using button click
    var txt = document.getElementById("keys");

    var txtarray = txt.value.split(',');

    for (var i = 0; i < txtarray.length; i++) {
        if (txtarray[i] == "M" || txtarray[i] == "m") {
            theCircleOfStuff.right();
        }
        else if (txtarray[i] == "N" || txtarray[i] == "n") {
            theCircleOfStuff.left();
        }
        else if (txtarray[i] == "X" || txtarray[i] == "x") {
            theCircleOfStuff.down();
        }
        else if (txtarray[i] == "Z" || txtarray[i] == "z") {
            theCircleOfStuff.up();
        }
    }

}