const keyBorderBtn = document.querySelectorAll("#app .keyborder button");
const resetBtn = document.querySelector("#app .popup .reset");
const shareBtn = document.querySelector("#app .popup .share");
const words = document.querySelector("#app .words");
const popup = document.querySelector("#app .popup");

const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'enter', 'backspace'];

let date = new Date();
const maxTime = 900000;  // 15분
const time = {
    min: 0,
    sec: 0
};

const totalTile = [];
const word = [];
let answer = [];
let chance = 0;
let setTimer = null;
let playing = false;

// 영어 단어담는 배열
let wordArr = [];

// 랜덤한 수 리턴 해주는 함수
const randomFn = _ => {
    return Math.floor(Math.random()*wordArr.length) + 1;
};

// 클립보드에 게임결과 복사해주는 함수
const shareHandle = _ => {
    const text = `
${document.querySelector("#app .popup p").innerText}
PlayTime ${time.min}:${time.sec}
${document.querySelector("#app .popup .tiles").innerText
    }`;

    navigator.clipboard.writeText(text);
};

// 게임 리셋 해주는 함수
const resetHandle = _ => {
    [...document.querySelectorAll("#app .words .letter")].forEach( ele => {
        ele.removeAttribute("style");
        ele.children[0].removeAttribute("style");
        ele.children[0].innerText = '';
    } );
    keyBorderBtn.forEach( ele => ele.removeAttribute("style"));
    popup.style.display = "none";
    word.splice(0, word.length);
    totalTile.splice(0, totalTile.length);
    chance = 0;
    answer = wordArr[randomFn()].split("");
    console.log(answer);

    setTimer = setInterval(timer, 1000);
    time.min = 0;
    time.sec = 0;
    document.querySelector("#app .time .min").innerText = time.min;
    document.querySelector("#app .time .sec").innerText = time.sec;

    date = new Date();
};

// 타이머
const timer = _ => {
    const nowDate = new Date();

    if(time.sec >= 60) {
        time.sec = 0;
        time.min++;
    }
    time.sec++;

    document.querySelector("#app .time .min").innerText = time.min;
    document.querySelector("#app .time .sec").innerText = time.sec;

    if(Date.parse(nowDate) === Date.parse(date) + maxTime){
        alert("답 갱신되어 게임이 리셋됩니다.");
        clearInterval(setTimer);
        resetHandle();
    }
};

// 게임이 끝났는지 안 끝났는지 판단하는 함수
const gameEnd = _ => {
    const result = answer.every( (ans, idx) => {
        return ans.toUpperCase() == word[idx];
    } )
    if(result || chance === 6) {
        playing = true;
        clearInterval(setTimer);
        popup.style.display = "flex";
        document.querySelector("#app .popup .chance").innerText = chance;
        document.querySelector("#app .popup .tiles").innerHTML = `
        ${totalTile.map( arr => {
            const line = arr.map( ele => {
                if(ele === "#787c7e") {
                    return '⬛';
                } else if(ele === "#c9b458") {
                    return '🟨';
                } else {
                    return '🟩';
                }
            } ).join("")
            return `<div>${line}</div>`;
        } ).join("")}
        `;
    }
};

// 입력한 단어가 정답인지 아닌지 체크해주는 함수
const alphabetChk = _ => {
    const color = word.map( (wor, idx) => {
        const result = answer.some( ans => {
            return ans.toUpperCase() === wor;
        } )

        if(result) {
            if(wor === answer[idx].toUpperCase()) {
                return "#6aaa64";
            } else {
                return "#c9b458";
            }
        } else {
            return "#787c7e";
        }
    } );

    totalTile.push(color);

    [...words.children[chance].children].forEach( (ele, idx) => {
        ele.style.background = color[idx];
        ele.children[0].style.color = "#fff";
    } )

    keyBorderBtn.forEach( ele => {
        const key = ele.innerText;
        word.forEach( (alp, idx) => {
            if(key === alp){
                ele.style.background = color[idx];
                ele.style.color = "#fff";
            }
        } );
    } );
};

// api 호출해서 해당 단어가 있는지 없는지 판별해주는 함수
const apiSearch = _ => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.join("")}`)
    .then( data => {
        if(data.status === 404) {
            alert("존재하지 않는 단어입니다.");
        };
    } )
};

// 입력한 영어단어를 화면에 띄어주는 함수
const wordChange = _ => {
    [...words.children[chance].children].forEach( ele => ele.children[0].innerText = '' );

    word.forEach( (key, idx) => {
        words.children[chance].children[idx].children[0].innerText = key;
    } );
};

// 키보드에서 값을 입력받아 그 값에 따라 적절한 함수를 호출해주는 함수
const keyBorderFn = key => {
    if(key === "BACKSPACE") {
        word.pop();
        wordChange();
    } else if (key === "ENTER") {
        if(word.length < 5) {
            alert('5글자 단어만 제출할 수 있습니다.');
            return false;
        };
        apiSearch();
        alphabetChk();
        
        chance++;
        gameEnd();
        word.splice(0, word.length);
    } else {
        if(word.length < 5) {
            word.push(key);
            wordChange();
        };

    };
};

// 키보드 누를때 실행
const keyDownHandle = e => {
    const key = e.key.toUpperCase();
    const boll = keys.some( ele => key.toLowerCase() === ele );
    if(boll && chance < 6 && !playing) {
        keyBorderFn(key);
    }
};

// 가상 키보드 클릭시 실행
const keyBorderClickHandle = e => {
    const key = e.target.innerText.replace(' ', '');
    const boll = keys.some( ele => key.toLowerCase() === ele );
    if(boll && chance < 6 && !playing) {
        keyBorderFn(key);
    }
};

// 웹 페이지 로드시 실행
const init = async _ => {
    keyBorderBtn.forEach( ele => ele.addEventListener('click', keyBorderClickHandle) );
    window.addEventListener('keydown', keyDownHandle);
    resetBtn.addEventListener('click', resetHandle);
    shareBtn.addEventListener('click', shareHandle);
    setTimer = setInterval(timer, 1000);
    
    wordArr = await fetch("app/words.json").then(data => {
        return data.json();
    });

    answer = wordArr[randomFn()].split("");
    console.log(answer);    
};

window.onload = _ => {
    init();
};
