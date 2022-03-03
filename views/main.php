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
                <img src="./src/img/hamburger.png" alt="">
            </div>
            <div class="question icon">
                <img src="./src/img/question.png" alt="">
            </div>
            <div class="title">Wordle</div>
            <div class="graph icon">
                <img src="./src/img/graph.png" alt="">
            </div>
            <div class="setting icon">
                <img src="./src/img/setting.png" alt="">
            </div>
        </header>
        <main>
            <section class="flex">
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
                        <button>Q</button>
                        <button>W</button>
                        <button>E</button>
                        <button>R</button>
                        <button>T</button>
                        <button>Y</button>
                        <button>U</button>
                        <button>I</button>
                        <button>O</button>
                        <button>P</button>
                    </div>

                    <div class="mid flex">
                        <button>A</button>
                        <button>S</button>
                        <button>D</button>
                        <button>F</button>
                        <button>G</button>
                        <button>H</button>
                        <button>J</button>
                        <button>K</button>
                        <button>L</button>
                    </div>

                    <div class="bottom flex">
                        <button>ENTER</button>
                        <button>Z</button>
                        <button>X</button>
                        <button>C</button>
                        <button>V</button>
                        <button>B</button>
                        <button>N</button>
                        <button>M</button>
                        <button>BACK SPACE</button>
                    </div>
                </div>
            </section>
        </main>
        <footer></footer>
        <div class="popup none">
            <div class="share_popup flex">
                <p>Wordle <?=date("Y-m-d") ?>, <span class="chance">5</span>/6</p>

                <div class="tiles"></div>
                <div class="btns">
                    <button class="share">share</button>
                    <button class="reset">reset</button>
                </div>

                
            </div>
        </div>
    </div>
    <script src="./app/index.js"></script>
    <?php
        $result = src\App\DB::fetchAll("SELECT * FROM wordle_tbl")[0];
        echo "<script>";
        echo "phpDate('{$result->wordle_date}');";
        echo "</script>";
    ?>
</body>
</html>

