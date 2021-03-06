var moving_text_node;
var x_position = 0;
var direction = "right";

function startscroll() {
    var doc_width = document.body.clientWidth;
    var moving_text_node = document.getElementsByTagName('h1')[0];

    the_timer = setInterval(function () {
        if (x_position > doc_width - 300)
            direction = "left";
        else if (x_position === 0)
            direction = "right";

        if (direction === "right")
            x_position += 2;
        else
            x_position -= 2;

        moving_text_node.style.left = x_position;
    }, 30);
}

function stopscroll() {
    clearInterval(the_timer);
}

function togglescroll() {
    var btnStop = document.getElementById("btnStop");
    if (btnStop.textContent === "Stop") {
        stopscroll();
        btnStop.textContent = "Start";
    }
    else {
        startscroll();
        btnStop.textContent = "Stop";
    }
}