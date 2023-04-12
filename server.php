<?php
//params
$param = isset($_GET['index']) ? $_GET['index'] : NULL;
$newTodo = isset($_POST['newtodo']) ? $_POST['newtodo'] : NULL;
//lettura file json
$todo = file_get_contents(__DIR__.'/todo.json');

//restituisco content type: json
header('Content-Type: application/json');

// Per leggere i dati dal file todo.json
$todoList = json_decode($todo, true);

// Per scrivere i dati sul file todo.json
file_put_contents(__DIR__.'/todo.json', json_encode($todoList));

// Per aggiungere un nuovo Todo alla lista
if ($newTodo) {
    $newTodo = [
      'text' => $newTodo,
      'done' => false,
    ];
    array_push($todoList, $newTodo);
    file_put_contents(__DIR__.'/todo.json', json_encode($todoList));
    echo json_encode($newTodo);
    exit;
  }