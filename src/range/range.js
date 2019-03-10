/**
 * Created by Neil
 * 2019-03-10 17:34
 */
class Range{
    constructor(selector,arg={   min: 0, max: 100,value: 1}){
        this.$ele=document.querySelector(selector)
        this.min=arg["min"]
        this.max=arg["max"]
        this.value=arg["value"]
        this.isMouseDown = false
        this.render()
        this.addEvent()
    }
    render(){
        this.$value = document.createElement("div");
        this.$value.className ="value";
        this.$handle = document.createElement("div");
        this.$handle.className = "handle";
        this.$ele.appendChild(this.$value);
        this.$ele.appendChild(this.$handle);
        this.handle_width = this.$handle.offsetWidth;
        this.width = this.$ele.offsetWidth;
        this.length = this.width / (this.max - this.min); //单元宽度
        let move=this.value*this.length
        this.$value.style.width = move + "px";
        this.$handle.style.left = move + "px";
        this.left= this.offset(this.$ele).left; //鼠标位置
        this.isMouseDown = false;
    }
    addEvent(){
        this.$ele.addEventListener('mousedown',  (e)=> {
            this.isMouseDown = true;
            this._cursor_position = e.pageX - this.left - this.$handle.offsetLeft;
        }, false);
        document.addEventListener('mousemove', (e)=> {
            if (this.isMouseDown) {
                let move = e.pageX - this.left;
                console.log(move);
                if (this._cursor_position > 0 && this._cursor_position < this._handle_width) { //鼠标在手柄中位置，对值的修正
                    move -= this._cursor_position;
                }
                move = Math.max(0, move);
                move = Math.min(move, this.width);
                console.log(move);
                this.$value.style.width = move + "px";
                this.$handle.style.left = move + "px";
                this.value = Math.round(move / (this.length)) + this.min;
                this.$ele.setAttribute("title",this.value)
            }
        }, false);
        document.addEventListener('mouseup', (e)=> {
            console.log(this.isMouseDown);
            if (this.isMouseDown) {
                this.isMouseDown = false;
            }
        }, false);
    }
    offset(curEle) {
        let totalLeft = null,  totalTop = null, par = curEle.offsetParent;
        //首先把自己本身的进行累加
        totalLeft += curEle.offsetLeft;
        totalTop += curEle.offsetTop;
        //只要没有找到body，我们就把父级参照物的边框和偏移量累加
        while (par) {
            totalLeft =totalLeft + par.clientLeft+ par.offsetLeft;
            totalTop = totalTop + par.clientTop+par.offsetTop;
            par = par.offsetParent;
        }
        return {
            left: totalLeft,
            top: totalTop
        };
    }
}
window.Range=Range
