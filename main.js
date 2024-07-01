const productos = [
    {
        id: 1,
        nombre: "Remera Kill Bill",
        precio: 11000,
        img: "./img/remera-killbill.png"
    },
    {
        id: 2,
        nombre: "Remera John Wick",
        precio: 11000,
        img: "./img/remera-john-wick.png"
    },
    {
        id: 3,
        nombre: "Bolso Pulp Fiction",
        precio: 7500,
        img: "./img/bolso-mia.png"
    },
    {
        id: 4,
        nombre: "Porta Espiral Strange",
        precio: 13000,
        img: "./img/porta-espiral.png"
    },
    {
        id: 5,
        nombre: "Pelota Wilson",
        precio: 30000,
        img: "./img/pelota-voley-wilson.png"
    },
    {
        id: 6,
        nombre: "Short Kill Bill",
        precio: 20000,
        img: "./img/short-kill-2.png"
    }
];

let cartProducts = [] //array vacio para pushear mis productos 

let productsContainer = document.getElementById("products-container")
function renderProductos(productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <img src="${producto.img}"> 
                          <p>${producto.precio}</p>
                          <button class="productoAgregar" id="${producto.id}">Agregar </button>`
        productsContainer.appendChild(card)
    })

    addToCartButton() //llamo la funcion despues de renderizar 
}

renderProductos(productos) //llamo la funcion que trae el array de productos

//funcion que se encarga de agregar los productos Cada boton tiene un su propia clase
// queryselectorAll es parecido al class pero incluye el CSS por eso tiene .


function addToCartButton() {
    addButton = document.querySelectorAll(".productoAgregar") //traigo la lista de botones traida por la clase
    addButton.forEach(button => { //recorro cada boton
        button.onclick = (e) => { //capturo el click con el evento onclick lo referencio con e
            const productId = e.currentTarget.id //current target es que yo hago foco dame el ID
            const selectedProduct = productos.find(producto => producto.id == productId) // buscame dentro del array un producto que tenga el mismo ID que yo capture y se lo encontras ubicalo en la const selectProduct

            cartProducts.push(selectedProduct) // pusheame adentro de cartProducts lo que sacaste de SelectProducts
            console.log(cartProducts)

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts)) // con esto guardo en mi array y con el stringify convierte en string lo que le voy a mandar
        }
    })
}