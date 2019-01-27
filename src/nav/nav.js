/**
 * Created by Neil
 * 2019-01-18 17:20
 */
import "../svg.js"
class Nav{
    constructor(selector,arg={}){
        this.$ele=document.querySelector(selector)
        this.$subNavs=this.$ele.querySelectorAll('.sub-nav')
        console.log(this.$subNavs)
        this.addEvent()
    }
    addEvent(){
        this.$subNavs.forEach((item,index)=>{
            let label=item.querySelector(".sub-nav-label")
            label.innerHTML+=`<svg class="icon"aria-hidden="true">
                    <use xlink:href="#icon-arrow"></use>
                </svg>`
            let popover=item.querySelector(".sub-nav-popover")
            item.addEventListener("mouseover",(e)=>{
                popover.style.display="block"
                item.classList.add("open")
            })
            item.addEventListener("mouseleave",(e)=>{
                popover.style.display="none"
                item.classList.remove("open")
            })
        })
    }
}
window.Nav=Nav