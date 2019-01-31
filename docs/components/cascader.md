---
title: cascader
---
## 示例
<ClientOnly><cascader-demo></cascader-demo></ClientOnly>
## 源码
```javascript
 let source = [
        {
            name: "浙江",
            children: [
                {
                    name: "杭州",
                    children: [{name: "上城"}, {name: "下城"}, {name: "江干"}]
                },
                {
                    name: "嘉兴",
                    children: [{name: "南湖"}, {name: "秀洲"}, {name: "嘉善"}]
                }
            ]
        },
        {
            name: "福建",
            children: [
                {
                    name: "福州",
                    children: [{name: "鼓楼"}, {name: "台江"}, {name: "仓山"}]
                }
            ]
        },
        {
            name: "安徽",
            children: [
                {
                    name: "合肥",
                    children: [
                        {
                            name: "瑶海"
                        },
                        {
                            name: "庐阳"
                        }
                    ]
                }
            ]
        }
    ]
  let cascader = new Cascader(".cascader", {"source": source})
```