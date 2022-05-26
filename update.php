<?php

// Diretório padrão dos módulos do sistema
const MODULES_DIR = "./modules";

$modules = get_modules(MODULES_DIR);
if (empty($modules))
    echo "empty modules directory." . "\n";

foreach ($modules as $module) {
    $module->manuals = get_manuals($module->path);
    echo "module imported: " . $module->name . "\n";
}

file_put_contents(__DIR__ . "/data.json", json_encode($modules, JSON_PRETTY_PRINT));

$json = json_encode($modules, JSON_PRETTY_PRINT);

function get_modules($dir)
{
    $files_in_dir = scandir($dir);

    foreach ($files_in_dir as $file) {
        if ($file != '.' && $file != '..' && (!is_file($dir . "/" . $file)))
        {
            $module = new stdClass;
            $module->name = $file;
            $module->path = $dir . "/" . $file . "/";
            $modules[] = $module;
        }
    }

    return isset($modules) ? $modules : [];
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