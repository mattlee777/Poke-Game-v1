var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var image = new Image();
image.src = 'Images/Poke Rhetoric Map.png';


var sWidth, sHeight;
var playerImage = new Image();
playerImage.src = 'Images/playerUp.png';
var playerWidth, playerHeight;

const collisionsMap = []
for (let i = 0; i < collisions.length; i+= 80) {
    collisionsMap.push(collisions.slice(i, 80 + i))
}
console.log(collisions);

class Boundary {
    static width = 27.6
    static height = 27.6
    constructor({position}) {
        this.position = position
        this.width = 27.6
        this.height = 27.6
    }

    draw () {
        ctx.fillStyle = 'red'
        ctx.fillRect (this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
// 27.6 is because of zoom level
const offset = {
    x: -420,
    y: -750
}
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        boundaries.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x + 10,
                    y: i * Boundary.height + offset.y + 10
                 }
            })
        )
    })
})

console.log(boundaries)

// Define player's position
var playerPosition = {
    x: 595,
    y: 330
};

var player;

function resizeGame() {
    var gameArea = document.getElementById('gameArea');
    var widthToHeight = 8 / 5; //aspect ratio of the image
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
    } else {
        newHeight = newWidth / widthToHeight;
    }

    gameArea.style.width = newWidth + 'px';
    gameArea.style.height = newHeight + 'px';

    gameArea.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
    gameArea.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';

    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the image after resizing the canvas
    sWidth = image.width / 1.075; // Changed from 2.5 to 1.5
    sHeight = image.height / 1.075; // Changed from 2.5 to 1.5

    var minDimension = Math.min(canvas.width, canvas.height);
    playerWidth = minDimension * 0.05; // Changed from 0.075 to 0.05
    playerHeight = playerImage.height * (playerWidth / (playerImage.width / 4));

const player = new Sprite({
        position: {
            x: canvas.width / 2- 192 / 4 / 2,
            y: canvas.height / 2 - 68 / 2
        },
        image: playerImage,
        frames: {
            max: 4
        }
    })
}

class Sprite {
    constructor({ position, velocity, image, frames = { max: 1} }) {
        this.position = position
        this.image = image
        this.frames = frames
        this.width = this.image.width / this.frames.max
    }

    draw() {
        ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
    
}

// Call resizeGame when the window resizes or the orientation changes
window.addEventListener('load', resizeGame, false);
window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);

player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const keys= {
    w: {
    pressed: false
    },
    a: {
    pressed: false
    },
    s: {
    pressed: false
    },
    d: {
    pressed: false
    },

    ArrowLeft: {
    pressed: false
    },
    ArrowRight: {
    pressed: false
    },
    ArrowUp: {
    pressed: false
    },
    ArrowDown: {
    pressed: false
    }
    }

const testBoundary = new Boundary({
    position:{
        x: 400,
        y: 400
    }
})

const movables = [background, testBoundary]

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    //boundaries.forEach(boundary => {
        //boundary.draw()    
    //})
    testBoundary.draw ()

    //check if player defined before trying to draw
    if (player) {
    player.draw();
    }

let lastKey = keyStack[keyStack.length -1]

//if (playerHeight.position.x + playerWidth)

    if (keys.w.pressed && lastKey === 'w') {
        movables.forEach((movable) => {
            movable.position.y += 2.15
        })
    } else if (keys.a.pressed && lastKey === 'a') {
        movables.forEach((movable) => {
            movable.position.x += 2.15
        })
    } else if (keys.s.pressed && lastKey === 's') {
        movables.forEach((movable) => {
            movable.position.y += -2.15
        })
    } else if (keys.d.pressed && lastKey === 'd') {
        movables.forEach((movable) => {
            movable.position.x += -2.15
        })
    } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        movables.forEach((movable) => {
            movable.position.x += 2.15
        })
    } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        movables.forEach((movable) => {
            movable.position.x += -2.15
        })
    } else if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        movables.forEach((movable) => {
            movable.position.y += 2.15
    })
    } else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        movables.forEach((movable) => {
            movable.position.y += -2.15
    })
    }
     
}

playerImage.onload = function() {
    resizeGame();
    animate();
}

image.onload = () => {
    resizeGame();
};

let keyStack = []
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true 
            lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
                keys.ArrowRight.pressed = true
            lastKey = 'ArrowRight'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            lastKey = 'ArrowUp'
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            lastKey = 'ArrowDown'
            break
    }
    keyStack.push(e.key)
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break
    }
    keyStack = keyStack.filter(key => key !== e.key)
})