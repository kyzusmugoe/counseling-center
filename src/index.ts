import './sass/main.sass'
import { 
    ParallaxScrolling,
    PopImage
} from './js/app'

ParallaxScrolling()
PopImage('pop-btn')

//import Swiper, { Pagination, Navigation, Controller, Thumbs, Lazy, Autoplay, EffectFade } from 'swiper';

//手機板關閉按鈕
const menu = document.querySelector(".nav .right .menu") as HTMLElement
const mOpen = document.querySelector(".nav .right .mMenuOpen") as HTMLElement
const mClose = document.querySelector(".nav .right .mHead .close") as HTMLElement
if(mClose && mOpen){
    mOpen.addEventListener("click", ()=>{
        menu.classList.add('on')
    })
    mClose.addEventListener("click", ()=>{
        menu.classList.remove('on')
    })
}

//team
const teamBox = document.querySelector('.teamBox') as HTMLDivElement  
if(teamBox){
    let teamSN:number=0
    let total:number = document.querySelectorAll('.teamBox .member').length as number
    let startX:number = 0
    let movSw:boolean = false

    const move= (dir:"L"|"R")=>{
        if(dir=="L"){ 
            if(teamSN < (total - 1)){
                teamSN++
            }
        }else{ 
            if(teamSN > 0){
                teamSN--
            }
        }
        teamBox.scrollLeft = teamBox.clientWidth * teamSN
    }
    
    document.querySelectorAll(".prev, .next").forEach(btn=>{
        btn.addEventListener("click", (event)=>{
            const _b = event.currentTarget as HTMLDivElement
            const dir = _b.dataset.ctrl as string
            if(dir=="next"){ 
                move("L")
            }else{ 
                move("R")
            }0
        })
    })

    document.addEventListener('touchstart', event=>{
        movSw = true
        startX = event.touches[0].clientX as number
    }, false);

    document.addEventListener('touchmove',  event=>{
        if(movSw){
            if((event.touches[0].clientX as number- startX) > 0){ 
                move("R")
            }else{ 
                move("L")
            }
            movSw = false
        }        
     }, false);

    window.addEventListener('resize',()=>{
        teamBox.scrollLeft = teamBox.clientWidth * teamSN
    })
}

//物件進入畫面
const observer = new IntersectionObserver((entries)=> {
    if(entries[0].isIntersecting === true){
		entries[0].target.classList.add('on')
        observer.unobserve(entries[0].target as HTMLElement);
    }    
}, {
    threshold: [0]
});

const boxes = document.querySelectorAll(".rpBox, .menuList") as NodeList
if(boxes.length>0){
    boxes.forEach((box)=>{
        observer.observe(box as HTMLElement);
    })    
}

//nav 隨著滑動固定版面
const nav  = document.querySelector('.nav-container') as HTMLDivElement
document.addEventListener('scroll', ()=>{
    if(window.scrollY > nav.offsetHeight){
        nav.classList.add('fix')
    }else{
        nav.classList.remove('fix')
    }    
})

//img loader
const imgs:NodeList = document.querySelectorAll(".loading") as NodeList

if(imgs.length>0){
    imgs.forEach(item=>{
        const box:HTMLElement = item as HTMLElement
        const img = new Image()
        img.src = box.dataset.loading as string
        box.style.display = 'none'
        
        img.addEventListener('load',()=>{
            box.style.display = 'block'
        })
        /*
        img.onload=()=>{
            alert('complete')
        }
        */
    })
}