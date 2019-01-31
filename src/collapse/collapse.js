/**
 * Created by Neil
 * 2019-01-10 13:57
 */

class Collapse{
    constructor(selector,arg={"single":false}){
        this.$ele=document.querySelector(selector)
        this.$collapseItems=this.$ele.querySelectorAll(".collapseItem")
        this.open=[0]
        this.height=[]
        this.single=arg["single"]
        this.addEvent()
        this.updateStyle()
    }
    updateStyle(){
        console.log(this.height);
        this.$collapseItems.forEach((item,index)=>{
               if(this.open.includes(index)){
                   item.querySelector(".content").style.height=this.height[index]
               }else{
                   item.querySelector(".content").style.height="0"
               }
        })
    }
    addEvent(){
        this.$collapseItems.forEach((item,index)=>{
            this.height.push(window.getComputedStyle(item.querySelector(".content"))["height"])
            item.querySelector(".title").addEventListener("click",()=>{
                if(this.open.includes(index)) {
                    this.open.splice(this.open.indexOf(index),1)
                }else if(!this.single){
                    this.open.push(index)
                }else{
                    this.open=[index]
                }
                this.updateStyle()
            },false)
        })
    }
    select(indexArray){
        this.open=indexArray
        this.updateStyle()
    }
}
window.Collapse=Collapse