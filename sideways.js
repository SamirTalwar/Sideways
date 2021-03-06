setTimeout(function() {
    "use strict";

    var spritePath = 'PlanetCute/',

        width = document.body.offsetWidth,
        height = document.body.offsetHeight,

        blockWidth = 101,
        blockHeight = 171,
        blockDepth = 42,

        playerBounds = {
            top: 64,
            bottom: blockHeight,
            left: 17,
            right: blockWidth - 17
        },

        blockBounds = {
            top: blockHeight - blockDepth,
            bottom: blockHeight,
            left: 0,
            right: blockWidth
        },

        framesPerSecond = 100,
        millisecondsPerFrame = 1000 / framesPerSecond,
        speed = 5,
        jumpSpeed = 15,
        gravity = 5,

        groundPosition = height - (blockHeight + blockDepth * 3),

        scene, ticker, input, foreground, background,
        player, obstacles = [], jumping, jumpStart;

    function setup() {
        backdrop('skyblue');
        ground();
        obstacle({image: 'WallBlock.png', x: 5});
        obstacle({image: 'WallBlock.png', x: 7});
        obstacle({image: 'WallBlock.png', x: 7, y: 1});
        obstacle({image: 'WallBlock.png', x: 10});
        obstacle({image: 'TreeShort.png', x: 3});
        decoration({image: 'Star.png', x: 8, y: 10})
        newPlayer('CharacterBoy.png');
    }

    function step() {
        if (input.keyboard.right) {
            player.move(speed, 0);
        }
        if (input.keyboard.left) {
            player.move(-speed, 0);
        }
        if (input.keyboard.space) {
            jump();
        }
        exertGravity();
        checkCollisions();
        player.update();
    }

    scene = sjs.Scene({w: width, h: height});
    ticker = scene.Ticker(step, {tickDuration: millisecondsPerFrame});
    input = scene.Input();
    background = scene.Layer('background', {color: 'white'});
    foreground = scene.Layer('foreground');

    function backdrop(color) {
        background.setColor(color);
    }

    function ground() {
        foreground.Sprite(sprite('StoneBlock.png'), {
            x: 0,
            y: height - blockHeight,
            w: width,
            h: blockHeight
        }).update();
        foreground.Sprite(sprite('DirtBlock.png'), {
            x: 0,
            y: height - (blockHeight + blockDepth),
            w: width,
            h: blockHeight
        }).update();
        foreground.Sprite(sprite('GrassBlock.png'), {
            x: 0,
            y: height - (blockHeight + blockDepth * 2),
            w: width,
            h: blockHeight
        }).update();
    }

    function decoration(options) {
        var image = sprite(options.image),
            x = options.x,
            y = options.y || 0;

        foreground.Sprite(image, {
            x: blockWidth * x,
            y: groundPosition - blockDepth * y,
            w: blockWidth,
            h: blockHeight
        }).update();
    }

    function obstacle(options) {
        var x = options.x,
            y = options.y || 0;

        decoration(options);
        obstacles.push({x: x, y: y});
    }

    function newPlayer(filename) {
        player = foreground.Sprite(sprite(filename), {
            x: 0,
            y: groundPosition,
            w: blockWidth,
            h: blockHeight
        });
        player.update();
    }

    function jump() {
        if (!jumping) {
            jumping = true;
            player.yv = -jumpSpeed;
            jumpStart = ticker.currentTick;
            return;
        }
    }

    function land() {
        if (player.yv >= 0) {
            player.yv = 0;
            jumping = false;
        }
    }

    function exertGravity() {
        player.yv += gravity / millisecondsPerFrame;
        player.applyVelocity();

        if (player.y > groundPosition) {
            player.setY(groundPosition);
            land();
        }
    }

    function checkCollisions() {
        _(obstacles).each(function(obstacle) {
            var x = obstacle.x * blockWidth,
                y = groundPosition - obstacle.y * blockDepth,

                obstacleLeft = x + blockBounds.left,
                obstacleRight = x + blockBounds.right,
                obstacleTop = y + blockBounds.top,
                obstacleBottom = y + blockBounds.bottom,

                playerLeft = player.x + playerBounds.left,
                playerRight = player.x + playerBounds.right,
                playerTop = player.y + playerBounds.top,
                playerBottom = player.y + playerBounds.bottom,

                insideLeft = obstacleLeft < playerRight,
                insideRight = obstacleRight > playerLeft,
                insideTop = obstacleTop < playerBottom,
                insideBottom = obstacleBottom > playerTop,

                differenceLeft, differenceRight, differenceTop, differenceBottom, minimum;

            if (insideLeft && insideRight && insideTop && insideBottom) {
                differenceLeft = playerRight - obstacleLeft;
                differenceRight = obstacleRight - playerLeft;
                differenceTop = playerBottom - obstacleTop;
                differenceBottom = obstacleBottom - playerTop;
                minimum = Math.min(differenceLeft, differenceRight, differenceTop, differenceBottom);

                if (differenceLeft == minimum) {
                    player.setX(obstacleLeft - playerBounds.right);
                } else if (differenceRight == minimum) {
                    player.setX(obstacleRight - playerBounds.left);
                } else if (differenceTop == minimum) {
                    player.setY(obstacleTop - playerBounds.bottom);
                    land();
                } else if (differenceBottom == minimum) {
                    player.setY(obstacleBottom - playerBounds.top);
                }
            }
        });
    }

    function sprite(name) {
        return spritePath + name;
    }

    function run() {
        ticker.run();
    }

    setup();
    run();
}, 0);
