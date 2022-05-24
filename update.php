<?php

// Diretório padrão dos módulos do sistema
const modules_dir = "./modules";

$modules = get_modules(modules_dir);

foreach ($modules as $module) {
    $module->manuals = get_manuals($module->path);
}

file_put_contents(__DIR__ . "/data.json", json_encode($modules, JSON_PRETTY_PRINT));

$json = json_encode($modules, JSON_PRETTY_PRINT);
var_dump($json);

function get_modules($dir)
{
    $files_in_dir = scandir($dir);

    foreach ($files_in_dir as $file) {
        if ($file != '.' && $file != '..')
        {
            $module = new stdClass;
            $module->name = $file;
            $module->path = $dir . "/" . $file . "/";
            $modules[] = $module;
        }
    }

    return $modules;
}
 
function get_manuals($dir) {
    $files_in_dir = scandir($dir);

    foreach ($files_in_dir as $file) {
        if ( $file != '.' && $file != '..' && (is_file($dir . "/" . $file))) 
        {
            $manual = new stdClass;
            $manual->name = basename($file, ".md");
            $manual->filename = $file;

            $manuals[] = $manual;
        }
    }

    return $manuals;
}