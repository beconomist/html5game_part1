Create A Game Character with HTML5 and Javascript Part I
==


### Flow

1. Draw images via software
1. Copy images to local folder
1. Create HTML file
  1. Create `<div>` inside `<body>`
  1. Insert `<script>` to reference app.js
  1. Insert `prepareCanvas()`
1. Create JS file
  1. Create canvas: `prepareCanvas()`
  1. Load image: `loadImage()`
  1. When all is loaded, call redraw() 30 times per second  `recourceLoaded()`
1. Redraw()
  1. 畫橢圓形 `drawEllipse()`
  1. 畫影子
  1. 畫images
  1. 畫眼睛
1. Breath
  1. Update breath: 每秒30次，`updateBreath()`
  1. 依據呼吸調整image高低位置
1. Blink
  1. Update blink: 每0.2秒確認一次，每4秒眨眼一次 `updateBlink()`
  1. 眨眼 `blink()`：眼睛高度每0.01秒減少1px，高度變成0時，重設成`maxEyeHeight`
