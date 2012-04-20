jQuery(document).ready(function () {
    var angle_step = 25 / 180 * Math.PI;

    function iterate(str, iteration, target) {
        var tree = "";
        for (var i = 0; i < str.length; i++) {
            var char = str.substr(i, 1);
            if (char == "X") {
                tree += "F-[[X]+X]+F[+FX]-X";
            } else if (char == "F") {
                tree += "FF";
            } else {
                tree += char;
            }
        }
        if (iteration < target) {
            tree = iterate(tree, iteration + 1, target);
        }
        return tree;
    }

    function draw (x, iterations) {
        var tree = iterate("X", 0, iterations);
        var y = 600;
        var len = 1;
        var a = 0;
        var stack = [];
        var ctx = $('canvas')[0].getContext('2d');
        for (var i = 0; i < tree.length; i++) {
            ctx.beginPath();
            ctx.moveTo(x, y);

            var char = tree.substr(i, 1);
            if (char == "X") {
            } else if (char == "F") {
                x += len * Math.sin(a);
                y -= len * Math.cos(a);
                ctx.lineTo(x, y);
            } else if (char == "-") {
                if (Math.random() < 0.1) {
                    a += angle_step;
                } else {
                    a -= angle_step;
                }
            } else if (char == "+") {
                if (Math.random() < 0.1) {
                    a -= angle_step;
                } else {
                    a += angle_step;
                }
            } else if (char == "[") {
                stack.push([x, y, a]);
            } else if (char == "]") {
                var coords = stack.pop();
                x = coords[0];
                y = coords[1];
                a = coords[2];
                ctx.moveTo(x, y);
            }
            ctx.stroke();
        }
    }

    for (var z = 1; z < 7; z++) {
        draw( 20 * z*z, z);
    }
});
