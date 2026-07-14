// =====================================
// PROJECT AURORA
// SCRIPT.JS FULL
// =====================================


// =====================
// GALAXY BACKGROUND
// =====================

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");


function resize(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize", resize);



let stars = [];


for(let i = 0; i < 250; i++){

    stars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        size:Math.random()*2,

        speed:Math.random()*0.5+0.1

    });

}



function drawStars(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    stars.forEach(star=>{


        ctx.fillStyle="white";


        ctx.beginPath();


        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI*2
        );


        ctx.fill();


        star.y += star.speed;



        if(star.y > canvas.height){

            star.y=0;

        }


    });


    requestAnimationFrame(drawStars);

}


drawStars();





// =====================
// SOUND SYSTEM
// =====================


const audio =
new AudioContext();



function beep(freq,duration){


    const osc =
    audio.createOscillator();


    const gain =
    audio.createGain();


    osc.frequency.value=freq;


    gain.gain.value=.08;


    osc.connect(gain);

    gain.connect(
        audio.destination
    );


    osc.start();


    osc.stop(
        audio.currentTime + duration
    );


}





// =====================
// SCENE CONTROL
// =====================


function scene(id){


    document
    .querySelectorAll(".scene")
    .forEach(item=>{

        item.classList.remove(
            "active"
        );

    });



    document
    .getElementById(id)
    .classList.add(
        "active"
    );

}





// =====================
// LOADING
// =====================


let load = 0;


const bar =
document.getElementById("progress");


const loadText =
document.getElementById("loadingText");



let loading =
setInterval(()=>{


    load++;


    bar.style.width =
    load+"%";


    if(load < 40){

        loadText.innerHTML =
        "Loading Universe...";

    }

    else if(load < 80){

        loadText.innerHTML =
        "Preparing Surprise...";

    }

    else{

        loadText.innerHTML =
        "Ready...";

    }



    if(load % 10 === 0){

        beep(600,.1);

    }




    if(load >=100){


        clearInterval(loading);


        beep(900,.3);



        setTimeout(()=>{


            startMeteor();


        },1000);


    }


},40);







// =====================
// METEOR
// =====================


function startMeteor(){


    scene(
        "meteorScene"
    );


    beep(500,.2);



    setTimeout(()=>{


        startCake();


    },4000);



}







// =====================
// CAKE + MESSAGE
// =====================


function startCake(){


    scene(
        "cakeScene"
    );


    const text =

    "Happy Birthday Zahra 🎂\n\n" +

    "Semoga hari ini menjadi hari yang spesial.\n" +

    "Nikmati setiap momen indah hari ini ✨";



    typeWriter(
        text
    );



}




function typeWriter(text){


    const box =
    document.getElementById(
        "message"
    );


    box.innerHTML="";


    let i=0;


    let typing =
    setInterval(()=>{


        box.innerHTML +=
        text[i]
        === "\n"
        ? "<br>"
        : text[i];



        i++;


        if(i >= text.length){

            clearInterval(
                typing
            );

        }


    },50);


}







// =====================
// BLOW CANDLE
// =====================


document
.getElementById("blow")
.addEventListener(
"click",
()=>{


    beep(300,.5);



    document
    .getElementById("flame")
    .innerHTML="💨";



    setTimeout(()=>{


        scene(
            "ending"
        );


        beep(1000,.5);



    },1500);



});
