function showPatternContinuous() {
    setInterval(showPattern, 500);
}

function showPattern() {
    var height = 500, width = 500;
    var top_position = 25, left_position = 25;
    var color_list = [
        'AliceBlue',
        'AntiqueWhite',
        'Aqua',
        'Beige',
        'Brown',
        'BurlyWood',
        'Cornsilk',
        'FloralWhite',
        'ForestGreen',
        'Fuchsia',
        'LavenderBlush',
        'Magenta',
        'Maroon',
        'Navy',
        'SaddleBrown',
        'Salmon',
        'Turquoise',
        'Violet',
        'Yellow'
    ];
    var the_body = document.getElementById("myBody");

    while (width > 50) {
        var this_div = document.createElement("div");
        var random_color_index = Math.floor(Math.random() * color_list.length);

        this_div.style.top = top_position + "px";
        this_div.style.left = left_position + "px";
        this_div.style.height = height + "px";
        this_div.style.width = width + "px";
        this_div.style.background = color_list[random_color_index];

        the_body.appendChild(this_div);
        top_position += 10;
        left_position += 10;
        height -= 20;
        width -= 20;
    }
}