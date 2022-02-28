const keyBorderBtn = document.querySelectorAll("#app .keyborder button");
const resetBtn = document.querySelector("#app .popup .reset");
const words = document.querySelector("#app .words");
const popup = document.querySelector("#app .popup");

const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'enter', 'backspace'];
const totalTile = [];
const word = [];
let answer = [];
let chance = 0;

// 영어 단어들
let wordArr = [];

const randomFn = _ => {
    return Math.floor(Math.random()*wordArr.length) + 1;
};

const reset = _ => {
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
};

const gameEnd = _ => {
    const result = answer.every( (ans, idx) => {
        return ans.toUpperCase() == word[idx];
    } )
    if(result || chance === 6) {
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
    if(boll && chance < 6) {
        keyBorderFn(key);
    }
};

// 가상 키보드 클릭시 실행
const keyBorderClickHandle = e => {
    const key = e.target.innerText.replace(' ', '');
    const boll = keys.some( ele => key.toLowerCase() === ele );
    if(boll && chance < 6) {
        keyBorderFn(key);
    }
};

// 웹 페이지 로드시 실행
const init = async _ => {
    keyBorderBtn.forEach( ele => ele.addEventListener('click', keyBorderClickHandle) );
    window.addEventListener('keydown', keyDownHandle);
    resetBtn.addEventListener('click', reset);

    wordArr = await fetch("app/words.json").then(data => {
        return data.json();
    });

    answer = wordArr[randomFn()].split("");
    console.log(answer);
};

window.onload = _ => {
    init();
};
