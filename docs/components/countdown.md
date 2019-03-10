---
title: countdown
---

## 示例
<ClientOnly><countdown-demo></countdown-demo></ClientOnly>

## 源码
```javascript
let countdown1 = new Countdown(".countdown1")
let countdown2= new Countdown(".countdown2",{'format': 'hh:mm:ss', 'interval': 1000, 'startTime': "12:00:00", 'endTime':"11:55:55"})
```