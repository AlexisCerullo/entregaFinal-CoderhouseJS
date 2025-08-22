let cuenta = JSON.parse(localStorage.getItem("cuenta")) || [];
let total = cuenta.reduce((acumulacion, hamburguesa) => acumulacion + hamburguesa.precio, 0);

const contenedorHamburguesas = document.getElementById("hamburguesas");
const contenedorCuenta = document.getElementById("cuenta");
const acumulacion = document.getElementById("acumulacion");


const cuentaTotal = document.createElement('p');
cuentaTotal.classList.add('cuenta-total');
contenedorCuenta.appendChild(cuentaTotal);

const botonCompra = document.getElementById('boton-compra');
botonCompra.addEventListener('click', () => {
    if (total === 0) {
        alert('agrega algo al carro')
    } else {
        cuenta = [];
        guardarCuenta();
        mostrarCuenta();
        alert('su compra ha sido finalizada')
    }

});

function guardarCuenta() {
    localStorage.setItem("cuenta", JSON.stringify(cuenta));
    total = cuenta.reduce((acumulacion, hamburguesa) => acumulacion + hamburguesa.precio, 0);
}

function mostrarCuenta() {
    acumulacion.innerHTML = "";

    cuenta.forEach((hamburguesa, i) => {
        const cuentaItem = document.createElement('p');
        cuentaItem.classList.add('cuenta-item');
        cuentaItem.innerHTML = `${hamburguesa.nombre}: <span>$${hamburguesa.precio}</span>`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'x';
        botonEliminar.classList.add('cuenta-eliminar');

        botonEliminar.addEventListener('click', () => {
            cuenta.splice(i, 1);
            guardarCuenta();
            mostrarCuenta();
        });

        cuentaItem.prepend(botonEliminar);
        acumulacion.appendChild(cuentaItem);
    });

    cuentaTotal.innerHTML = `Tu total es: <span>$${total}</span>`;
}

mostrarCuenta();

async function obtenerHamburguesas() {
    try {
        const response = await fetch("hamburguesas.json");
        const hamburguesas = await response.json();
        hamburguesas.forEach(hamburguesa => {

            const item = document.createElement('div');
            item.classList.add('hamburguesa');
            contenedorHamburguesas.appendChild(item);

            const nombre = document.createElement('h3');
            nombre.classList.add('hamburguesa-nombre');
            nombre.textContent = hamburguesa.nombre;
            item.appendChild(nombre);

            const precio = document.createElement('p');
            precio.classList.add('hamburguesa-precio');
            precio.textContent = `$${hamburguesa.precio}`;
            item.appendChild(precio);

            const imagen = document.createElement('img');
            imagen.classList.add('hamburguesa-imagen');
            imagen.setAttribute("src", `images/${hamburguesa.imagen}`);
            imagen.setAttribute("alt", `Imagen de una hamburguesa ${hamburguesa.nombre}`);
            item.appendChild(imagen);

            const botonAgregar = document.createElement('input');
            botonAgregar.classList.add('hamburguesa-boton');
            botonAgregar.setAttribute("type", `button`);
            botonAgregar.setAttribute("value", `Agregar a la Cuenta`);
            item.appendChild(botonAgregar);

            botonAgregar.addEventListener('click', () => {
                cuenta.push({ nombre: hamburguesa.nombre, precio: hamburguesa.precio });
                guardarCuenta();
                mostrarCuenta();
            });
        });
    } catch (error) {
        console.error(error);
    }
}
obtenerHamburguesas();
