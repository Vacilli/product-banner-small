//GLOBAL VARS
var adWidth = 300,
    adHeight = 250,
    d = 4,
    t = .5,
    easeInOut = Power1.easeInOut,
    easeIn = Power1.easeIn,
    easeOut = Power1.easeOut,
    easeBounceFast = Back.easeInOut.config(1.7),
    easeBounceSlow = Back.easeInOut.config(0.1);


    var tl_product = new TimelineMax(),
    tl_mainAnimation = new TimelineMax({paused:true}),
    tl_endFrame = new TimelineMax({paused:true}),
    tl_switchFinalAsset = new TimelineMax();

    var newlabelPath = [-100, -150, -5, 90], 
    productPath = [0, 185, 8, -40], //x1,y2,x1,y2
    productRotation = [20, -14],
    productScale = [1, 0.6], 
    samplesPath = [-50, -10, -10, 0], 
    spatulaPath = [0,40,0,-50], 
    pattyPath = [10, 150];
    
var counter = 0;//2debug


//ANIMATIONS CALLS
function init() {
    var f1_call = setTimeout(initFrame01, 500);
  
    function initFrame01() {
        counter++; //2debug
        console.log(counter);//2debug
        clearTimeout(f1_call);
        tl_mainAnimation.play();
        tl_product.play();
    }

  
    function initFrame04() {
        clearTimeout(f4_call);
        tl_mainAnimation.play();
        tl_endFrame.play();
    }
    
    var patties = document.getElementsByClassName('pattyLoop');
    for(var i = 0; i < patties.length; i++)
    {
       patties[i].style.transform = "rotate("+randomNumber(1,360)+"deg)";
        
    } 


}


//TIMELINES //DONT CHANGES NEEDED
//product
tl_product.addLabel("INIT_PRODUCT", "=+"+t*3)
    .to("#f1_text", t/1.5, {opacity:1, ease:easeOut})
    .to("#spatulaLoop", t*3, {x:spatulaPath[0], y:spatulaPath[1], ease:easeBounceFast}, "=+"+t,"INIT_PRODUCT")
    .staggerTo(".pattyLoop", t*6, {x:pattyPath[0], y:pattyPath[1], ease:easeBounceSlow}, d/4,"INIT_PRODUCT")
    .from("#samples", t, {x:samplesPath[0], y:samplesPath[1], scale:0,  ease:easeOut},"INIT_PRODUCT")
    .to("#spatulaLoop", t, {y:-adHeight/2, ease:easeBounceFast})


//product
tl_mainAnimation.addLabel("INIT_TEXT")
    .to([".banner", "#newLabel", "#spatulaLoop", "#samples", "#bagYellow", "#colorShade" ], t/2, {opacity:1})
    .to("#f1_text", t/1.5, {opacity:1, ease:easeOut}, "INIT_TEXT")
    
    .addLabel("INIT_TEXT2", "=+"+t*3)
    .to("#f1_text", t/1.5, {opacity:0, ease:easeOut},"INIT_TEXT2")   
    .to("#f2_text", t/1.5, {opacity:1, ease:easeIn})
    
    .addLabel("INIT_TEXT3", "=+"+t*3)
    .to("#f2_text", t/1.5, {opacity:0, ease:easeOut},"INIT_TEXT3")
    .to("#f3_text", t/1.5, {opacity:1, ease:easeIn})
    
    .addLabel("INIT_TEXT4", "=+"+t*3)
    .to(["#f3_text","#newLabel"], t/1.5, {opacity:0, ease:easeOut},"INIT_TEXT4")
   
    
    .addLabel("END-FRAME")
    .set(".pattyLoop", {scale:0}, "END-FRAME")
    .to("#colorShade", t, {opacity:0}, "END-FRAME")
    .to("#samples", t, {x:samplesPath[2], y:samplesPath[3], scale:0,  ease:easeOut}, "END-FRAME")
    .to("#bagYellow", t, {x:productPath[2], y:productPath[3],  rotation:productRotation[1], scale:productScale[1], ease:easeOut, onComplete: switchFinalAsset}, "END-FRAME")
    .to("#logo", t, {opacity:1, ease:easeOut})

    .staggerFrom(".smallBag", t, {y:"=-10", ease:easeOut}, d/20, "END-FRAME")
    .staggerTo(".smallBag", t/2, {opacity:1, ease:easeOut}, d/10, "END-FRAME")
    .to("#f4_text", t, {opacity:1, ease:easeOut},"=-"+t/2)
    .to("#newLabel", t, {opacity: 1, ease:easeOut},"=-"+t/2)
    .to("#cta", t/2, {opacity:1, ease:easeOut});   
  

//MISC METHODS
function switchFinalAsset() {
        tl_switchFinalAsset.addLabel("INIT_SWITCH")
        .to("#bagYellow", t, {opacity:0},"INIT_SWITCH")
        .to("#bagYellow_small", t/2, {opacity:1},"INIT_SWITCH")
                console.log("counte");//2debug

 }

function randomNumber(min, max){
	return Math.floor(Math.random() * (1 + max - min) + min);
}



//CLICKTAG
document.getElementById('clickTag').addEventListener("click", function(){
    window.open(window.clickTag);
});

//CLICKTAG
document.getElementById("clickTag").addEventListener("click", function(){
  Enabler.exit('Background Exit');
});


//INIT
function preLoad() {
    if (Enabler.isInitialized()) {
        init();
        console.log("done!");
    } else {
        Enabler.addEventListener(
            studio.events.StudioEvent.INIT,
            init
        );
        console.log("loading...");
    }
}


preLoad();
