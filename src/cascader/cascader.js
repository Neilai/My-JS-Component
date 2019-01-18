/**
 * Created by Neil
 * 2019-01-17 21:34
 */
class Cascader{
    constructor(selector,arg){
        this.$ele=document.querySelector(selector)
        this.source=arg["source"]
        this.height=arg["height"]||200
        this.selected=[]
        this.selectedNames=[]
        this.createTrigger()
    }
    createTrigger(){
        this.$trigger=document.createElement("div")
        this.$trigger.className="trigger"
        this.$trigger.addEventListener("click",()=>{
            this.selected.push(this.source)
            this.updateStyle()
        })
        this.$ele.appendChild(this.$trigger)
    }
    updateStyle(){
        this.close()
        if(this.selected){
            let popoverWrapper=document.createElement("div")
            popoverWrapper.className="popover-wrapper"
            this.selected.forEach((item,index)=>{
                popoverWrapper.appendChild(this.createCascaderItem(item))
            })
            this.$ele.appendChild(popoverWrapper)
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
        console.log(this.selectedNames);
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
                label.innerHTML+=`<icon class="icon"  name="right"></icon>`
            }
            label.addEventListener("click",()=>{

                    this.findPath(item)
                    this.updateStyle()

            })
            cascaderItem.appendChild(label)
        })
        return cascaderItem
    }
}
window.Cascader=Cascader