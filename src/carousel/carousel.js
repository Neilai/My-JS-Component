/**
 * Created by Neil
 * 2019-01-27 23:25
 */
class Carousel{
    constructor(selector,arg={speeds: 30, autoPlay: true}){
        this.$ele=document.querySelector(selector)
        this.$imgs=this.$ele.querySelectorAll("img")
        this.len=this.$imgs.length
        this.imgW=this.$imgs[0].offsetWidth
        this.num=0
        this.timer=null
        this.delayTimer=null
        this.sliding=false
        this.speeds=arg["speeds"]
        this.autoPlay=arg["autoPlay"]
        this.createWrapper()
        this.clone()
        this.createBtn()
        this.createPagination()
        this.addEvent()
    }
    addEvent(){
        if(this.autoPlay) {
            this.play()
            this.$ele.addEventListener('mouseover', (e)=> {
                this.stop();
            }, false);
            this.$ele.addEventListener('mouseout',  (e)=>{
                this.play();
            }, false);
        }
        this.$prevBtn.addEventListener('click', (e)=> {
            this.go(this.imgW);
            this.updateBullet();
        }, false);
        this.$nextBtn.addEventListener('click', (e)=> {
            this.go(-this.imgW);
            this.updateBullet();
        }, false);
        this.$prevBtn.addEventListener('mouseover', function(e) {
            this.classList.add("active");
            this.addEventListener('mouseout', function(e) {
                this.classList.remove("active");
            }, false);
        }, false);
        this.$nextBtn.addEventListener('mouseover', function(e) {
            this.classList.add("active");
            this.addEventListener('mouseout', function(e) {
                this.classList.remove("active");
            }, false);
        }, false);
        this.$bullet.forEach((item,index)=>{
            item.addEventListener("click",(e)=>{
                if(this.sliding||item.className.indexOf('carousel-pagination-bullet-active') > -1)
                    return
                this.go(-this.imgW*(index-this.num));
                this.num = index ;
                this.updateBullet();
            })
        })
    }
    play() {
        this.delayTimer = setInterval(()=> {
            this.go(-this.imgW);
            this.updateBullet();
        }, 3000)
    }
    stop() {
        clearInterval(this.delayTimer)
    }
    clone(){
        let fir = this.$wrapper.children[0].cloneNode(true);
        let last = this.$wrapper.children[this.len - 1].cloneNode(true);
        this.$wrapper.appendChild(fir);
        this.$wrapper.insertBefore(last, this.$wrapper.children[0]);
        this.len = this.$wrapper.children.length;
        this.$wrapper.style.left = -this.imgW + 'px';
    }
    updateBullet(){
        for (let i = 0; i < this.$bullet.length; i++) {
            this.$bullet[i].classList.remove("carousel-pagination-bullet-active");
        }
        this.$bullet[this.num].classList.add("carousel-pagination-bullet-active");
    }
    go(offset){
        if (!this.sliding) {
            this.sliding = true;
            if (offset < 0) {
                this.num++;
                if (this.num >=this.len - 2) {
                    this.num = 0;
                }
            }
            if (offset > 0) {
                this.num--;
                if (this.num < 0) {
                    this.num = this.len - 3
                }
            }
            let dest = parseInt(this.$wrapper.style.left) + offset
            if (parseInt(this.$wrapper.style.left) < dest || parseInt(this.$wrapper.style.left) > dest) {
                this.timer = setInterval( ()=>{
                    let cur = parseInt(this.$wrapper.style.left)
                    let speed = (dest - cur) / 10
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    this.$wrapper.style.left = parseInt(this.$wrapper.style.left) + speed + 'px'
                    if (parseInt(this.$wrapper.style.left) == dest) {
                        clearInterval(this.timer)
                        this.$wrapper.style.left = dest + 'px'
                        if (dest > -this.imgW) {
                            this.$wrapper.style.left = -this.imgW * (this.len - 2) + 'px'
                        }
                        if (dest < -this.imgW * (this.len - 2)) {
                            this.$wrapper.style.left = -this.imgW + 'px'
                        }
                        this.sliding = false
                    }
                }, this.speeds)
            }
        }
    }
    createWrapper(){
        this.$wrapper=document.createElement("div");
        this.$ele.appendChild(this.$wrapper);
        this.$wrapper.className="carousel-wrapper";
        this.$imgs.forEach((img)=>{
          this.$wrapper.appendChild(img)
        })
    }
    createPagination(){
        this.$pagination = document.createElement("div");
        this.$pagination.className = "carousel-pagination";
        for (let i = 0; i < this.len-2; i++) {
            let btnspan = document.createElement("span");
            btnspan.className = "carousel-pagination-bullet";
            this.$pagination.appendChild(btnspan);
        }
        this.$ele.appendChild(this.$pagination);
        this.$bullet = this.$ele.querySelectorAll(".carousel-pagination-bullet");
        this.$bullet[0].classList.add("carousel-pagination-bullet-active");
    }
    createBtn(){
        this.$prevBtn=document.createElement("div");
        this.$nextBtn=document.createElement("div");
        this.$prevBtn.className="carousel-button carousel-button-prev"
        this.$nextBtn.className="carousel-button carousel-button-next"
        this.$ele.append(this.$prevBtn);
        this.$ele.append(this.$nextBtn);
    }
}
window.Carousel=Carousel