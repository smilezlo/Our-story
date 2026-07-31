// ======================================
// ЭЛЕМЕНТЫ
// ======================================
const noButtonMessage = document.getElementById("noButtonMessage");
const scene0 = document.getElementById("scene0");
const scene1 = document.getElementById("scene1");
const scene2 = document.getElementById("scene2");
const scene3 = document.getElementById("scene3");
const sceneBeforeQuestion =
    document.getElementById("sceneBeforeQuestion");
    const heart = document.querySelector(".heart");
const secretMessage = document.getElementById("secretMessage");

const beforeText =
    document.getElementById("beforeText");

const storyButton = document.getElementById("storyButton");
const beginButton = document.getElementById("beginButton");

const magicStar = document.getElementById("magicStar");
const magicLine = document.getElementById("magicLine");
const magicLetter = document.getElementById("magicLetter");

const letterText = document.getElementById("letterText");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const starSound = new Audio("sounds/star.mp3");
const typingSound = new Audio("sounds/typing.mp3");
typingSound.loop = true;
typingSound.volume = 0.25;
const bgMusic = new Audio("music/music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0;
starSound.preload = "auto";
const paper = document.querySelector(".paper");

// ======================================
// ПЕРЕКЛЮЧЕНИЕ СЦЕН
// ======================================

function showScene(scene){

    document.querySelectorAll(".scene").forEach(item=>{

        item.classList.remove("active");

    });

    scene.classList.add("active");

}

// ======================================
// КНОПКИ
// ======================================

storyButton.onclick=()=>{

    showScene(scene1);

};

beginButton.onclick=()=>{

    showScene(scene2);

};

// ======================================
// ПАДАЮЩИЕ ЗВЕЗДЫ
// ======================================

function createMeteor(){

    const meteor=document.createElement("div");

    meteor.className="shooting-star";

    meteor.style.left=Math.random()*window.innerWidth+"px";

    meteor.style.top=Math.random()*250+"px";

    document.body.appendChild(meteor);

    setTimeout(()=>{

        meteor.remove();

    },1500);

}

setInterval(createMeteor,2500);
// ======================================
// ТЕКСТ ПИСЬМА
// ======================================

const letter = `Привет, Розалия!
Наверное, это самое необычное сообщение,
которое ты когда-либо получала.

Мне захотелось сделать что-то особенное,
что-то, что сможет вызвать улыбку.

Поэтому я сделал эту маленькую историю
специально для тебя.

И надеюсь,
что она тебе понравится... ✨`;
let typingIndex = 0;
let typingFinished = false;

// ======================================
// ПЕЧАТНАЯ МАШИНКА
// ======================================

function typeLetter(){

typingSound.currentTime = 0;
typingSound.play();
    if(typingIndex >= letter.length){

        typingFinished = true;

typingSound.pause();
typingSound.currentTime = 0;

        showContinueButton();

        return;
    }

    letterText.innerHTML += letter.charAt(typingIndex);
    paper.scrollTop = paper.scrollHeight;

    typingIndex++;

    setTimeout(typeLetter,35);

}

// ======================================
// ЗВЕЗДА
// ======================================

magicStar.onclick = () => {

if (navigator.vibrate) {
    navigator.vibrate(50);
}
    starSound.currentTime = 0;
    starSound.play();
    bgMusic.play();

let volume = 0;

const fade = setInterval(() => {
    volume += 0.05;

    if (volume >= 0.35) {
        volume = 0.35;
        clearInterval(fade);
    }

    bgMusic.volume = volume;
}, 250);

    magicStar.style.pointerEvents = "none";
    magicStar.style.transform = "scale(1.8)";
    magicStar.style.opacity = "0";

    magicLine.style.height = "170px";

    setTimeout(() => {
        magicLetter.classList.add("show");
        typeLetter();
        startShootingStars();
    }, 900);

};

// ======================================
// КНОПКА "ПРОДОЛЖИТЬ"
// ======================================

function showContinueButton(){

    const btn=document.createElement("button");

    btn.id="continueButton";

    btn.textContent="Продолжить ️";

    btn.onclick=()=>{

    showBeforeQuestion();

};

    magicLetter.appendChild(btn);

}

// ======================================
// ENTER
// ======================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter" && typingFinished){

        const btn=document.getElementById("continueButton");

        if(btn){

            btn.click();

        }

    }

});

// ======================================
// ПРОПУСК ПЕЧАТИ ПО КЛИКУ
// ======================================

letterText.onclick=()=>{

    if(typingFinished) return;

    typingFinished=true;

    letterText.innerHTML=letter;
    paper.scrollTop = paper.scrollHeight;
    typingSound.pause();
typingSound.currentTime = 0;

    showContinueButton();

};
function heartbeatEffect(){

    document.body.classList.add("heartbeat");

    if(navigator.vibrate){

        navigator.vibrate([70,70,70]);

    }

    setTimeout(()=>{

        document.body.classList.remove("heartbeat");

    },900);

}
function showBeforeQuestion(){

    showScene(sceneBeforeQuestion);

    const phrases = [
        "Иногда самые важные моменты начинаются\nс одного простого шага...",
        "Я долго думал,\nкак тебя пригласить...",
        "И понял,\nчто хочу сделать это так,\nчтобы ты запомнила этот момент.",
        "Поэтому..."
    ];

    let index = 0;

    function showText(text, delay, callback){

        beforeText.classList.remove("show");

        setTimeout(()=>{

            beforeText.innerHTML = text;
            beforeText.classList.add("show");

            if(callback){
                setTimeout(callback, delay);
            }

        },500);

    }

    function next(){

        if(index < phrases.length){

            showText(phrases[index],2600,()=>{

                index++;
                next();

            });

            return;
        }

        beforeText.classList.remove("show");

        setTimeout(()=>{

            beforeText.innerHTML = `
                <div id="waitHeart"
     style="
        font-size:95px;
        cursor:pointer;
        user-select:none;
        display:inline-block;
        animation:pulseHeart 1.6s ease-in-out infinite;
        filter:drop-shadow(0 0 12px rgba(255,90,120,.6));
     ">
                     ❤️
                </div>
            `;

            beforeText.classList.add("show");

            const h=document.getElementById("waitHeart");

            h.onclick=()=>{

                if(navigator.vibrate){
                    navigator.vibrate([60,40,60]);
                }

                h.style.transform="scale(1.35)";
                h.style.transition=".3s";

                setTimeout(()=>{

                    showText(
                        "У меня есть к тебе\nодин очень важный вопрос.",
                        2600,
                        ()=>{

                            heartbeatEffect();

                            showScene(scene3);

                        }
                    );

                },300);

            };

        },500);

    }

    next();

}
// =====================================
// КНОПКА "НЕТ"
// ======================================
const noButtonMessages = [
    "😊 Кажется, правильный ответ — «Да».",
    "😄 Эта кнопка сегодня не работает.",
    "👉 Попробуй соседнюю кнопку.",
    "🙈 Не мучай кнопку, она стесняется."
];
function moveNoButton(){

    const maxX = window.innerWidth - noButton.offsetWidth - 30;
    const maxY = window.innerHeight - noButton.offsetHeight - 30;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noButton.style.position = "fixed";
    noButton.style.left = x + "px";
    noButton.style.top = y + "px";

    const randomMessage =
        noButtonMessages[Math.floor(Math.random() * noButtonMessages.length)];

    noButtonMessage.classList.remove("show");

    setTimeout(() => {
        noButtonMessage.textContent = randomMessage;
        noButtonMessage.classList.add("show");
    }, 50);

}

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", function(e){

    e.preventDefault();
    moveNoButton();

});

// ======================================
// КНОПКА "ДА"
// ======================================

yesButton.onclick = () => {
if (navigator.vibrate) {
    navigator.vibrate([80, 40, 80]);
}
    showLoveAnimation();

};

// ======================================
// СЕРДЕЧКИ
// ======================================

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "-40px";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 4000);

}

function showLoveAnimation(){

    for(let i = 0; i < 60; i++){

        setTimeout(createHeart, i * 120);

    }
    // ======================================
// ФИНАЛ
// ======================================

    setTimeout(() => {

        document.body.innerHTML = `
        <div style="
            height:100vh;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            text-align:center;
            background: radial-gradient(circle at top, #243b72 0%, #0b1028 40%, #000 100%);
            color:white;
            padding:30px;
            overflow:hidden;
            ">
            <h1 style="
    margin:0;
    text-align:center;
">
    Ура! 😊
</h1>

            <p style="
    max-width:700px;
    margin-top:15px;
    text-align:center;
    font-size:20px;
    line-height:1.8;
">
Я очень рад твоему ответу 
<br><br>
Теперь остался последний шаг, выбрать день, место нашей встречи.
<br>

Давай обсудим нашу встречу в Telegram ✨
</p>
<a href="#"
   id="telegramButton"
   class="loveButton">
    💌 Перейти в Telegram
</a>
<div id="endingScene" style="
position:fixed;
left:0;
top:0;
width:100%;
height:100%;
background:rgba(0,0,0,0);
transition:3s;
display:flex;
justify-content:center;
align-items:center;
padding:30px;
box-sizing:border-box;
opacity:0;
visibility:hidden;
transition:1s;
z-index:999999;
">

<div id="endingText" style="
color:white;
font-size:20px;
line-height:1.8;
text-align:center;
max-width:700px;
transition:0.8s;
">
</div>

</div>

        </div>

        <style>

        @keyframes pulse{

            0%{transform:scale(1);}
            50%{transform:scale(1.15);}
            100%{transform:scale(1);}

        }

        </style>
        `;
        const telegramButton = document.getElementById("telegramButton");

telegramButton.onclick = (e)=>{

    e.preventDefault();

    document.body.innerHTML = `
    <div id="finalScene" style="
        position:fixed;
        inset:0;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        background:radial-gradient(circle at top,#243b72 0%,#0b1028 40%,#000 100%);
        color:#fff;
        overflow:hidden;
        text-align:center;
        padding:30px;
    ">

        <div id="stars"></div>

        <img id="finalSticker"
     src="images/sticker2.png"
     style="
        width:150px;
        height:auto;
        margin-bottom:60px;
        display:none;
        transition:.5s;
">

        <div id="text" style="
            max-width:700px;
            font-size:30px;
            line-height:1.6;
            opacity:0;
            transition:1.6s;
        "></div>

    </div>
    `;

    const text=document.getElementById("text");
    const scene=document.getElementById("finalScene");
    const sticker = document.getElementById("finalSticker");
let showTimer;
    function show(message){
    text.style.opacity = "0";

    setTimeout(() => {
        text.innerHTML = message;
        text.style.opacity = "1";
    }, 300);
}
    show("Теперь хочется...<br>чтобы наша история продолжилась уже не на экране телефона...<br>прежде, чем ты перейдешь в мессенджер, хочу сказать тебе...");

setTimeout(() => {

    show("Спасибо, что прошла со мной до конца этой маленькой истории.");

}, 7000);

setTimeout(() => {

    show("Осталось самое главное — увидеться с тобой вживую...");

}, 12000);

setTimeout(() => {

    scene.style.transition = "3s";
    scene.style.background = "#000";

}, 16000);

setTimeout(() => {

    text.innerHTML = "До встречи... ✨";
    text.style.opacity = "1";
    sticker.style.display = "block";

}, 17000);

setTimeout(() => {

    show("Конец истории?");

}, 25000);

setTimeout(() => {

    window.location.href = "https://t.me/m_akhm";

}, 28000);

};

    }, 1000);

}

// =======================
// Падающие звезды
// =======================

let shootingStarsStarted = false;

function createShootingStar() {

    const star = document.createElement("div");
    star.className = "shooting-star";

    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * (window.innerHeight * 0.35) + "px";

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 1300);

    // Следующая звезда через 15–25 секунд
    setTimeout(createShootingStar, 15000 + Math.random() * 10000);
}

function startShootingStars() {
    if (shootingStarsStarted) return;

    shootingStarsStarted = true;

    // первая звезда через 5 секунд после активации магии
    setTimeout(createShootingStar, 5000);
}
window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.remove();

        },600);

    },1200);

});
let secretOpened = false;

heart.addEventListener("click",()=>{

    if(secretOpened) return;

    secretOpened = true;

    heart.style.animation = "none";

    heart.style.transform = "scale(1.3)";

    setTimeout(()=>{

        heart.style.transform = "scale(1)";

    },300);

    secretMessage.classList.add("show");

});
// ======================================
// КОНЕЦ ФАЙЛА
// ======================================
