<?php

namespace src\App;

class Lib
{
    public static function MsgAndGo($msg, $url)
    {
        echo "<script>";
        echo "alert('{$msg}');";
        echo "location.href='{$url}';";
        echo "</script>";
        exit;
    }

    public static function pageGO($url)
    {
        echo "<script>";
        echo "location.href='{$url}';";
        echo "</script>";
        exit;
    }
    
}


