// console.log("check");

function init() {
    var canvas = document.getElementById('mycanvas');
    pen = canvas.getContext("2d");
    W = H = canvas.width = canvas.height = 1000;
    cs=67;
    gameover =false;
    score=0;

    //create img object for food
    food_img= new Image();
    food_img.src="./assets/apple.png";

    trophy_img= new Image();
    trophy_img.src="./assets/trophy.png";

    food=getrandomfood();

    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",

        createsnake: function() {
            for (var i = this.init_len; i >0; i--) {
                this.cells.push({x:i,y:0});
            }
        }, 
        drawsnake: function(){
            pen.fillStyle=this.color;
            for(var i=0;i<this.cells.length;i++)
            pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-2,cs-2);
        },

        updatesnake:function(){
            console.log("updating snake according to direction given (key pressed)");

            //if the snake has eaten food, increase length of the snake
            var headX= this.cells[0].x;
            var headY=this.cells[0].y;
            //if food is eaten then no need to pop the last block
            if(headX==food.x && headY==food.y){
                console.log("food consumed");
                score++;
                food= getrandomfood();
            }
            else
            this.cells.pop();

            var newheadX;
            var newheadY;

            if(this.direction=="right")
            {
                newheadX= headX+1;
            newheadY = headY;
            }
            else if(this.direction=="left")
            {
                newheadX=headX-1;
                newheadY=headY;
            }
            else if(this.direction=="up")
            {
                newheadX=headX;
                newheadY=headY-1;
            }
            else
            {
                newheadX=headX;
                newheadY=headY+1;
            }
            
            this.cells.unshift({x:newheadX, y:newheadY});

            var wallendX= Math.round(W/cs)-1;
            var wallendY= Math.round(H/cs)-1;

            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>wallendX || this.cells[0].y> wallendY)
            gameover=true;
        }

    }
    snake.createsnake();

    function keypressed(e){
        if(e.key=="ArrowRight")
        snake.direction="right";

        else if(e.key=="ArrowLeft")
        snake.direction="left";

        else if(e.key=="ArrowDown")
        snake.direction="down";

        else if(e.key=="ArrowUp")
        snake.direction="up";
    }

    document.addEventListener('keydown',keypressed);
}

function draw() {
    pen.clearRect(0,0,W,H);
    snake.drawsnake();
    
    //drawing food
    pen.drawImage(food_img,food.x*cs, food.y*cs, cs-2, cs-2 ); 

    pen.drawImage(trophy_img, 20, 20,cs+10, cs);
    pen.fillStyle= "blue";
    pen.font= "30px Robota";
    pen.fillText(score, 50, 50);
}

function update() {
    snake.updatesnake();
}

function getrandomfood(){
    var foodX=Math.round(Math.random()*(W-cs)/cs); // Math.Random produces a value between 1 & 0 , and We r multiplying it with the Width of the canvas to prosuce it anywhere on the canvas, but we dont want that half appears on canvas and half out of canvas and so we r subtracting cs. We r dividing by cs is done to ensure that the coordinate stays in multiples of cell size.

    var foodY=Math.round(Math.random()*(H-cs)/cs);

    var food={
        x: foodX,
        y: foodY,
        color: "red",
    }
    return food;
}

function gameloop() {
    if(gameover==true)
    {
        console.log("gameover");
        clearInterval(f);
        alert("Game Over");
        return;
    }

    draw();
    update();
}

init();
var f=setInterval(gameloop, 150);
