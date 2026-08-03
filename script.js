// =========================
// ЗВЁЗДЫ
// =========================

const stars = document.getElementById("stars");

for (let i = 0; i < 180; i++) {

    const star = document.createElement("div");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 2 + "s";

    stars.appendChild(star);

}

// =========================
// ПАДАЮЩИЕ ЗВЁЗДЫ
// =========================

function createMeteor(){

    const meteor=document.createElement("div");

    meteor.className="shooting-star";

    meteor.style.left=(70+Math.random()*30)+"%";
    meteor.style.top=Math.random()*25+"%";

    document.body.appendChild(meteor);

    setTimeout(()=>{

        meteor.remove();

    },1500);

}

setInterval(createMeteor,12000);

// =========================
// СЦЕНЫ
// =========================

const scene1=document.getElementById("scene1");
const scene2=document.getElementById("scene2");

document
.getElementById("startButton")
.onclick=()=>{

    scene1.classList.remove("active");

    setTimeout(()=>{

        scene2.classList.add("active");

        showEnding();

    },700);

};

// =========================
// ТЕКСТ
// =========================

const ending=`Эта история закончилась совсем не так,
как хотелось её автору.

Но он всё равно рад,
что однажды решился задать этот вопрос.

Спасибо,
что честно ответила.

Береги себя. ❤️`;

const finalText=document.getElementById("finalText");

// =========================
// ПЕЧАТНАЯ МАШИНКА
// =========================

function showEnding(){

    let i=0;

    finalText.innerHTML="";

    const timer=setInterval(()=>{

        finalText.innerHTML+=ending.charAt(i);

        i++;

        if(i>=ending.length){

            clearInterval(timer);

        }

    },40);

}