<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre']);
    $enlace = trim($_POST['enlace']);

    if ($nombre && filter_var('https://dummy.com' . $enlace, FILTER_VALIDATE_URL)) {
        $json = file_get_contents('menu.json');
        $data = json_decode($json, true);

        $ids = array_column($data['menu'], 'id');
        $newId = max($ids) + 1;

        $data['menu'][] = [
            'id' => $newId,
            'nombre' => htmlspecialchars($nombre),
            'enlace' => htmlspecialchars($enlace)
        ];

        file_put_contents('menu.json', json_encode($data, JSON_PRETTY_PRINT));
        echo json_encode(['success' => true, 'message' => 'Opción agregada.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Datos inválidos.']);
    }
}
?>
