// 1. Elementos del DOM
const inputProducto = document.getElementById('inputProducto');
const btnAgregar = document.getElementById('btnAgregar');
const inputPosicion = document.getElementById('inputPosicion');
const btnEliminarPosicion = document.getElementById('btnEliminarPosicion');
const btnVaciar = document.getElementById('btnVaciar');
const contenedorLista = document.getElementById('contenedorLista');
const contadorCarrito = document.getElementById('contadorCarrito');

// 2. Estado de la aplicación
let productos = [];

// 3. Renderizar cambios en la pantalla
function actualizarInterfaz() {
    contenedorLista.innerHTML = '';

    if (productos.length === 0) {
        contenedorLista.innerHTML = `<p class="text-gray-400 italic text-center mt-4">Tu lista está vacía</p>`;
        contadorCarrito.textContent = '0';
        return;
    }

    productos.forEach((producto, indice) => {
        const fila = document.createElement('div');
        fila.className = "flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm md:text-base";
        
        fila.innerHTML = `
            <span class="font-medium text-gray-700">
                <span class="text-xs bg-gray-300 text-gray-800 px-2 py-0.5 rounded-full mr-2">${indice}</span>
                ${producto}
            </span>
            <button onclick="eliminarPorIndice(${indice})" class="text-red-500 hover:text-red-700 font-semibold text-xs md:text-sm bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition cursor-pointer">
                Eliminar
            </button>
        `;
        contenedorLista.appendChild(fila);
    });

    contadorCarrito.textContent = productos.length;
}

// 4. Lógica: Agregar Producto
function agregarProducto() {
    const nombreProducto = inputProducto.value.trim();
    
    if (nombreProducto === '') {
        alert('Por favor, escribe el nombre de un producto.');
        return;
    }

    productos.push(nombreProducto);
    inputProducto.value = '';
    inputProducto.focus();
    actualizarInterfaz();
}

// 5. Lógica: Eliminar producto cliqueando el botón directo de la fila
window.eliminarPorIndice = function(indice) {
    productos.splice(indice, 1);
    actualizarInterfaz();
}

// 6. Lógica: Eliminar usando el control de posición superior
function eliminarPorPosicion() {
    const posicion = parseInt(inputPosicion.value);

    if (isNaN(posicion) || posicion < 0 || posicion >= productos.length) {
        alert('Posición inválida o fuera de rango en la lista.');
        return;
    }

    productos.splice(posicion, 1);
    actualizarInterfaz();
}

// 7. Lógica: Vaciar por completo
function vaciarCarrito() {
    if (productos.length === 0) return;
    
    if (confirm('¿Estás seguro de que deseas vaciar toda la lista?')) {
        productos = [];
        actualizarInterfaz();
    }
}

// 8. Inicialización de Eventos
btnAgregar.addEventListener('click', agregarProducto);

inputProducto.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarProducto();
    }
});

btnEliminarPosicion.addEventListener('click', eliminarPorPosicion);
btnVaciar.addEventListener('click', vaciarCarrito);

// Dibujar lista vacía inicial
actualizarInterfaz();
