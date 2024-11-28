// JavaScript para menú móvil
// Eventos y Manipulación de DOM

// Evento para buscar productos en la barra de búsqueda
function buscarProducto() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const productos = document.querySelectorAll(".producto-item");

    productos.forEach((producto) => {
        const titulo = producto.querySelector("h3").textContent.toLowerCase();
        producto.style.display = titulo.includes(input) ? "block" : "none";
    });
}

// Agregar evento para que se ejecute la búsqueda al presionar Enter en el input
document.getElementById("searchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        buscarProducto();
    }
});

// Autenticación de Usuario (Simulada)
  function autenticarUsuario() {
    const usuario = prompt("Ingrese su usuario:");
    const contraseña = prompt("Ingrese su contraseña:");

    // Aquí se realiza una autenticación básica simulada.
    if (usuario === "admin" && contraseña === "1234") {
        alert("¡Bienvenido, " + usuario + "!");
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}  

// Botón de autenticación
/* const authButton = document.createElement("button");
authButton.textContent = "Iniciar Sesión";
authButton.className = "auth-button"; // Aplicar la clase CSS
authButton.onclick = autenticarUsuario;
document.body.insertBefore(authButton, document.body.firstChild); */

// Evento para cambiar el color de fondo al hacer clic en los productos
document.querySelectorAll(".producto-item").forEach((producto) => {
    producto.addEventListener("click", () => {
        producto.style.backgroundColor = producto.style.backgroundColor === "lightblue" ? "" : "lightblue";
    });
});

// Roles disponibles
const roles = {
    admin: {
        vistas: ["#adminContent"],
        estilo: "admin-style",
    },
    cliente: {
        vistas: ["#userContent"],
        estilo: "user-style",
    },
};

// Simulación de inicio de sesión y creación de objeto usuario
function iniciarSesion() {
    const usuario = prompt("Ingrese su usuario:");
    const contraseña = prompt("Ingrese su contraseña:");
    
    // Validación simple para demo
    if (usuario === "admin" && contraseña === "admin123") {
        setUsuario({ nombre: "Administrador", rol: "admin" });
    } else if (usuario === "cliente" && contraseña === "cliente123") {
        setUsuario({ nombre: "Cliente", rol: "cliente" });
    } else {
        alert("Credenciales incorrectas.");
    }
}

// Crear y configurar usuario
function setUsuario(usuario) {
    const vistas = roles[usuario.rol]?.vistas || [];
    const estilo = roles[usuario.rol]?.estilo || "";

    // Mostrar las vistas correspondientes
    document.querySelectorAll("section").forEach((section) => {
        section.classList.add("oculto");
    });

    vistas.forEach((id) => {
        document.querySelector(id)?.classList.remove("oculto");
    });

    // Aplicar estilo visual
    document.body.className = estilo;

    alert(`Bienvenido, ${usuario.nombre}. Rol: ${usuario.rol}`);
}

// Botón de inicio de sesión
const loginButton = document.createElement("button");
loginButton.textContent = "Iniciar Sesión";
loginButton.className = "auth-button";
loginButton.addEventListener("click", iniciarSesion);

document.body.insertBefore(loginButton, document.body.firstChild);

// Simulación de base de datos de usuarios
const usuarios = [
    { username: "admin", email: "admin@example.com", password: "admin123", rol: "admin" },
    { username: "cliente", email: "cliente@example.com", password: "cliente123", rol: "cliente" },
];

// Buscar usuario por username o email
function buscarUsuario(usernameOrEmail) {
    return usuarios.find(
        (user) => user.username === usernameOrEmail || user.email === usernameOrEmail
    );
}

// Manejador de recuperación
function recuperarCuenta(event) {
    event.preventDefault();
    const usernameOrEmail = document.getElementById("username").value.trim();
    const usuario = buscarUsuario(usernameOrEmail);

    if (usuario) {
        alert(`Usuario encontrado: ${usuario.username}`);
        mostrarFormularioReset(usuario);
    } else {
        alert("Usuario o correo no encontrado.");
    }
}

// Mostrar formulario para cambiar contraseña
function mostrarFormularioReset(usuario) {
    document.getElementById("recoverForm").classList.add("oculto");
    const resetForm = document.getElementById("resetPasswordForm");
    resetForm.classList.remove("oculto");

    resetForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const nuevaPassword = document.getElementById("newPassword").value.trim();
        if (nuevaPassword.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
        } else {
            usuario.password = nuevaPassword; // Cambiar la contraseña
            alert("Contraseña actualizada exitosamente.");
            resetearFormulario();
        }
    });
}

// Resetear el formulario de recuperación
function resetearFormulario() {
    document.getElementById("recoverAccount").classList.add("oculto");
    document.getElementById("recoverForm").reset();
    document.getElementById("resetPasswordForm").reset();
    document.getElementById("recoverForm").classList.remove("oculto");
    document.getElementById("resetPasswordForm").classList.add("oculto");
}

// Mostrar el flujo de recuperación
function mostrarRecuperacion() {
    document.getElementById("recoverAccount").classList.add("visible");
    document.getElementById("recoverAccount").classList.remove("oculto");
}

// Botón para abrir el flujo de recuperación
const recoverButton = document.createElement("button");
recoverButton.textContent = "¿Olvidaste tu contraseña?";
recoverButton.className = "auth-button";
recoverButton.addEventListener("click", mostrarRecuperacion);

document.body.insertBefore(recoverButton, document.body.firstChild);

// Asignar evento al formulario de recuperación
document.getElementById("recoverForm").addEventListener("submit", recuperarCuenta);
