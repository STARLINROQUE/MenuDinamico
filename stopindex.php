<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Menú Dinámico</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Menú Dinámico con JSON y PHP</h1>
  </header>

  <nav id="menuContainer"></nav>

  <main>
    <h2 style="text-align: center;">Agregar nueva opción al menú</h2>

    <form id="menuForm">
      <input type="text" name="nombre" placeholder="Nombre del menú" required>
      <input type="text" name="enlace" placeholder="Enlace (ej: /servicios)" required>
      <button type="submit">Agregar</button>
    </form>
  </main>

  <footer>
    <p>&copy; 2025 - Proyecto Final</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
