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
let playing = true;

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


    date = new Date();

    playing = true;
};

// php 타이머
const phpTimer = (time) => {
    const phpTime = new Date(time);
    const maxTime = 900000;

    const timer = _ => {
        const nowTime = new Date();
    
        if( (Date.parse(nowTime) - Date.parse(phpTime)) % maxTime === 0 ) {
            alert("서버시간으로 부터 15분이 경과하였습니다. \n게임이 리셋됩니다.");
            resetHandle();
        }
    };

    setInterval(timer, 1000);
};


// 게임이 끝났는지 안 끝났는지 판단하는 함수
const gameEnd = _ => {
    const result = answer.every( (ans, idx) => {
        return ans.toUpperCase() == word[idx];
    } )
    if(result || chance === 6) {
        playing = false;
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
const alphabetChk = () => {
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

// 해당 단어의 존재 여부를 판단하는 함수
const WordSearch = wordStr => {
    const result = wordArr.some( ele => ele === wordStr.toLowerCase() );

    if(result) {
        alphabetChk();

        chance++;
        gameEnd();
        word.splice(0, word.length);
    } else {
        alert("존재하지 않는 단어입니다.");
    }
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
        WordSearch(word.join(""));
        
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
    if(boll && chance < 6 && playing) {
        keyBorderFn(key);
    }
};

// 가상 키보드 클릭시 실행
const keyBorderClickHandle = e => {
    const key = e.target.innerText.replace(' ', '');
    const boll = keys.some( ele => key.toLowerCase() === ele );
    if(boll && chance < 6 && playing) {
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

    answer = wordArr[randomFn()].split("");
    console.log(answer);    
};

window.onload = _ => {
    init();
};
