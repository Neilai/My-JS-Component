/**
 * Created by Neil
 * 2019-01-10 15:14
 */

class Popover{
    constructor(selector,arg={}){
        this.$trigger=document.querySelector(selector)
        this.position=arg["position"]||"bottom"
        this.action=arg["action"]||"hover"
        this.text=arg["text"]||"请输入文字"
        this.visible=false
        this.onClickDocument=this.clickHandler.bind(this)
        this.addEvent()
    }
    createPopver(){
        this.$popover=document.createElement("div")
        this.$popover.className=`magic popover position-${this.position}`
        this.$popover.innerText=this.text
        document.body.appendChild(this.$popover)
        const {width, height, top, left} = this.$trigger.getBoundingClientRect()
        const {height: height2} = this.$popover.getBoundingClientRect()
        let positions = {
            top: {top: top + window.scrollY, left: left + window.scrollX,},
            bottom: {top: top + height + window.scrollY, left: left + window.scrollX},
            left: {
                top: top + window.scrollY + (height - height2) / 2,
                left: left + window.scrollX
            },
            right: {
                top: top + window.scrollY + (height - height2) / 2,
                left: left + window.scrollX + width
            },
        }
        this.$popover.style.left = positions[this.position].left + 'px'
        this.$popover.style.top = positions[this.position].top + 'px'
    }
    close(){
        this.visible=false
        this.$popover.remove()
        document.removeEventListener('click', this.onClickDocument)
    }
    show(){
        this.visible=true
        this.createPopver()
        setTimeout(()=>{
            document.addEventListener("click",this.onClickDocument)
        })
    }
    addEvent(){
        if(this.action=="click"){
            this.$trigger.addEventListener("click",()=>{
                if(this.visible){
                    this.close()
                }else{
                    this.show()
                }
            })
        }else{
            document.addEventListener("mouseover",(e)=>{
                if(!this.visible){
                    if(this.$trigger.contains(e.target))
                        this.show()
                }
                else{
                   if(!(this.$trigger.contains(e.target)||this.$popover.contains(e.target)))
                       this.close()
                }
            })
        }
    }
    clickHandler(e){
        if(this.$popover.contains(e.target)||this.$popover==e.target){
            return
        }
        this.close()
    }
}

window.Popover=Popover