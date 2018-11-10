// Enemies, the player must avoid
var resetTime;
var Enemy = function(x,y,s) {

    // The image/sprite is used to easily load the images.
    this.sprite = 'images/enemy-bug.png';
    //variables for coordinates and speed of enemy bugs.
    this.x = x;
    this.y = y;
    this.s = s;
};

// mathod to update enemy's position on the board.
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // this will ensure the game runs at the same speed for
    // all computers.
    this.x+= this.s*dt;
    // resets enemy's position
    if(this.x>505){
        this.x=0
    }

    // when player and enemy colides. i.e. bite.
    if(player.x < this.x+60 && player.x +37 > this.x && player.y <this.y+25 && player.y+30 > this.y){
        
        resetTime = setTimeout(function(){
                     lose();
                    },20)
    }
};

// To draw enemy on the canvas 
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Class for the Player
var Player = function(x,y,s) {

    // a helper provided to easily load images
    this.sprite = 'images/char-boy.png';

    // variables for player's position and speed 
    this.x = x;
    this.y = y;
    this.s = s;
};

// method to update player's position on the board, so that the player doesn't go off the canvas.
Player.prototype.update = function(){
    if(this.x > 404){
        this.x=404
    }
    else if(this.x <0){
        this.x=0
    }
    if(this.y>380){
        this.y=380
    }
    // win condition, when player reaches to water blocks successfully.
    else if(this.y<0){
        resetTime = setTimeout(function(){
            win();            
        },20)
    }
}

// to draw player on the canvas.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// to handle player's movement on key pressing.
Player.prototype.handleInput=function(key){
    // move to left
    if(key == 'left'){
        this.x=this.x-101;
    }
    // move to right
    else if(key == 'right'){
        this.x+=101;
    }
    // move to up
    else if(key == 'up'){
        this.y-=80;
    }
    // move to down
    else if(key == 'down'){
        this.y+=80;
    }
}

// 3 different enemy bugs on different positions
var enemyPos = [60,140,220]
// to store enemy object
var enemy;
// Player object
var player = new Player(202,380,50);

// all 3 enemies are stored in the array - allEnemies
enemyPos.forEach(function(py){
    enemy= new Enemy(0,py,100+Math.floor(Math.random()*512));
    allEnemies.push(enemy)
})

// This listens for key presses and sends the keys to the
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function win(){
    alert('win')
    clearTimeout(resetTime);
    reset();
}

// when collision occurs.
function lose(){
    alert('bite')
    clearTimeout(resetTime);
    reset();
}

// resets player's position.
function reset(){
    player.x=202;
    player.y=380;
}