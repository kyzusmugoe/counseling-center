export const ParallaxScrolling = () => {
    const targets:NodeList = document.querySelectorAll("div.PS") as NodeList 
    if (targets) {
        window.addEventListener('scroll', (event: Event) => {
            targets.forEach((item: HTMLDivElement | any) => {
                if (item !== undefined) {
                    const _start = item.offsetTop - window.innerHeight
                    const _end = item.offsetTop + item.offsetHeight
                    if (window.pageYOffset > _start && window.pageYOffset < _end) {
                        const speed = item.dataset['speed'] ? item.dataset['speed'] as number : 1
                        const distance = item.dataset['distance'] ? item.dataset['distance'] as number : 100
                        const type:string = item.dataset['type']?item.dataset['type']:"none" 
                        if (window.pageYOffset * (speed * 0.1) < distance) {
                            if(type == "bg"){
                                item.style.backgroundPositionY = `calc(50% - ${((window.pageYOffset) * (-speed * 0.3))}px)`
                            }else{
                                item.style.transform = `translate3d(0, ${((window.pageYOffset) * (-speed * 0.3))}px, 0) `
                            }
                        }                        
                    }
                }
            })
        });
    }
}

export const PopImage = (targetClass:string) => {
    document.addEventListener("DOMContentLoaded",()=>{   
        const pop: HTMLElement = document.querySelector("#pop") as HTMLElement
        const popImg: HTMLImageElement = document.querySelector("#popImage") as HTMLImageElement
        const targets:NodeList = document.querySelectorAll(`.${targetClass}`) 
        
        if(targets.length>0){
            targets.forEach((item) => {
                item.addEventListener("click", event => {
                    const _t: HTMLElement = event.target as HTMLElement
                    const  _src:string =  _t.dataset.popsrc as string
                    var img = new Image()
                    img.src = _src        
                    img.onload = ()=>{
                        pop.classList.add('on')
                        popImg.src = _src
                    }          
                });
            })
            
            pop.addEventListener("click", () => {
                pop.classList.remove('on')
            })
        }
    })
}