<?php

namespace src\App;

class Route
{
    public static $actions = [];

    public static function __callStatic($mehtod, $args)
    {
        $path = strtolower($_SERVER["REQUEST_METHOD"]);

        if($path === $mehtod)
        {
            self::$actions[] = $args;
        }
    }

    public static function init()
    {
        $path = explode('?', $_SERVER["REQUEST_URI"])[0];

        foreach(self::$actions as $req)
        {
            if($req[0] == $path)
            {
                $action = explode('@', $req[1]);
                $controllerClass = "\\src\\Controller\\" . $action[0];
                $controller = new $controllerClass();
                $controller->{$action[1]}();

                return;
            }
        }

        echo "404";
    }

}

