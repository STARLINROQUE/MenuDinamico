let menuData = [];

document.addEventListener("DOMContentLoaded", () => {
    const stored = localStorage.getItem("menu");
    if (stored) {
        menuData = JSON.parse(stored);
        renderMenu();
    } else {
        fetch("menu.json")
            .then(response => response.json())
            .then(data => {
                menuData = data.menu;
                renderMenu();
            })
            .catch(error => console.error("Error al cargar el JSON:", error));
    }
});

function renderMenu() {
    const menuList = document.getElementById("menu-list");
    menuList.innerHTML = "";

    menuData.forEach(item => {
        const li = document.createElement("li");

        const link = document.createElement("a");
        link.href = item.enlace;
        link.innerText = item.nombre;
        link.target = "_blank";

        li.appendChild(link);

        if (item.submenu && item.submenu.length > 0) {
            const submenu = document.createElement("div");
            submenu.classList.add("submenu");

            item.submenu.forEach(sub => {
                const subLink = document.createElement("a");
                subLink.href = sub.enlace;
                subLink.innerText = sub.nombre;
                subLink.target = "_blank";
                submenu.appendChild(subLink);
            });

            li.appendChild(submenu);
        }

        menuList.appendChild(li);
    });

    localStorage.setItem("menu", JSON.stringify(menuData));
}

function parseSubmenuInput() {
    const raw = document.getElementById("submenu-items").value.trim();
    if (!raw) return [];

    return raw.split("\n").map(line => {
        const [nombre, enlace] = line.split("|").map(s => s.trim());
        return { nombre, enlace };
    }).filter(item => item.nombre && item.enlace);
}

function addMenuItem() {
    const nombre = document.getElementById("menu-name").value.trim();
    const enlace = document.getElementById("menu-link").value.trim();
    const submenu = parseSubmenuInput();

    if (nombre && enlace) {
        const newItem = {
            id: Date.now(),
            nombre,
            enlace,
            submenu
        };

        menuData.push(newItem);
        renderMenu();
        clearInputs();
    } else {
        alert("Por favor, completa nombre y enlace.");
    }
}

function updateMenuItem() {
    const id = parseInt(document.getElementById("menu-id").value);
    const nombre = document.getElementById("menu-name").value.trim();
    const enlace = document.getElementById("menu-link").value.trim();
    const submenu = parseSubmenuInput();

    const index = menuData.findIndex(item => item.id === id);
    if (index !== -1) {
        if (nombre) menuData[index].nombre = nombre;
        if (enlace) menuData[index].enlace = enlace;
        menuData[index].submenu = submenu;
        renderMenu();
        clearInputs();
    } else {
        alert("ID no encontrado.");
    }
}

function deleteMenuItem() {
    const id = parseInt(document.getElementById("menu-id").value);
    const index = menuData.findIndex(item => item.id === id);
    if (index !== -1) {
        if (confirm("¿Seguro que deseas eliminar este ítem?")) {
            menuData.splice(index, 1);
            renderMenu();
            clearInputs();
        }
    } else {
        alert("ID no encontrado.");
    }
}

function downloadMenuJSON() {
    const dataStr = JSON.stringify({ menu: menuData }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "menu_actualizado.json";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function clearInputs() {
    document.getElementById("menu-id").value = "";
    document.getElementById("menu-name").value = "";
    document.getElementById("menu-link").value = "";
    document.getElementById("submenu-items").value = "";
}
