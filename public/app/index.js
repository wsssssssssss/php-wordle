const wordStorage = JSON.parse(localStorage.getItem("word")) || {};
const setItem = () => { localStorage.setItem("word", JSON.stringify(wordStorage)) };

const keyBorderBtn = document.querySelectorAll("#app .keyborder button");
const resetBtn = document.querySelector("#app .popup .reset");
const shareBtn = document.querySelector("#app .popup .share");
const words = document.querySelector("#app .words");
const wordForm = document.querySelector("#app .wordForm");
const popup = document.querySelector("#app .popup");
const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'enter', 'backspace'];

const totalTile = [];
const word = [];
let answer = [];
let chance = 0;
let phpSetTimer = null;
let playing = true;

let phpDate =  null;
let phpNowDate =  null;

// 영어 단어담는 배열
let wordArr = [];

// 랜덤한 수 리턴 해주는 함수
const randomFn = _ => {
    return Math.floor(Math.random()*wordArr.length) + 1;
};

// DB에 현재 전달 받은 시간을 기록하는 함수
const phpDBInsert = (date) => {
    clearInterval(phpSetTimer);
    const Month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const Day = date.getDate() + 1 < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

    const Hours = date.getHours() + 1 < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    const Minutes = date.getMinutes() + 1 < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    const Seconds = date.getSeconds() + 1 < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;
    
    const dateStr = `${date.getFullYear()}-${Month}-${Day} ${Hours}:${Minutes}:${Seconds}`;
    
    wordForm.date.value = dateStr;
    wordForm.word.value = answer.join("");
    wordForm.action = "/dateInsert";
    wordForm.submit();
};




const phpSetTime = (sDate) => {
    phpDate = new Date(sDate);
    phpNowDate = new Date();
};

// 서버에서 시간을 받아와 15분이 지나면 게임을 리셋하는 함수
const phpTimer = (sDate) => {
    const maxMin = 900000; 
    phpSetTimer = setInterval(() => {
        const date = Date.parse(new Date(sDate));
        const nowDate = Date.parse(new Date());

        const lastTime = (date+900000) - nowDate;
        const SecTime = (900000-lastTime)/1000;

        console.log(Math.floor(SecTime/60)+":"+SecTime%60);
        if(date+maxMin < nowDate) {
            alert("15분이 경과하여 답이 갱신됩니다.");
            phpDBInsert(new Date());
        }
    }, 1000);
};

// 클립보드에 게임결과 복사해주는 함수
const shareHandle = _ => {
    const text = `
${document.querySelector("#app .popup p").innerText}
PlayTime ${document.querySelector("#app .popup .playTime .min").innerText}:${document.querySelector("#app .popup .playTime .sec").innerText}
${document.querySelector("#app .popup .tiles").innerText
    }`;

    navigator.clipboard.writeText(text);
};

// wordle의 타일들과 키보드의 style을 초기화 해주는 함수
const domReset = () => {
    [...document.querySelectorAll("#app .words .letter")].forEach( ele => {
        ele.removeAttribute("style");
        ele.children[0].removeAttribute("style");
        ele.children[0].innerText = '';
    } );
    keyBorderBtn.forEach( ele => ele.removeAttribute("style"));
};

// 게임 리셋 해주는 함수
const resetHandle = () => {
    phpDBInsert(new Date());
    domReset();
    popup.style.display = "none";
    word.splice(0, word.length);
    
    answer = wordArr[randomFn()].split("");
    wordStorage.answer = answer.join("");
    wordStorage.list = [];
    wordStorage.result = false;
    setItem();
    
    chance = 0;
    console.log(wordStorage);
};

const gameResultPop = () => {
    clearInterval(phpSetTimer);
    popup.style.display = "flex";

    const lastTime = (Date.parse(phpDate)+900000) - Date.parse(phpNowDate);
    const SecTime = (900000-lastTime)/1000;

    document.querySelector("#app .popup .playTime .min").innerText = Math.floor(SecTime/60);
    document.querySelector("#app .popup .playTime .sec").innerText = SecTime%60;

    document.querySelector("#app .popup .chance").innerText = chance;
    document.querySelector("#app .popup .tiles").innerHTML = `
    ${wordStorage.list.map( arr => {
        const line = arr.map( ele => {
            if(ele.color === "#787c7e") {
                return '⬛';
            } else if(ele.color === "#c9b458") {
                return '🟨';
            } else {
                return '🟩';
            }
        } ).join("")
        return `<div>${line}</div>`;
    } ).join("")}
    `;
};

// 게임이 끝났는지 안 끝났는지 판단하는 함수
const gameEnd = _ => {
    const result = answer.every( (ans, idx) => {
        return ans.toUpperCase() == word[idx];
    } )
    
    if(result || chance === 6) {
        wordStorage.result = true;
        setItem();
        gameResultPop();
    }
};

// 입력한 단어가 정답인지 아닌지 체크해주는 함수
const alphabetChk = () => {
    const resultArr = word.map( (wor, idx) => {
        const result = answer.some( ans => {
            return ans.toUpperCase() === wor;
        } )

        if(result) {
            if(wor === answer[idx].toUpperCase()) {
                return {word: wor, color: "#6aaa64"};
            } else {
                return {word: wor, color: "#c9b458"};
            }
        } else {
            return {word: wor, color: "#787c7e"};
        }
    } );

    wordStorage.list.push(resultArr);
    setItem();

    domReset();
    render();
};

// 해당 단어의 존재 여부를 판단하는 함수
const WordSearch = () => {
    alphabetChk();

    gameEnd();
    word.splice(0, word.length);
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
        } else {

            fetch(`/wordCheck?word=${word.join("")}`, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then( data => {
                console.log(data);
                if(data.code === '200'){
                    WordSearch();
                } else {
                    alert(`${data.text}`);
                }
            } );

        }
    } else {
        if(word.length < 5) {
            word.push(key);
            wordChange();
        };

    };
};

const render = () => {
    console.log(wordStorage);
    if(wordStorage.result) {
        gameResultPop();
    }
    
    chance = 0;
    wordStorage.list.forEach( arr => {
        arr.forEach( (ele, idx) => {
            const letter = words.children[chance].children[idx];
            letter.style.background = ele.color;
            letter.children[0].innerText = ele.word;
            letter.children[0].style.color = "#fff";

            keyBorderBtn.forEach( key => {
                if(key.innerText === ele.word) {
                    key.style.background = ele.color;
                    key.style.color = "#fff";
                }
            } )
        } )

        chance++;
    } );

};

// 키보드 누를때 실행
const keyDownHandle = e => {
    const key = e.key.toUpperCase();
    const boll = keys.some( ele => key.toLowerCase() === ele );
    if(boll && chance < 6 && !wordStorage.result) {
        keyBorderFn(key);
    }
};

// 가상 키보드 클릭시 실행
const keyBorderClickHandle = e => {
    const key = e.target.innerText.replace(' ', '');
    const boll = keys.some( ele => key.toLowerCase() === ele );
    if(boll && chance < 6 && !wordStorage.result) {
        keyBorderFn(key);
    }
};

// 웹 페이지 로드시 실행
const init = async _ => {
    keyBorderBtn.forEach( ele => ele.addEventListener('click', keyBorderClickHandle) );
    window.addEventListener('keydown', keyDownHandle);
    resetBtn.addEventListener('click', resetHandle);
    shareBtn.addEventListener('click', shareHandle);
    
    wordArr = await fetch("app/words.json").then(data => {
        return data.json();
    });

    if(Object.keys(wordStorage).length === 0) {
        answer = wordArr[randomFn()].split("");
        wordStorage.answer = answer.join("");
        wordStorage.list = [];
        wordStorage.result = false;
    } else {
        answer = wordStorage.answer.split("");
    }
    setItem();
    render();

};

window.onload = _ => {
    init();
};
