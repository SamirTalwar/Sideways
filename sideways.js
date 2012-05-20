setTimeout(function() {
    function setup(callback) {
        setTimeout(callback, 0);
    }

    setup(function() {
        backdrop('skyblue');
    });

    var scene = sjs.Scene({
            w: document.body.offsetWidth,
            h: document.body.offsetHeight
        }),
        background = scene.Layer('background', {color: 'white'});

    function backdrop(color) {
        background.setColor(color);
    }
}, 0);
