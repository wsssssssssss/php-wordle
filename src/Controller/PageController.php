<?php

namespace src\Controller;

use src\App\DB;
use src\App\Lib;

class PageController extends MasterController
{
    public function main()
    {
        $this->render("main");

        $result = DB::fetchAll("SELECT * FROM wordle_tbl");
        
        if(!$result) {
            DB::execute("INSERT INTO `wordle_tbl`(`no`, `word`, `wordle_date`) VALUES (?, ?, now())", ['1', '']);
        }
        
        $result = DB::fetchAll("SELECT * FROM wordle_tbl ORDER BY no desc");

        $date = $result[0]->wordle_date;

        echo "<script>";
        echo "phpSetTime('{$date}');";
        echo "phpTimer('{$date}');";
        echo "</script>";

    }

    public function dateInsert()
    {
        $date = $_POST['date'];
        $word = $_POST['word'];
        $count = DB::fetchAll("SELECT COUNT(*) as count FROM wordle_tbl");

        DB::execute("INSERT INTO `wordle_tbl`(`no`, `word`, `wordle_date`) VALUES (?, ?, ?)", [$count[0]->count+1, $word, $date]);

        Lib::pageGO("/");
    }

    public function wordCheck()
    {
        $test = strtolower($_GET['word']);
        $jsonStr = file_get_contents( __HT__ . "/app/words.json" );
        $jsonFile = json_decode($jsonStr);

        $testArr = [];

        if(in_array($test, $jsonFile)) {
            $testArr = ['text' => "존재하는 단어입니다.", 'code' => '200'];
        } else {
            $testArr = ['text' => "존재하지 않는 단어입니다.", 'code' => '404'];
        }
        
        echo json_encode($testArr);
    }
}

