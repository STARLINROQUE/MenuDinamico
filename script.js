document.addEventListener("DOMContentLoaded", function () {
  const menuContainer = document.getElementById("menuContainer");
  const menuAdmin = document.getElementById("menuAdmin");
  const form = document.getElementById("menuForm");

  // Cargar menú
  fetch("menu.json")
    .then(response => response.json())
    .then(data => {
      renderMenu(data.menu);
      renderAdmin(data.menu);
    });

  // Agregar nueva opción
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    
    fetch("guardar_menu.php", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        alert("Opción agregada correctamente.");
        location.reload();
      } else {
        alert("Error: " + response.message);
      }
    });
  });

  function renderMenu(menuItems) {
    const ul = document.createElement("ul");
    ul.className = "menu";

    menuItems.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.enlace;
      a.textContent = item.nombre;
      li.appendChild(a);
      ul.appendChild(li);
    });

    menuContainer.innerHTML = "";
    menuContainer.appendChild(ul);
  }

  function renderAdmin(menuItems) {
    menuAdmin.innerHTML = "";
    menuItems.forEach(item => {
      const div = document.createElement("div");
      div.className = "admin-item";
      div.innerHTML = `
        <input type="text" value="${item.nombre}" class="nombre" />
        <input type="text" value="${item.enlace}" class="enlace" />
        <button class="edit" data-id="${item.id}">Guardar</button>
        <button class="delete" data-id="${item.id}">Eliminar</button>
      `;
      menuAdmin.appendChild(div);
    });

    // Editar
    document.querySelectorAll(".edit").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        const parent = this.parentElement;
        const nombre = parent.querySelector(".nombre").value;
        const enlace = parent.querySelector(".enlace").value;

        fetch("editar_menu.php", {
          method: "POST",
          body: new URLSearchParams({ id, nombre, enlace })
        }).then(res => res.json()).then(resp => {
          if (resp.success) {
            alert("Opción editada.");
            location.reload();
          }
        });
      });
    });

    // Eliminar
    document.querySelectorAll(".delete").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        if (confirm("¿Eliminar esta opción?")) {
          fetch("eliminar_menu.php", {
            method: "POST",
            body: new URLSearchParams({ id })
          }).then(res => res.json()).then(resp => {
            if (resp.success) {
              alert("Eliminado.");
              location.reload();
            }
          });
        }
      });
    });
  }
});
