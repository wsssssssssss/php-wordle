const keyBorderBtn = document.querySelectorAll("#app .keyborder button");
const words = document.querySelector("#app .words");

const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'enter', 'backspace'];
const word = [];
let answer = [];
let chance = 0;

// 영어 단어들(정답들)
const wordArr = ['basic', 'beach', 'begin', 'below', 'bench', 'black', 'blind', 'blood', 'brain', 'bread', 'break', 'bring', 'brown', 'build',
'carry', 'catch', 'chair', 'cheap', 'check', 'child', 'chose' , 'class', 'clean', 'clear', 'clock', 'close', 'count', 'cover',
'cream', 'crime', 'cross', 'crowd', 'dance', 'dream', 'dress' , 'drink', 'drive', 'early', 'earth', 'empty', 'enjoy', 'enter',
'error', 'event', 'every', 'exist', 'false', 'field', 'fight' , 'first', 'floor', 'focus', 'force', 'frame', 'fresh', 'front',
'fruit', 'funny', 'glass', 'grade', 'great', 'green', 'group' , 'guess', 'guest', 'happy', 'heart', 'heavy', 'horse', 'house',
'human', 'image', 'large', 'later', 'laugh', 'learn', 'leave' , 'level', 'light', 'local', 'lucky', 'lunch', 'magic', 'major',
'march', 'match', 'maybe', 'metal', 'money', 'month', 'mouse', 'mouth', 'movie', 'music', 'never', 'night', 'noise', 'young',
'ocean', 'often', 'order', 'other', 'paper', 'party', 'peace' , 'phone', 'photo', 'place', 'plane', 'plant', 'power', 'press',
'price', 'pride', 'print', 'prize', 'proud', 'quick', 'quiet' , 'reach', 'ready', 'right', 'river', 'rough', 'round', 'scene',
'score', 'sense', 'serve', 'shape', 'share', 'sharp', 'shelf' , 'shirt', 'shock', 'short', 'since', 'skill', 'sleep', 'small',
'smart', 'smile', 'smoke', 'sorry', 'sound', 'space', 'speak' , 'speed', 'spend', 'sport', 'stage', 'stand', 'start', 'steel',
'stick', 'still', 'stone', 'store', 'storm', 'story', 'study' , 'style', 'sugar', 'super', 'sweet', 'table', 'taste', 'teach',
'thank', 'theme', 'there', 'thick', 'thing', 'think', 'third' , 'throw', 'tight', 'tired', 'title', 'today', 'total', 'touch',
'tough', 'tower', 'train', 'treat', 'trust', 'twice', 'under' , 'until', 'upset', 'usual', 'visit', 'voice', 'waste', 'watch',
'water', 'wheel', 'while', 'white', 'whole', 'woman' , 'world', 'worry', 'write', 'wrong'];


const randomFn = _ => {
    return Math.floor(Math.random()*wordArr.length) + 1;
};

const reset = _ => {
    [...document.querySelectorAll("#app .words .letter p")].forEach( ele => ele.innerText = '' );
    word.splice(0, word.length);
    chance = 0;
};

const gameEnd = _ => {
    if(word === answer) {
        console.log('game-end');
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
        gameEnd();

        chance++;
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
const init = _ => {
    keyBorderBtn.forEach( ele => ele.addEventListener('click', keyBorderClickHandle) );
    window.addEventListener('keydown', keyDownHandle);

    answer = wordArr[randomFn()].split("");
    
    console.log(answer);
};

window.onload = _ => {
    init();
};
