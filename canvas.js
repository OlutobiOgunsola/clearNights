const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

randomInt = (x, y) => {
  return Math.random() * (y - x + 1) + x;
};

randomColors = colors => {
  colors[Math.floor(Math.random * colors.length)];
};

const moon = function() {
  this.x = 300;
  this.y = 300;
  this.dx = 0.1;
  this.dy = 0.01;
  this.radius = 20;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowBlur = 50;
    c.shadowColor = "white";
    c.fillStyle = "rgba(254,241,223,0.5)";
    c.strokeStyle = "rgba(255,255,200,0.5)";
    c.stroke();
    c.fill();
    c.closePath();
  };
  this.update = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowBlur = 50;
    c.shadowColor = "white";
    c.fillStyle = "white";
    c.strokeStyle = "rgba(255,255,200,0.5)";
    c.stroke();
    c.fill();
    this.x += 0.1;
    this.y -= 0.01;
    this.radius -= 0.0005;

    if (this.x > window.innerWidth + this.radius) {
      this.x = -20;
      this.y = 300;
      this.radius = 20;
    }
  };
};

const star = function(x, y) {
  var dx, dy, radius;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = randomInt(0.2, 0.5);
  var freezeRad = this.radius.valueOf();
  var shadowblur = 2;
  var brightness;
  if (this.radius < 0.5) {
    brightness = 0.5;
  } else {
    brightness = 0.3;
  }
  const starColors = [
    "rgba(155, 176, 255," + brightness + ")",
    "rgba(170, 191, 255," + brightness + ")",
    "rgba(202, 215, 255," + brightness + ")",
    "rgba(248, 247, 255," + brightness + ")",
    "rgba(255, 244, 234," + brightness + ")",
    "rgba(255, 210, 161," + brightness + ")",
    "rgba(255, 204, 111," + brightness + ")"
  ];

  var mouseY;
  var mouseX;
  window.addEventListener("mousemove", e => {
    mouseX = e.x;
    mouseY = e.y;
  });

  this.color = starColors[Math.floor(Math.random() * 7)];
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowBlur = shadowblur;
    c.shadowColor = "white";
    c.fillStyle = this.color;
    c.fill();
  };
  this.update = function() {
    var v = 0;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowBlur = shadowblur;
    c.shadowColor = "white";
    c.fillStyle = this.color;
    c.fill();

    if (
      mouseX - this.x < 50 &&
      mouseX - this.x > 0 &&
      mouseY - this.y > 50 &&
      mouseY - this.y > 0
    ) {
      if (this.radius < 2) {
        brightness += 0.2;
        this.radius += 0.1;
        shadowOffsetX: 5;
      }
    } else if (this.radius > freezeRad) {
      brightness -= 0.2;
      this.radius -= 0.1;
    }
  };
};

const brightStar = function(x, y) {
  var dx, dy, radius;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = randomInt(0.5, 1);
  var shadowblur = 10;
  var brightness = 1;
  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowBlur = shadowblur;
    c.shadowColor = "white";
    c.fillStyle = "rgba(248, 247, 255," + brightness + ")";
    c.fill();
    c.closePath();
  };
};

var starArray = [];
var brightStars = [];
for (var i = 0; i < 500; i++) {
  var spawnWidth = Math.random() * window.innerWidth;
  var spawnHeight = Math.random() * window.innerHeight;
  var starr = new star(spawnWidth, spawnHeight);

  starArray.push(starr);
}
for (var i = 0; i < 10; i++) {
  var spawnWidth = Math.random() * window.innerWidth;
  var spawnHeight = Math.random() * window.innerHeight;
  var starz = new brightStar(spawnWidth, spawnHeight);

  brightStars.push(starz);
}

const comet = function(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = randomInt(0.2, 0.5);
  var shadowblur = 10;
  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowBlur = shadowblur;
    c.shadowColor = "white";
    c.strokeStyle = "rgba(255, 255, 255, 0.01)";
    c.stroke();
    c.fillStyle = "rgba(226, 255, 230,0.5)";
    c.fill();
    c.closePath();
  };
  this.update = () => {
    storePosition(this.x, this.y);

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowBlur = shadowblur;
    c.shadowColor = "white";
    c.strokeStyle = "rgba(226, 88, 34, 0.01)";
    c.stroke();
    this.x += dx;
    this.y += dy;
    this.radius -= 0.0005;
    for (var i = 0; i < positions.length; i++) {
      var ratio = (i + 1) / positions.length;
      var radiis = i / 100;
      c.beginPath();
      c.arc(positions[i].x, positions[i].y, radiis, 0, Math.PI * 2, false);
      c.fillStyle = "rgba(226, 88, 34," + ratio / 10 + ")";
      c.fill();
    }
  };
  var positions = [];
  maxLength = 250;
  storePosition = (xPos, yPos) => {
    x = xPos;
    y = yPos;
    positions.push({ x: xPos, y: yPos });

    if (positions.length > maxLength) {
      positions.shift();
    }
  };
};
var streaks = [];
function cometStreak() {
  randomInit = randomInt(1, 2);
  streaks.length = 0;
  var dxs = Math.random() * 4;
  var dys = Math.random() * 2;
  var firstCometX = Math.random() * window.innerWidth - 200;
  var firstCometY = Math.random() * window.innerHeight - 200;
  var randomSpace = randomInt(10, 30);
  if (randomInit === 1) {
    var xs = Math.random() * window.innerWidth - 200;
    var ys = Math.random() * window.innerHeight - 200;
    var streak = new comet(xs, ys, dxs, dys);
    if (xs > window.innerWidth / 2) {
      dxs = -dxs;
    } else if (ys > window.innerHeight / 2) {
      dys = -dys;
    }
    streaks.push(streak);
  } else {
    for (var v = 0; v < randomInit; v++) {
      var xs = firstCometX;
      var ys = firstCometY;
      if (xs > window.innerWidth / 2) {
        dxs = -dxs;
      } else if (ys > window.innerHeight / 2) {
        dys = -dys;
      }
      var streak = new comet(xs, ys, dxs, dys);
      streaks.push(streak);

      firstCometX += randomSpace;
      firstCometY += 5;
    }
  }
}

// console.log(streaks);
// if (streaks[0].onscreen()) {
//   console.log("Theres a streak onscreen");
// }
// }
setInterval(() => {
  cometStreak();
}, 30000);
window.addEventListener("mousedown", function() {
  cometStreak();
});
// var streak = new comet(200, 200, 1, 1);
// streak.draw();
var myMoon = new moon();
myMoon.draw();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  starArray.forEach(star => {
    star.draw();
    star.update();
  });
  brightStars.forEach(starz => {
    starz.draw();
  });
  streaks.forEach(element => {
    element.draw();
    element.update();
  });
  myMoon.update();
}
animate();
