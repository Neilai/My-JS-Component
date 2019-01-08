/**
 * Created by Neil
 * 2019-01-08 15:04
 */
import "./icon.js"
class Button{
    constructor(selector,arg){
        this.ele=document.querySelector(selector)
        this.icon=arg["icon"]||""
        this.position=arg["position"]||"right"
        this.loading=arg["loading"]||false
        this.setStyle()
    }
    createSvg(){
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("class", "icon")
        svg.setAttribute("aria-hidden", "true")
        if(this.loading){
            svg.setAttribute("class","icon loading")
            svg.innerHTML=`<use xlink:href="#icon-loading"></use>`
        }
        else
            svg.innerHTML=`<use xlink:href="#icon-${this.icon}"></use>`
        return svg
    }
    setStyle(){
        this.ele.classList.add("magic")
        if(this.icon){
            let oldSvg=this.ele.getElementsByTagName("svg")[0]
            oldSvg&&this.ele.removeChild(oldSvg)
            let svg=this.createSvg()
            if(this.position=="right")
                this.ele.appendChild(svg)
            else
                this.ele.insertBefore(svg,this.ele.childNodes[0])
        }
    }
    toggle(){
        this.loading=!this.loading
        this.setStyle()
    }
}
window.Button=Button
