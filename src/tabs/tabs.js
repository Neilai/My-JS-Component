/**
 * Created by Neil
 * 2019-01-09 17:34
 */

class Tabs{
    constructor(selector){
        this.$ele=document.querySelector(selector)
        this.$tabsItems= this.$ele.querySelectorAll(".tabsItem")
        this.$tabsPanes=this.$ele.querySelectorAll(".tabsPane")
        this.currentIndex=0
        this.createLine()
        this.addEvent()
        this.updateStyle(this.currentIndex)
    }
    createLine(){
        this.$line=document.createElement("div")
        this.$line.className="line"
        this.$ele.querySelector(".tabsHead").appendChild(this.$line)
    }
    updateStyle(){
        let {width, height, top, left} = this.$tabsItems[this.currentIndex].getBoundingClientRect()
        this.$line.style.width = `${width}px`
        this.$line.style.left = `${left}px`
        this.$tabsItems.forEach((item,index)=>{
            if(index==this.currentIndex){
                item.classList.add("active")
            }else{
                item.classList.remove("active")
            }
        })
        this.$tabsPanes.forEach((item,index)=>{
            if(index==this.currentIndex){
                item.style.display="block"
            }else{
                item.style.display="none"
            }
        })
    }
    addEvent(){
        this.$tabsItems.forEach((item,index)=>{
            item.addEventListener("click",()=>{
                this.currentIndex=index
                this.updateStyle()
            })
        })
    }
}
window.Tabs=Tabs