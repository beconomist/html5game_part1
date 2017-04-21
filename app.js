var canvas;
var context;
var images = {};
var totalResources = 6;
var numResourcesLoaded = 0;
var fps = 30;

// 畫圖的位置
var charX = 245;
var charY = 185;

function loadImage(name) {
  // Create new img tag instance
  // equals to document.createElement('img')
  images[name] = new Image();
  images[name].onload = function() {
    resourceLoaded(images[name]);
  }
  images[name].src = "./images/" + name + ".png";
}

function prepareCanvas(canvasDiv, canvasWidth, canvasHeight) {

  canvas = document.createElement('canvas');
  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);
  canvas.setAttribute('id', 'canvas');
  canvasDiv.appendChild(canvas);

  context = canvas.getContext('2d');

  loadImage("leftArm");
  loadImage("legs");
  loadImage("torso");
  loadImage("rightArm");
  loadImage("head");
  loadImage("hair");

}

function resourceLoaded(image) {
  console.log(image);
  numResourcesLoaded += 1;
  if (numResourcesLoaded === totalResources) {
    // 每1秒重畫30次
    setInterval(redraw, 1000 / fps);
  }
}

function redraw() {

  var x = charX;
  var y = charY;

  canvas.width = canvas.width; // 清除canvas
  // context.clearRect(0, 0, canvas.width, canvas.height);

  // 畫影子，因為希望畫在最下面，所以放到最上面
  drawEllipse(x + 40, y + 29, 160 - breathAmt, 6);

  context.drawImage(images['leftArm'], x + 40, y - 42 - breathAmt);
  context.drawImage(images['legs'], x, y);
  context.drawImage(images['torso'], x, y - 50);
  context.drawImage(images['rightArm'], x - 15, y - 42 - breathAmt);
  context.drawImage(images['head'], x - 10, y - 125 - breathAmt);
  context.drawImage(images['hair'], x - 37, y - 138 - breathAmt);

  // 畫眼睛，因為眼睛是動態的所以不用圖做
  drawEllipse(x + 47, y - 68 - breathAmt, 8, curEyeHeight); // 左眼
  drawEllipse(x + 58, y - 68 - breathAmt, 8, curEyeHeight); //右眼

}

function drawEllipse(centerX, centerY, width, height) {

  context.beginPath();

  // 移動起點到 X, Y
  context.moveTo(centerX, centerY - height/2 );

  // 開始繪製半邊的眼睛
  context.bezierCurveTo(
    centerX + width/2, centerY - height/2,
    centerX + width/2, centerY + height/2,
    centerX, centerY + height/2
  );
  // 開始繪製另一個半邊的眼睛
  context.bezierCurveTo(
    centerX - width/2, centerY + height/2,
    centerX - width/2, centerY - height/2,
    centerX, centerY - height/2
  );

  // 填入黑色
  context.fillStyle = 'black';
  context.fill();

  // 結束繪圖
  context.closePath();

}

// ****
// Breath
// ****
var breathInc = 0.1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);

function updateBreath() {

  if (breathDir === 1) { //吸氣
      breathAmt -= breathInc;
      if (breathAmt < -breathMax) {
        breathDir = -1;
      }
  } else { //呼氣
    breathAmt += breathInc;
    if (breathAmt > breathMax) {
      breathDir = 1;
    }
  }

}

// ****
// Blink
// ****
var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
var eyeOpenTime = 0;
var timeBtwBlinks = 3000;
var blinkUpdateTime = 200;
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);

function updateBlink() {

  eyeOpenTime += blinkUpdateTime;

  if (eyeOpenTime >= timeBtwBlinks) {
    blink();
  }

}

function blink() {
  // console.log('curEyeHeight: ' + curEyeHeight);
  curEyeHeight -= 1;
  if (curEyeHeight <= 0) {
    eyeOpenTime = 0;
    curEyeHeight = maxEyeHeight;
  } else {
    setTimeout(blink, 10);
  }

}
