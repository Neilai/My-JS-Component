# My-JS-Component
我个人的原生JS组件库，所有组件都由class指定，由data-param传入组件参数，由data-value返回数据

## 使用方法

所有组件在使用前必须重置css

```html
<link rel="stylesheet" type="text/css" href="./cssreset-min.css">
```

### 日历

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

### 滚动条

```html
<div class="scrollbar" style="width:160px;height:100px">
    <div class="content">
          <p>填充内容填充内容填充内容填充内容填充内容填充内容
              填充内容填充内容填充内容填充内容填充内容填充内容
              填充内容填充内容填充内容填充内容填充内容填充内容
              填充内容填充内容填充内容填充内容填充内容填充内容
              填充内容填充内容填充内容填充内容填充内容填充内容
              填充内容填充内容填充内容填充内容填充内容填充内容</p>
        </div>
</div>
<script type="text/javascript" src="./scrollbar.js"></script>
```

只要指定scrobar的width和height，在content的div中填充内容，就会自动生成滚动条。

### 滑动条

```html
<div class="range" data-param={"size":1,"min":0,"max":100,"value":50}></div>
<script type="text/javascript" src="./range.js">
```

size表示大小，min，max分别表示最大最小范围，value表示初始值

### 手风琴

```html
<div class="accordion" data-param={"expose":30,"speed":30,"direction":"x"}>
        <img src="1.jpg" class="accordion-list">
        <img src="2.jpg" class="accordion-list">
        <img src="3.jpg" class="accordion-list">
</div>
```

只要指定 accordionlist的长度与宽度，expose表示折叠组件暴露宽度，direction表示方向，speed表示动画速度

### 倒计时

```html
<div class="countdown" data-param={"format":"hh:mm:ss","interval":1000,"starttime":10,"endtime":0}></div>
<script src="countdown.js" type="text/javascript"></script>
```

format表示显示的格式(用于非秒倒计时)，starttime和endtime指开始和结束时间，interval表示倒计时间隔

### 自动上滚

```html
<div class="scrollup">
    <div class="scrollup-content">
        <div class="scrollup-list">list-1</div>
        <div class="scrollup-list">list-2</div>
        <div class="scrollup-list">list-3</div>
        <div class="scrollup-list">list-4</div>
        <div class="scrollup-list">list-5</div>
        <div class="scrollup-list">list-6</div>
        <div class="scrollup-list">list-7</div>
        <div class="scrollup-list">list-8</div>
        <div class="scrollup-list">list-9</div>
    </div>
</div>
<script type="text/javascript" src="./scrollup.js"></script>
```

在scrrollup-list填充需要上滚的元素，长度和宽度可以自己设定。

```css
        .scrollup{
            width: 240px;
            height: 140px;
        }
        .scrollup-list{
            height: 24px;
            line-height: 24px;
        }
```

