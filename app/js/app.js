
// @codekit-prepend "m-data.js"

/*
  Willow Studios Inc.
  developer: Tanvir Haider 
  contact info:  contact@willow.studio
  Happy to help with any development and Animation
  --------------------------------------------------------------------------------------------
   
               
                            
                                        contact@willow.studio                                       
                                       HappyToDevelopAnything:)                                     
                                     webGL./. | .|  |- |+ ..SVG|                                    
                                    .CSS  +. .+  |  |  |:    htm|                                   
                                    :21|  |. .|  |  |  |:     747                                   
                                    :MM.  |. .|  |  |  O: .|  NM|                                   
                             .......|MM.  |. .|  |  |  |: .|  NMy.......                            
                          .|aftereffects  |. .|  |  |  |:  |  McanvasAnima||                         
                        .|CREATOR|::|::|. |. .|  |  |  |;  |  |  .||S|:GREAT.                       
                        |MN: .  || .|  0. |. .|  |  |  |#  |  |. |: .|   .dMd                       
                        NM|  0. :|  |  |  |. .|  |  |  |C  |  |  /| .|    :MM|                      
                       .MM|  |  :|  |  |  |. .|  |  |  |+  |  |  /| .|  : .MM/                      
                       .MM|  |  :|  |  |  |. .|  |  |  |+  |  |  /| .|  y..MM/                      
              ../||||||yMM/  |  :|  |  | .|. .|  O  |  |:  |  |  /| .|  | .MMh||||||+|.             
            .+646.824.6777.  |  :|  |  | ||. .|  |  |  |:  +  |  /| .|  | .yyyyhyyhdNMN|.           
           .dMm/|  |. |. .|  |  :|  |  | .|      |  |  |:     |  /| .|  |  || :+ .:  :hMN|          
           |MN. |. |. |.  |  |  :|  |  |  .      |  :  |:     |  /- .|  |  +. .| .y  /.hMd          
           dMh  |  |. |.  |  |  ..  |  |         .     .-     -  /-  |  |  +. .|  |  | +MM          
           dMh  |  |. |.  |  |   .ydmddmddh|+.          .+|hhddddddy .  |  +. .|  |  | +MM.         
           dMh  |  |. |.  O  |   .||d||d||ymMMh.      -dMMdy|||||||+    |  +. .|  |  O +MM.         
           hM|  .  |. ..  |  |      |  |    -dMN-    /MMy.              |  +. .|  |    /MN          
            .      |.     |  .      |  |     .mMm   .NMh                |  +. .|  |.    ..          
                   .      |         :  |      sMM.  :MM/                |     .|  .                 
                          |            |      |MM.  :MM/                |     .|                    
                          |            |      oMM.  :MM/                .     .|                    
                          .            .  +y/ oMM.  :MM/                                        
                                          ymy oMM.  :MM/                                            
                           -o-   /o-   /+.:s: oMM.  :MM+   .+/   .+/   .+-                          
                           :Nd  :NNd. -Nm.hNy oMM.  :MM+   .dN: .dNN/  hN/                          
                            yN+ dmoNo hN/ hNy oMM.  :MM+    :Nh +Nsmd./Nh                           
                            .mmoNo dm+Ny  hNy sMM.  :MM+.oyo.sN+md.+Nodm/                           
                             /NNd. :NNm.  hNy sMM.  :MM//MMM+.dNN/ .dNN+                            
                              .+.   .+/   -+- -o/   .++..:+/. .+/   .+/ 
                              
                              
  --------------------------------------------------------------------------------------------
*/


var MselectedHS = undefined;
var mImgList = [["./assets/images/Muno.jpg",Muno],["./assets/images/Mdos.jpg",Mdos],["./assets/images/Mtres.jpg",Mtres],["./assets/images/Mquatro.jpg",Mquatro]];
var unitWidth = 324;
var unitHeight = 576;
TweenLite.defaultEase = Linear.easeNone;
var Mcanvas = document.querySelector("#canvas-m");
var mContext = Mcanvas.getContext("2d");
var mresolution = window.devicePixelRatio || 1;
var mvw, mvh, mcx, mcy;


   
// window.addEventListener("mresize", mresize);

function tweenThis (selectedItem,imgLoc,imgData,start,end, callBackFunc) {

    var dummyObject = {
        frame: 0,
        x: -unitWidth / 2,
        y: -unitHeight / 2
    };


    var sprite = new Image();
    sprite.onload = startPlease;
    sprite.src = imgLoc;

    function startPlease() {

        var timeLine;

        if (callBackFunc != undefined){

            timeLine = new TimelineMax(
            { 
            onUpdate: update, 
            onUpdateParams:[imgData], 
            onComplete:sendBack 
            }).fromTo(dummyObject, 1, { 
            frame: start, 
            roundProps: "frame", 
            repeat: 0 
            },{ frame: end, roundProps: "frame", repeat: 0 }, 0
            );
        }
        else {
            timeLine = new TimelineMax(
            { 
            onUpdate: update, 
            onUpdateParams:[imgData]
            }).fromTo(dummyObject, 1, { 
            frame: start, 
            roundProps: "frame", 
            repeat: 0 
            },{ frame: end, roundProps: "frame", repeat: 0 }, 0
            );
        }
    }

    function update(imgSeq) {
        var frame = imgSeq[dummyObject.frame];
       // console.log(dummyObject.frame);

        var f = frame.frame;
        var s = frame.spriteSourceSize;

        var x = dummyObject.x + s.x;
        var y = dummyObject.y + s.y;

        mContext.save();
        mContext.clearRect(0, 0, mvw, mvh);
        mContext.translate(mcx, mcy);
        mContext.drawImage(sprite, f.x, f.y, f.w, f.h, x, y, f.w, f.h);
        mContext.restore();
    }

    function sendBack () {callBackFunc (selectedItem);}

} // end of TweenThis  --------------------------


function mresize() {  
    mvw = unitWidth;
    mvh = unitHeight;
        
    mcx = mvw / 2;
    mcy = mvh / 2;

    Mcanvas.width  = mvw * mresolution;
    Mcanvas.height = mvh * mresolution;

    Mcanvas.style.width  = mvw + "px";
    Mcanvas.style.height = mvh + "px"; 

    mContext.scale(mresolution, mresolution);
}

tweenThis (0,mImgList[0][0],mImgList[0][1],0,0,undefined);



function closePanel (itemNumber) {
    showHideHS ("show");
    var currentCloseBtn = document.getElementById("m-closeBtn-" + itemNumber);
    var currentDescription = document.getElementById("m-d-" + itemNumber);
    TweenMax.fromTo([currentDescription,currentCloseBtn],0.3,{alpha:1},{delay:0,autoAlpha:0});
    tweenThis (MselectedHS, mImgList[MselectedHS][0],mImgList[MselectedHS][1],mImgList[MselectedHS][1].length - 1,0,undefined);
    MselectedHS = undefined;
}


function openPanel (itemNumber) {

    showHideHS ("hide");

    var currentCloseBtn = document.getElementById("m-closeBtn-" + itemNumber);
    currentCloseBtn.style.visibility = "visible";
    TweenMax.fromTo(currentCloseBtn,0.5,{scale:0.5,alpha:0},{delay:1,alpha:1,scale:1});

    var currentDescription = document.getElementById("m-d-" + itemNumber);
    currentDescription.style.visibility = "visible";
    TweenMax.fromTo(currentDescription,0.5,{alpha:0},{delay:1,alpha:1});

    if (MselectedHS == undefined) {
        MselectedHS = itemNumber;
        tweenThis (MselectedHS, mImgList[MselectedHS][0],mImgList[MselectedHS][1],0,mImgList[MselectedHS][1].length - 1,cbfunc);
    }
    else {
        tweenThis (MselectedHS, mImgList[MselectedHS][0],mImgList[MselectedHS][1],mImgList[MselectedHS][1].length - 1,0,cbfunc);

        function cbfunc (whichOne) {
           // console.log("this is done yo " + whichOne);
            MselectedHS = itemNumber;
            tweenThis (MselectedHS, mImgList[MselectedHS][0],mImgList[MselectedHS][1],0,mImgList[MselectedHS][1].length - 1,doNothing);
        }
    }
} // end of OpenPanel

function showHideHS (whichOne) {
    if (whichOne == "show") {
        for (var i = 0; i < 4; i++) {
            var tempBtn = document.getElementById("m-hs-" + i);
            tempBtn.style.visibility = "visible";
            TweenMax.fromTo(tempBtn,0.5,{alpha:0,scale:0.5},{delay:1,alpha:1,scale:1});
        }
    }
    else {
        for (var i = 0; i < 4; i++) {
            var tempBtn = document.getElementById("m-hs-" + i);
            TweenMax.fromTo(tempBtn,0.3,{alpha:1,scale:1},{alpha:0,scale:0,onComplete:hide, onCompleteParams:[tempBtn]});
        }

        function hide (whichOne) {
            whichOne.style.visibility = "hidden";
        }
    }
}  // end of ShowHideHS

  

function doNothing () {
    //console.log("what the ...");
}

function startMobile () {
    $( document ).ready(function() {

        var promises = [];
    
        for (var i = 0; i < mImgList.length; i++) {
        (function(url, promise) {
            var img = new Image();
            img.onload = function() {promise.resolve();};
            img.src = url;
        })(mImgList[i][0], promises[i] = $.Deferred());
        }
        $.when.apply($, promises).done(function() {
        letsGetStarted ();
        });
    
        function letsGetStarted () {
            document.getElementById("m-interactive-container").style.display = "block";
            mresize();
            
            $( "#m-hs-0" ).click(function() {openPanel(0);});
            $( "#m-hs-1" ).click(function() {openPanel(1);});
            $( "#m-hs-2" ).click(function() {openPanel(2);});
            $( "#m-hs-3" ).click(function() {openPanel(3);});
        
            $( "#m-closeBtn-0" ).click(function() {closePanel (0);});
            $( "#m-closeBtn-1" ).click(function() {closePanel (1);});
            $( "#m-closeBtn-2" ).click(function() {closePanel (2);});
            $( "#m-closeBtn-3" ).click(function() {closePanel (3);});
        }
    
    });    
}

startMobile ();


