var jet = document.getElementById("jet");
var board = document.getElementById('board');


window.addEventListener("keydown", (e) => {
    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if (e.key === "ArrowLeft" && left > 0) {
        jet.style.left = left - 10 + "px";
    }
    else if (e.key === "ArrowRight" && left <= 451) {
        jet.style.left = left + 10 + "px";
    }
    if (e.key === "ArrowUp" || e.keyCode === 32) {
        var bullet = document.createElement('div');
        bullet.classList.add('bullets');
        board.appendChild(bullet);

        var moveBullets = setInterval(() => {

            var rocks = document.getElementsByClassName("rocks");
            for (var i; i < rocks.length; i++) {
                var rock = rocks[i];

                var rockbound = rock.getBoundingClientRect();
                var bulletbound = bullet.getBoundingClientRect();

                if (bulletbound.left >= rockbound.left && bulletbound.right <= rockbound.right && bulletbound.top <= rockbound.top && bulletbound.bottom >= rockbound.bottom) {
                    rock.parentElement.removeChild(rock);
                }
            }
            var bulletBottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));
            bullet.style.left = left + "px";
            bullet.style.bottom = bulletBottom + 3 + "px";
        })
    }
});


var generateRocks = setInterval(() => {
    var rock = document.createElement("div");
    rock.classList.add('rocks');

    var rockleft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));

    rock.style.left = Math.floor(Math.random() * 450) + "px";
    board.appendChild(rock);
}, 1500);


var moverocks = setInterval(() => {
    var rocks = document.getElementsByClassName("rocks");

    if (rocks != undefined) {
        for (var i = 0; i < rocks.length; i++) {
            //Now I have to increase the top of each rock,so that the rocks can move downwards..
            var rock = rocks[i]; //getting each rock
            var rocktop = parseInt(
                window.getComputedStyle(rock).getPropertyValue("top")
            );
            //475 => boardheight - rockheight + 25
            if (rocktop >= 475) {
                alert("Game Over");
                clearInterval(moverocks);
                window.location.reload();
            }

            rock.style.top = rocktop + 25 + "px";
        }
    }
}, 450);