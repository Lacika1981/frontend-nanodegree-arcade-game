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
    this.x = this.startPosX(); // the enemy will start off screen
    this.y = this.startPosY(); // calling the function to place the enemies onto different paths
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var canvasWidth = ctx.canvas.width; //getting the width of the canvas
    if (this.x > canvasWidth) { // checking the width of the canvas and the position of each bugs
        this.x = this.startPosX();
        this.y = this.startPosY();
    }
    this.x = this.x + (this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var bugPosX = -125; // initial position for the bugs
var diffX = [50, 100, 150, 200, 250, 300]; // Array  to choose a value and place the bug at different X position

// function to generate the y position for the bug to start
Enemy.prototype.startPosX = function () {
    bugPosX = -125; // set the initial position back to -125
    var diffXIndex = Math.floor(Math.random() * diffX.length); // getting and index number from the Array
    var randomPosX = diffX[Math.floor(Math.random() * diffX.length)] * Math.random(); // getting a position from the Array
    diffX.splice(diffXIndex, 1); // remove the given number from the Array
    if (diffX.length < 1) { // if Array length is less than 1 then fill it up with the values again
        diffX = [50, 100, 150, 200, 250, 300];
    }
    bugPosX -= randomPosX + this.width; // changing the bug's X position
    return bugPosX; // return the value
};

var diffY = [60, 143, 225, 308, 391]; // initial position for the bugs

Enemy.prototype.startPosY = function () {
    var diffYIndex = Math.floor(Math.random() * diffY.length); // getting and index number from the Array
    var randomPosY = diffY[Math.floor(Math.random() * diffY.length)]; // getting a position from the Array
    diffY.splice(diffYIndex, 1); // remove the given number from the Array
    if (diffY.length < 1) { // if Array length is less than 1 then fill it up with the values again
        diffY = [60, 143, 225, 308, 391];
    }
    return randomPosY; // return the value
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.x = (909 / 2) - 50; // X starting position for the character
    this.y = 600; // Y starting position for the character
    this.sprite = 'images/char-boy.png';
    this.handleInput(); // calling the function to handle the movement
}

Player.prototype.update = function () {
    var playerX = [-10, 810];
    var playerY = [-10, 600];
    playerX.push(this.x);
    playerY.push(this.y);
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
    document.addEventListener('keydown', function (event) {
        var keyName = event.which || event.keyCode;

        switch (keyName) {
            case 37:
            case 65:
            case 100:
                return self.x -= 5;

            case 38:
            case 87:
            case 104:
                return self.y -= 5;

            case 39:
            case 68:
            case 102:
                return self.x += 5;

            case 40:
            case 83:
            case 101:
                return self.y += 5;
        }
    })

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();

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
        /*if (bugPosX < -325) {
            bugPosX = -125;
        } else {
            bugPosX -= 200;
        }*/
    }
}

numberOfEnemies(6);