<?php

namespace src\Controller;

class PageController extends MasterController
{
    public function main()
    {
        $this->render("main");
    }

    public function wordSearch()
    {
        $word = strtolower($_POST['word']);

        $jsonStr = file_get_contents( __HT__ . "/app/words.json" );
        $jsonFile = json_decode($jsonStr);


        echo "<script>";
        echo "const wordStorage = JSON.parse(localStorage.getItem('word'));";
        if(!in_array($word, $jsonFile)) {
            echo "alert('존재하지 않는 단어입니다.');";
            echo "wordStorage.return = false;";
        } else {
            echo "wordStorage.return = true;";
        }
        echo "wordStorage.word = '{$word}';";
        echo "localStorage.setItem('word', JSON.stringify(wordStorage));";
        echo "history.back();";
        echo "</script>";  
    }
}

