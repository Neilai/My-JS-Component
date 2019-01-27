/**
 * Created by Neil
 * 2019-01-27 21:37
 */
class Sticky{
    constructor(selector,arg={"distance":0}){
        this.distance=arg["distance"]
        this.$ele=document.querySelector(selector)
        this.$sticky=this.$ele.querySelector(".sticky")
        this.$sticky.style.position="fixed"
        this.$ele.height=this.$sticky.getBoundingClientRect().height
        this.addEvent()
    }
    addEvent(){
        document.addEventListener("scroll",()=>{
            let {top} = this.$sticky.getBoundingClientRect()
            if (window.scrollY > top+window.scrollY - this.distance){
                let {height, left, width} = this.$sticky.getBoundingClientRect()
                this.$sticky.height = height + 'px'
                this.$sticky.left = left + 'px'
                this.$sticky.width = width + 'px'
                this.$sticky.top = this.distance + 'px'
            }else{
                this.$sticky.height = undefined
                this.$sticky.left = undefined
                this.$sticky.width = undefined
            }
        })
    }

}
window.Sticky=Sticky