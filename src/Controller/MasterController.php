<?php

namespace src\Controller;

class MasterController
{
    public function render($page, $data =[])
    {
        extract($data);

        require_once( __ROOT__ . "/views/" . $page . '.php' );
    }
}

