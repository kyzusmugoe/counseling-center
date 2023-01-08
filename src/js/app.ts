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