---
title: popover
---
## 示例
<popover-demo></popover-demo>
## 源码
```html
    <button id="a">悬浮我</button>
    <button id="b">点击我</button>
```
```javascript
  let popover1=new Popover("#a",{"position":"top","text":"上方"})
  let popover2=new Popover("#b",{"action":"click","text":"下方"})
```