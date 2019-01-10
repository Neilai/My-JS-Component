/**
 * Created by Neil
 * 2019-01-10 13:57
 */

class Collapse{
    constructor(selector,arg){
        this.$ele=document.querySelector(selector)
        this.$collapseItems=this.$ele.querySelectorAll(".collapseItem")
        this.open=[0]
        this.single=arg["single"]||false
        this.addEvent()
        this.updateStyle()
    }
    updateStyle(){
        this.$collapseItems.forEach((item,index)=>{
               if(this.open.includes(index)){
                   item.querySelector(".content").style.display="block"
               }else{
                   item.querySelector(".content").style.display="none"
               }
        })
    }
    addEvent(){
        console.log(this.$collapseItems);
        this.$collapseItems.forEach((item,index)=>{
            item.querySelector(".title").addEventListener("click",()=>{
                if(this.open.includes(index)){
                    this.open.splice(index,1)
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