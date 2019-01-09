/**
 * Created by Neil
 * 2019-01-09 14:59
 */

class Toast{
    constructor(arg){
        this.text=arg["text"]||"请输入文字"
        this.delay=arg["delay"]||""
        this.closeButton=arg["closeButton"]||true
        this.position=arg["position"]||"middle"
    }
    createToast(){
        let toastWrapper=document.createElement("div")
        toastWrapper.className=`magic toastWrapper position-${this.position}`
        let closeHtml=this.closeButton?`<div class="magic line"></div><span class="magic close">关闭</span>`:""
        toastWrapper.innerHTML=`
        <div class="magic toast">
            <div class="message">
                ${this.text}
            </div>
            ${closeHtml}
        </div>`
        this.$ele=toastWrapper
        this.setHeight()
    }
    addEvent(){
        let closeButton=this.$ele.querySelector(".magic.close")
        closeButton.addEventListener("click",()=>{
            this.close()
        },false)
    }
    setHeight(){
        let line=this.$ele.querySelector(".line")
        setTimeout(()=>{
            let {height}=this.$ele.getBoundingClientRect()
            line.style.height=`${height}px`
        },0)
    }
    show(){
        this.createToast()
        this.addEvent()
        document.body.appendChild(this.$ele)
        if(this.delay)
            setTimeout(()=> {
            console.log(this);
                this.close()
            },this.delay*1000)
    }
    close(){
        this.$ele.remove()
    }
}

window.Toast=Toast
