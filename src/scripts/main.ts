// a标签新页面打开
const links = document.links;
for (let i = 0, linksLength = links.length; i < linksLength; i++) {
    const link = links[i];
    if (link.hostname != window.location.hostname) {
        link.target = "_blank";
    }
}

// 文章详情页
const allTitleSelector =
    ".article>h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]";
const allHeadSelector = "a.head";
const offset = 10
function initColor() {
    const headElement = document.querySelectorAll(allHeadSelector);
    [...document.querySelectorAll(allTitleSelector)].forEach((el, i) => {
        if (headElement[i]) {
            const top = el.getBoundingClientRect().top;
            if (top < offset) {
                // @ts-ignore
                headElement[i].style.color = "#8e32dc";
            } else {
                // @ts-ignore
                headElement[i].style.color = "";
            }
        }
    });
}
initColor();
window.addEventListener("scroll", function () {
    initColor();
});

function scrollIntoView(traget: string | number) {
  let isNum = false
  if(typeof traget == "number"){
    isNum = true
  }
  let tragetElem: HTMLDivElement | null= null;
  let tragetElemPostition: number = 0;
  if(isNum){
    tragetElemPostition = traget as number
  }else{
    tragetElem = document.querySelector(traget as string)
    tragetElemPostition = tragetElem.offsetTop
  }
  // 判断是否支持新特性
  if (
    typeof window.getComputedStyle(document.body).scrollBehavior ==
    "undefined" || isNum
  ) {
    // 当前滚动高度
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动step方法
    const step = function() {
      // 距离目标滚动距离
      let distance = tragetElemPostition - scrollTop;
      
      // 目标需要滚动的距离，也就是只走全部距离的五分之一
      scrollTop = scrollTop + distance / 5;
      if (Math.abs(distance) < 1) {
        window.scrollTo(0, tragetElemPostition);
      } else {
        window.scrollTo(0, scrollTop);
        setTimeout(step, 20);
      }
    };
    step();
  } else if(tragetElem){
    tragetElem.scrollIntoView({
      behavior: "smooth",
      inline: "nearest"
    });
  }
}
const topEl = document.getElementById("toTop")
topEl.addEventListener("click", (e)=>{
  scrollIntoView(0)
})
function init(){
  const top = document.documentElement.scrollTop;
  if(top > 250){
    topEl.style.opacity = 1
    topEl.style.pointerEvents = "auto"
  }else{
    topEl.style.opacity = 0
    topEl.style.pointerEvents = "none"
  }
}
window.addEventListener("scroll", init);