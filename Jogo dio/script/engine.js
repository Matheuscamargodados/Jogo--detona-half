const state = {
    view:{ 
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),

    },
    values:{
        gameVelocity:1000,
        hitpPosition: 0,
        result: 0,
        curretTime: 60,
    },

    actions:{
        timeId: setInterval(randomSquare,1000),  
        countDowntimerId: setInterval(countDown,1000),
    }
};
function countDown(){
    state.values.curretTime--;
    state.view.timeleft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDowntimerId);
        clearInterval(state.actions.timeId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playsound() {
    let audio = new Audio("./audios/hit.m4a");
    audio.volume= 0.2;
    audio.play();
}

function randomSquare (){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitpPosition = randomSquare.id;
}


function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitpPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitpPosition = null;
                playsound();        
            }
        })
    });

}
function initialize() {
   
    addListenerHitBox();
}


initialize();
