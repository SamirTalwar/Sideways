setTimeout(function() {
    var width = document.body.offsetWidth,
        height = document.body.offsetHeight,

        blockWidth = 101,
        blockHeight = 171,
        blockDepth = 42;

    function setup(callback) {
        setTimeout(callback, 0);
    }

    setup(function() {
        backdrop('skyblue');
        ground();
    });

    var scene = sjs.Scene({w: width, h: height}),
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
}, 0);
