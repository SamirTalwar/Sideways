setTimeout(function() {
    var width = document.body.offsetWidth,
        height = document.body.offsetHeight,

        blockWidth = 101,
        blockHeight = 171,
        blockDepth = 42,

        speed = 5,

        groundPosition = height - (blockHeight + blockDepth * 2),

        scene, ticker, input, foreground, background,
        player, jumping, jumpStart;

    function setup() {
        backdrop('skyblue');
        ground();
        newPlayer('CharacterBoy.png');
    }

    function step() {
        if (input.keyboard.right) {
            player.move(speed, 0);
        }
        if (input.keyboard.left) {
            player.move(-speed, 0);
        }
        jump();
        player.update();
    }

    scene = sjs.Scene({w: width, h: height});
    ticker = scene.Ticker(step);
    input = scene.Input();
    background = scene.Layer('background', {color: 'white'});
    foreground = scene.Layer('foreground');

    function backdrop(color) {
        background.setColor(color);
    }

    function ground() {
        foreground.Sprite("PlanetCute/DirtBlock.png", {
            x: 0,
            y: height - blockHeight,
            w: width,
            h: blockHeight
        }).update();
        foreground.Sprite("PlanetCute/GrassBlock.png", {
            x: 0,
            y: height - (blockHeight + blockDepth),
            w: width,
            h: blockHeight
        }).update();
    }

    function newPlayer(filename) {
        player = foreground.Sprite("PlanetCute/" + filename, {
            x: 0,
            y: groundPosition,
            w: blockWidth,
            h: blockHeight
        });
        player.update();
    }

    function jump() {
        if (!jumping && input.keyboard.space) {
            jumping = true;
            jumpStart = ticker.currentTick;
            return;
        }

        if (!jumping) {
            return;
        }

        if (player.y > groundPosition) {
            player.setY(groundPosition);
            jumping = false;
            return;
        }

        player.yv = (ticker.currentTick - jumpStart) / 5 - 8;
        player.applyVelocity();
    }

    function run() {
        ticker.run();
    }

    setup();
    run();
}, 0);
