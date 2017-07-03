// Enemies our player must avoid
var Enemy = function (speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.width = 101;
    this.height = 80;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    //this.gameOver = false;
    this.setPosition();
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

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
    for (var i = 0; i < all.length; i++) {
        for (var j = 0; j < array.length; j++) {
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
    var array = [];
    newEnemy.x = getRandomInt(-1000, -250);
    newEnemy.y = getRandomInt(150, 480);

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
        //this.gameOver = true;
            player.x = player.initialX;
            player.y = player.initialY;
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

var Player = function () {
    this.x = (909 / 2) - 50; // X starting position for the character
    this.y = 620; // Y starting position for the character
    this.initialX = this.x;
    this.initialY = this.y;
    this.width = 80;
    this.height = 85;
    this.sprite = 'images/char-boy.png';
    this.handleInput(); // calling the function to handle the movement
}

Player.prototype.update = function () {
    // canvas limitations - do not let the Player to leave the canvas
    this.exclusions();
    console.log(this.x, this.y);
}

Player.prototype.handleInput = function (move) {
    var self = this;

    var moving = 20 || move;
    console.log(self);
    document.addEventListener('keyup', function (event) {
        var keyName = event.which || event.keyCode;

        switch (keyName) {
            case 37:
            case 65:
            case 100:
                return self.x -= moving;

            case 38:
            case 87:
            case 104:
                return self.y -= moving;

            case 39:
            case 68:
            case 102:
                return self.x += moving;

            case 40:
            case 83:
            case 101:
                return self.y += moving;
        }
    })

}

//Draws the Player on the Canvas

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if ((this.y < 60) && (gem.score === 5) && (key.keys === 1)) {
        ctx.font = '900 60px Arial';
        ctx.fillStyle = 'yellow';
        ctx.fillText('Win', ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.strokeText('Win', ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
};

// Areas where the Player can not go

Player.prototype.exclusions = function () {
    var playerX = [10, 820];
    var playerY = [50, 620];

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

var Gems = function () {
    this.x = getRandomInt(100, 700);
    this.y = getRandomInt(150, 400);
    this.width = 105;
    this.height = 110;
    this.sprite = 'images/Gem Orange.png';
    this.score = 0;
}


//Checking if the Player gets a Gem and change the score.
//If score less than 5 it will change the position of the Gem
Gems.prototype.update = function () {
    objectCollision(this, player);
    if (objectCollision(this, player)) {
        this.score += 1;
        if (this.score < 5) {
            this.x = getRandomInt(50, 700);
            this.y = getRandomInt(50, 400);
        } else {
            this.x = -1000;
        }
    };
}

Gems.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'right';
    ctx.fillText('Score: ' + this.score, 200, 100);
};

var Keys = function () {
    this.x = getRandomInt(100, 700);
    this.y = getRandomInt(150, 400);
    this.width = 55;
    this.height = 95;
    this.sprite = 'images/Key.png';
    this.keys = 0;
}

Keys.prototype.update = function () {
    objectCollision(this, player);
    if (objectCollision(this, player)) {
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

function numberOfEnemies(num) {
    for (var i = 0; i < num; i++) {
        allEnemies.push(new Enemy(getRandomInt(75, 300)));
    }
}

numberOfEnemies(6);