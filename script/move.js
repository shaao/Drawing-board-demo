/*
div演示画板
var div = document.getElementById('hh');var pruse;
div.onmousedown = function(a){
    pruse = true;var x = a.clientX-3;var y = a.clientY-3;var divA = document.createElement('div');divA.style = "width:5px;height:5PX;background:black;border-radius:3px;position:absolute;left:"+x+"px;"+"top:"+y+"px;"div.appendChild(divA);
}
div.onmousemove = function(a){
    if(pruse === true) {
        var x = a.clientX-3;var y = a.clientY-3;var divA = document.createElement('div');divA.style = "width:5px;height:5PX;background:black;border-radius:3px;position:absolute;left:"+x+"px;"+"top:"+y+"px;"div.appendChild(divA);
    }
}
div.onmouseup = function(a){
    pruse = false;
}
*/
var canvas = document.getElementById('drawing_board');
var context = canvas.getContext('2d');

autoSetCanvasSize(canvas);

listenToMouse(canvas);

var eraserEnabled = false;
eraser.onclick = function(){
    eraserEnabled = true;
    actions.className = 'actions x';
}
brush.onclick = function(){
    eraserEnabled = false;
    actions.className = 'actions';

}

function autoSetCanvasSize(canvas){
    setCanvasSize();
    window.onresize = function(){
        setCanvasSize();
    }
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function drawCircle(x,y,radius) {
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(x,y,radius,0,Math.PI * 2);
    context.fill();
}
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.fillStyle = 'black';
    context.moveTo(x1,y1); //起点
    context.lineWidth = 5;
    context.lineTo(x2,y2); //终点
    context.stroke();
    context.closePath();
}
function listenToMouse(canvas){
    var using = false;
    var lastPoint = {x:undefined,y:undefined};
    canvas.onmousedown = function(a){
        var x = a.clientX;
        var y = a.clientY; 
        using = true;
        if(eraserEnabled) {
            context.clearRect(x-5,y-5,10,10);
        }else{
            lastPoint={x:x,y:y};
        }
    }
    canvas.onmousemove = function(a){
        var x = a.clientX;
        var y = a.clientY; 

        if(!using) {return}

        if(eraserEnabled) {
            context.clearRect(x-5,y-5,10,10);
        }else{
            var newPoint = {x:x,y:y};
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
            lastPoint = newPoint;
        }
    }
    canvas.onmouseup = function(a){
        using = false;
    }

}

