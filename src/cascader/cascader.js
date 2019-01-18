/**
 * Created by Neil
 * 2019-01-17 21:34
 */
import '../svg.js'
class Cascader{
    constructor(selector,arg){
        this.$ele=document.querySelector(selector)
        this.source=arg["source"]
        this.height=arg["height"]||200
        this.selected=[]
        this.selectedNames=[]
        this.onClickDocument=this.onClickHandler.bind(this)
        this.createTrigger()
    }
    onClickHandler(e){
        this.selected=[]
        this.selectedName=[]
        this.updateStyle()
    }
    createTrigger(){
        this.$trigger=document.createElement("div")
        this.$trigger.className="trigger"
        this.$trigger.addEventListener("click",(e)=>{
            e.stopPropagation()
            if(this.selected.length){
                this.selected=[]
                document.removeEventListener("click",this.onClickDocument)
            }
            else{
                document.addEventListener("click",this.onClickDocument)
                this.selected.push(this.source)
            }
            this.updateStyle()
        })
        this.$ele.appendChild(this.$trigger)
    }
    updateStyle(){
        this.close()
        if(this.selected.length){
            this.$popoverWrapper=document.createElement("div")
            this.$popoverWrapper.className="popover-wrapper"
            this.selected.forEach((item,index)=>{
                this.$popoverWrapper.appendChild(this.createCascaderItem(item))
            })
            this.$popoverWrapper.addEventListener("click",(e)=>{
                e.stopPropagation()
            })
            this.$ele.appendChild(this.$popoverWrapper)
        }
        this.$trigger.innerHTML=this.selectedNames.join("/")
    }
    close(){
        this.$ele.querySelector(".popover-wrapper")&&this.$ele.querySelector(".popover-wrapper").remove()
    }
    findPath(item){
        this.selected=[]
        this.selectedNames=[]
        let dfs=(x)=>{
            this.selected.push(x)
            for(let each of x){
                this.selectedNames.push(each.name)
                if(each.name==item.name) {
                    each.children&&this.selected.push(each.children)
                    return each
                }
                else{
                   if(each.children){
                       let result=dfs(each.children)
                       if(result)
                           return result
                   }
                }
                this.selectedNames.pop()
            }
            this.selected.pop()
            return undefined
        }
        dfs(this.source)
    }
    createCascaderItem(items){
        let cascaderItem=document.createElement("div")
        cascaderItem.className="cascaderItem"
        cascaderItem.style.height=this.height+"px"
        items.forEach((item,index)=>{
            let label=document.createElement("div")
            label.className="label"
            label.innerHTML=item.name
            if(item.children){
                label.innerHTML+=`<svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-arrow"></use>
                </svg>`
            }
            label.addEventListener("click",()=>{
                    this.findPath(item)
                    this.updateStyle()
                    if(!item.children) this.close()
            })
            cascaderItem.appendChild(label)
        })
        return cascaderItem
    }
}
window.Cascader=Cascader