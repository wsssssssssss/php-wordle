<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wordle</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <div id="app">
        <header class="flex">
            <div class="menu icon">
                <img src="./src/img/hamburger.png" alt="hamburger">
            </div>
            <div class="question icon">
                <img src="./src/img/question.png" alt="question">
            </div>
            <div class="title">Wordle</div>
            <div class="graph icon">
                <img src="./src/img/graph.png" alt="graph">
            </div>
            <div class="setting icon">
                <img src="./src/img/setting.png" alt="setting">
            </div>
        </header>
        <main>
            <section class="flex">
                <form method="post" class="wordForm">
                    <input type="hidden" class="wordIpt" name="word">
                    <input type="hidden" class="wordleDate" name="date">
                    <div class="words flex">
                        <div class="first word flex">
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                        </div>
                        <div class="second word flex">
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                        </div>
                        <div class="third word flex">
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                        </div>
                        <div class="fourth word flex">
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                        </div>
                        <div class="fifth word flex">
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                        </div>
                        <div class="sixth word flex">
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                            <div class="letter flex"><p></p></div>
                        </div>
                    </div>
    
                    <div class="keyborder">
                        <div class="top flex">
                            <button type="button">Q</button>
                            <button type="button">W</button>
                            <button type="button">E</button>
                            <button type="button">R</button>
                            <button type="button">T</button>
                            <button type="button">Y</button>
                            <button type="button">U</button>
                            <button type="button">I</button>
                            <button type="button">O</button>
                            <button type="button">P</button>
                        </div>
    
                        <div class="mid flex">
                            <button type="button">A</button>
                            <button type="button">S</button>
                            <button type="button">D</button>
                            <button type="button">F</button>
                            <button type="button">G</button>
                            <button type="button">H</button>
                            <button type="button">J</button>
                            <button type="button">K</button>
                            <button type="button">L</button>
                        </div>
    
                        <div class="bottom flex">
                            <button type="button">ENTER</button>
                            <button type="button">Z</button>
                            <button type="button">X</button>
                            <button type="button">C</button>
                            <button type="button">V</button>
                            <button type="button">B</button>
                            <button type="button">N</button>
                            <button type="button">M</button>
                            <button type="button">BACK SPACE</button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
        <footer></footer>
        <div class="popup none">
            <div class="share_popup flex">
                <div class="text">
                    <p>Wordle <?=date("Y-m-d") ?>, <span class="chance">5</span>/6</p>
                    <p class="playTime">Playtime <span class="min"></span>:<span class="sec"></span></p>
                </div>

                <div class="tiles"></div>
                <div class="btns">
                    <button class="share">share</button>
                    <button class="reset">reset</button>
                </div>
            </div>
        </div>
    </div>
    <script src="./app/index.js"></script>
</body>
</html>

