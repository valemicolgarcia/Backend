//array con objetos: creamos nuestra base de datos

let productosMarolio = [
    { id: 1, nombre: "Arroz", precio: 125 },
    { id: 2, nombre: "Fideos", precio: 70 },
    { id: 3, nombre: "Azucar", precio: 50 }
]

//si yo quiero que cualquier modulo de mi app pueda consumir los productos marolio deberia exportarlo

export default productosMarolio; //exporto el array