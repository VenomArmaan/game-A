const canvas = document.getElementById("canvas")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const contex = canvas.getContext("2d");
canvas.style.background ="yellow";

let Xcolor="blue";

let isDrawing = false;    

canvas.addEventListener("mousedown", function() {
  isDrawing = true;
});

canvas.addEventListener("mouseup", function() {
  isDrawing = false;
});

canvas.addEventListener("mouseleave", function() {
  isDrawing = false; 
});

addEventListener("mousemove",function(event){
    if (!isDrawing) return;
    contex.beginPath();
    contex.strokeStyle= Xcolor;
    contex.arc(event.x,event.y, 1, 0, 2*Math.PI );
    contex.stroke();
})


red1.addEventListener("click", function() {
    Xcolor = "red";
  });

green1.addEventListener("click", function() {
    Xcolor = "green";
  });
