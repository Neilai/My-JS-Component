# My-JS-Component
我个人的原生JS组件库，所有组件都由class指定，由data-param传入组件参数，由data-value返回数据

所有组件在使用前必须重置css

```html
<link rel="stylesheet" type="text/css" href="./cssreset-min.css">
```

###日历

```html
<script type="text/javascript" src="./calendar.js" ></script>
<div class="calendar" data-param={"size":1,"isRange":true,"limitRange":[20180101,20180201]}>
```

size表示大小，isRange表示是否能选择一个范围，limitRange表示可选范围

### 轮播图

```html
<div class="carousel" data-param={"size":1,"speeds":30,"autoPlay":true,"times":3000}>
        <img src="1.jpg" class="carousel-slide" >
        <img src="2.jpg" class="carousel-slide">
        <img src="3.jpg" class="carousel-slide">
</div>
<script type="text/javascript" src="./carousel.js"></script>
```

size表示大小，speeds表示滑动速度，times表示切图速度，autoplay表示是否自动播放