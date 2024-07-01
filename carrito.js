let cartStorage = localStorage.getItem("cartProducts")
cartStorage = JSON.parse(cartStorage);
let cartContainer = document.getElementById("cart-section")

function renderCarrito(cartItems) {
    cartContainer.innerHTML = '' // Limpiar el contenido actual del carrito antes de renderizar
    cartItems.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <p>${producto.precio}</p>`
        cartContainer.appendChild(card)
    });
}

function calcularTotal(cartItems) {
    let total = 0;
    cartItems.forEach(producto => {
        total += producto.precio
    })
    return total
}

function calcularTotalIVA(cartItems) {
    const total = calcularTotal(cartItems)
    const iva = total * 0.21
    const totalConIVA = total + iva
    return totalConIVA
}

renderCarrito(cartStorage)

const botonConfirmarCompra = document.getElementById("confirmarCompra")
botonConfirmarCompra.addEventListener("click", () => {
    const totalCompra = calcularTotal(cartStorage)
    const totalIVA = calcularTotalIVA(cartStorage)
    
    document.getElementById("totalCompra").textContent = `Total de la compra: $${totalCompra}`
    document.getElementById("totalIVA").textContent = `Total de la compra con IVA (21%): $${totalIVA}`
    
    // Guardar los totales en localStorage
    localStorage.setItem("totalCompra", totalCompra.toString())
    localStorage.setItem("totalIVA", totalIVA.toString())
    
    // Mostrar el botón "Terminar Compra"
    mostrarBotonTerminarCompra()
})

function mostrarBotonTerminarCompra() {
    const botonTerminarCompra = document.createElement("button")
    botonTerminarCompra.textContent = "Terminar Compra"
    botonTerminarCompra.addEventListener("click", () => {
        localStorage.removeItem("cartProducts"); // Eliminar los productos del carrito en localStorage
        cartStorage = []; // Vaciar el array de productos en memoria
        renderCarrito(cartStorage); // Renderizar el carrito sin nada
        document.getElementById("totalCompra").textContent = '' // Limpiar el total de la compra
        document.getElementById("totalIVA").textContent = '' // Limpiar el total con IVA
        botonTerminarCompra.remove(); // sacar el botón "Terminar Compra" 
    })
    document.body.appendChild(botonTerminarCompra)
}
