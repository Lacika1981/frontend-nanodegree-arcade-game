// Enemies our player must avoid
var Enemy = function (speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = this.startPosX(); //the enemy will start off screen
    this.y = this.startPosY();
    console.log(this.y);
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var resetBug = ctx.canvas.width; //getting the width of the canvas
    //this.x = this.x + (this.x * dt);
    if (this.x > resetBug) {
        this.x = this.startPosX();
        this.y = this.startPosY();
    }
    this.x = this.x + (this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.x = 200;
    this.y = 200;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function () {
}

Player.prototype.handleInput = function (keyEvent) {
    switch (keyEvent) {
        case 37:
            this.x -= 1;
            break;

        case 38:
            this.y += 1;
            break;

        case 39:
            this.x += 1;
            break;

        case 40:
            this.y -= 1;
            break;
    }

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    //player.handleInput(allowedKeys[e.keyCode]);
});
var bugPosX = -125;

// function to generate the y position for the bug to start
Enemy.prototype.startPosX = function () {
    if (bugPosX < -1025) {
            bugPosX = -125;
        } else {
            var diffX = [0, 150, 300, 450, 600];
            var randomPosX = diffX[Math.floor(Math.random() * diffX.length)];
            bugPosX -= randomPosX;
        }
    var randomPosX = bugPosX;
    return randomPosX;
};

Enemy.prototype.startPosY = function () {
    var bugPosY = [60, 143, 225];
    var randomPosY = bugPosY[Math.floor(Math.random() * bugPosY.length)];
    return randomPosY;
};

function numberOfEnemies(num) {
    for (var i = 0; i < num; i++) {
        allEnemies.push(new Enemy(125));
        if (bugPosX < -325) {
            bugPosX = -125;
        } else {
            bugPosX -= 200;
        }
    }
}

numberOfEnemies(5);

/*var enemyOne = new Enemy(5, -200);
allEnemies.push(enemyOne);
var enemyTwo = new Enemy(5, -260);
allEnemies.push(enemyTwo);
var enemyThree = new Enemy(5, -125);
allEnemies.push(enemyThree);*/