# My-JS-Component
我个人的原生JS组件库，所有组件都由class指定，由data-param传入组件参数，由data-value返回数据

#### 日历

```html
<script type="text/javascript" src="./calendar.js" ></script>
<div class="calendar" data-param={"size":1,"isRange":true,"limitRange":[20180101,20180201]}>
```

size表示大小，isRange表示是否能选择一个范围，limitRange表示可选范围