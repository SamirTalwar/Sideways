setTimeout(function() {
    var width = document.body.offsetWidth,
        height = document.body.offsetHeight,

        blockWidth = 101,
        blockHeight = 171,
        blockDepth = 42,

        scene, ticker, input, foreground, background, player;

    function setup() {
        backdrop('skyblue');
        ground();
        newPlayer('CharacterBoy.png');
    }

    function step() {
        if (input.keyboard.right) {
            player.move(5, 0);
        }
        if (input.keyboard.left) {
            player.move(-5, 0);
        }
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
            y: height - (blockHeight + blockDepth * 2),
            w: blockWidth,
            h: blockHeight
        });
        player.update();
    }

    function run() {
        ticker.run();
    }

    setup();
    run();
}, 0);
