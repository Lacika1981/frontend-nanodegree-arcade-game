// Enemies our player must avoid
var Enemy = function (speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.width = 101;
    this.height = 71;
    //    this.x = this.startPosX(); // the enemy will start off screen
    //   this.y = this.startPosY(); // calling the function to place the enemies onto different paths
    this.setPosition();
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
/*Enemy.prototype.setPosition = function () {
    var newEnemy = this;

    console.log(newEnemy);
    var overlap = true;

    if (allEnemies.length > 0) {
        while (overlap) {
            newEnemy.x = getRandomInt(1, 700);
            newEnemy.y = getRandomInt(90, 380);
            overlap = false;
            allEnemies.forEach(function (enemy) {
                var rect1 = { x: newEnemy.x, y: newEnemy.y, width: newEnemy.width, height: newEnemy.height };
                var rect2 = { x: enemy.x, y: enemy.y, width: enemy.width, height: enemy.height };
                if (rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.height + rect1.y > rect2.y) {
                    overlap = true;
                    console.log(overlap);
                }
            });
        }
    } else {
        this.x = getRandomInt(1, 700);
        this.y = getRandomInt(90, 380);
    }

};*/

//This function is responsible to check if any Player-Enemy or Player-Gem
//interactions hava been done

function objectCollision(obj1, obj2) {
    var rect1 = obj1;
    var rect2 = obj2;
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        return true;
    }
    return false;
}

//This function is responsible to prevent the Bugs to be overlapped

function collision(obj, array, all) {
    for (let i = 0; i < all.length; i++) {
        for (let j = 0; j < array.length; j++) {
            var rect1 = obj;
            var rect2 = array[j];
            if (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y) {
                return true;
            }
        }
    }
}

//This method places the bugs at random positions on the Canvas

Enemy.prototype.setPosition = function () {
    var newEnemy = this;
    newEnemy.x = getRandomInt(-1000, -250);
    newEnemy.y = getRandomInt(90, 380);
    var array = [];
    allEnemies.forEach(function (enemy) {
        array.push(enemy);
    });
    var callCollision = collision.call(this, newEnemy, array, allEnemies);
    callCollision;
    if (callCollision) {
        this.setPosition();
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Here we call the function at every frame to check any collisions

    objectCollision(this, player);
    if (objectCollision(this, player)) {
        player.reset();
    }
    var canvasWidth = ctx.canvas.width; //getting the width of the canvas
    if (this.x > canvasWidth) { // checking the width of the canvas and the position of each bugs
        /*this.setPosition();*/
        this.x = -125;
    }
    this.x = this.x + (this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*var bugPosX = -125; // initial position for the bugs
var diffX = [50, 100, 150, 200, 250, 300]; // Array  to choose a value and place the bug at different X position*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.x = (909 / 2) - 50; // X starting position for the character
    this.y = 600; // Y starting position for the character
    this.initialX = this.x;
    this.initialY = this.y;
    this.width = 101;
    this.height = 171;
    this.sprite = 'images/char-boy.png';
    this.handleInput(); // calling the function to handle the movement
}

Player.prototype.update = function () {

    var playerX = [-10, 810];
    var playerY = [-10, 600];

    if (this.y < playerY[0]) {
        this.y = playerY[0];
    }
    if (this.y > playerY[1]) {
        this.y = playerY[1];
    }
    if (this.x < playerX[0]) {
        this.x = playerX[0];
    }
    if (this.x > playerX[1]) {
        this.x = playerX[1];
    }
}

Player.prototype.handleInput = function () {
    var self = this;
    console.log(self);
    document.addEventListener('keyup', function (event) {
        var keyName = event.which || event.keyCode;

        switch (keyName) {
            case 37:
            case 65:
            case 100:
                return self.x -= 40;

            case 38:
            case 87:
            case 104:
                return self.y -= 40;

            case 39:
            case 68:
            case 102:
                return self.x += 40;

            case 40:
            case 83:
            case 101:
                return self.y += 40;
        }
    })

}

/*Player.prototype.collide = function(){
    newPlayer = this;
    var array = [];
    allEnemies.forEach(function (enemy) {
        array.push(enemy);
    });
};*/

//Draws the Player on the Canvas

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    return {
        endText: function(){
            ctx.fillText("Game Over", 200, 200)
        }
    }
};

Player.prototype.reset = function(){
    this.x = this.initialX;
    this.y = this.initialY;
    //this.render.endText();
}

var Gems = function(){
    this.x = getRandomInt(50, 700);
    this.y = getRandomInt(50, 400);
    this.width = 101;
    this.height = 171;
    this.sprite = 'images/Gem Orange.png';
    this.score = 0;
}


//Checking if the Player gets a Gem and change the score and move the Gem out of Canvas
Gems.prototype.update = function(){
    objectCollision(this, player);
    if (objectCollision(this, player)){
        this.score += 1;
        this.x = -1000;
    }
}

Gems.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'right'; 
    ctx.fillText('Score: ' + this.score, 200, 100);
};

var Keys = function(){
    this.x = getRandomInt(50, 700);
    this.y = getRandomInt(50, 400);
    this.width = 101;
    this.height = 171;
    this.sprite = 'images/Key.png';
    this.keys = 0;
}

Keys.prototype.update = function(){
    objectCollision(this, player);
    if (objectCollision(this, player)){
        this.keys += 1;
        this.x = -1000;
    }
};

Keys.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'center';
    ctx.fillText('Key: ' + this.keys, ctx.canvas.width / 2, 100);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();
var gem = new Gems();
var key = new Keys();

//################################################################//
//This method has been commented out and replaced by my own method//
//################################################################++//

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
/*document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    //player.handleInput(allowedKeys[e.keyCode]);
});*/

function numberOfEnemies(num) {
    for (var i = 0; i < num; i++) {
        allEnemies.push(new Enemy(125));
    }
}

numberOfEnemies(4);