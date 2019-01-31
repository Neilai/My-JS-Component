---
title: button
---
## 图标按钮
<button-demo></button-demo>

#### 源码

```html
  <button class="button1">按钮1</button>
  <button class="button2">按钮2</button>
  <button class="button3">按钮3</button>
```



```javascript
let button1=new Button(".button1")
let button2=new Button(".button2",{"icon":"download"})
let button3=new Button(".button3",{"icon":"setting"})
```

## 按钮组



<button-group></button-group>

#### 源码

```html
<div class="button-group">
        <button class="button4">按钮4</button>
        <button class="button5">按钮5</button>
        <button class="button6">按钮6</button>
 </div>
```

## 按钮状态切换



<button-toggle></button-toggle>

#### 源码 

```javascript
 let button7=new Button(".button7",{"icon":"upload"})
 setInterval(()=>{ button1.toggle()},3000)
```

