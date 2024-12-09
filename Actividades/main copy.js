//CLASE:Realizar una clase “ProductManager” que gestione un conjunto de productos.
//CONSTRUCTOR:Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

/*
PRODUCTOS
Cada producto que gestione debe contar con las propiedades:
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)
*/

/*
METODO 1
Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
Validar que no se repita el campo “code” y que todos los campos sean obligatorios
Al agregarlo, debe crearse con un id autoincrementable

METODO 2
Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento

METODO 3
Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
En caso de no coincidir ningún id, mostrar en consola un error “Not found”

*/

const fs = requiere("fs").promises;
//con ESModules: import {promises as fs} from "fs"

class ProductManager {
    static ultId = 0; //pertencen a la clase y no requeiren instancia
    constructor(products) {
        this.products = []; //arreglo vacio
    }
    async addProduct(title, description, price, img, code, stock) {

        //yo puedo leer el archivo y guardarme el array con los productos:
        const arrayProductos = await this.leerArchivo();


        //validamos que se agregaron todos los campos
        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios, falta alguno!");
            return; //para que no agregue un producto que este incompleto
        }

        //validamos que el codigo sea unico
        if (this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico");
            return; //terminaria aca
        }

        //Si pasamos las validaciones, ahora podemos crear el objeto
        const nuevoProducto = {
            id: ++ProductManager.ultId, //el ++ atras aisgna y luego incrementa
            title,
            description,
            price,
            img,
            code,
            stock
        }

        //una vez que lo puedo crear lo pusheo al array
        arrayProductos.push(nuevoProducto);


    }
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const producto = this.products.find(item => item.id === id);

        if (!producto) {
            console.error("Not found!");
        } else {
            console.log(producto);
        }

    }

    //armar metodos auxiliares que guarden el archivo y recuperen los datos
    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))
        } catch (error) {
            console.log("Tenemos un error al guardar el archivo");
        }
    }

    async leerArchivo() {
        try {

            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        } catch (error) {
            console.log("Tenemos un error al leer el archivo")
        }
    }



}


//TESTING

//1. Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager(); //instancia

//2. Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(manager.getProducts());

/*3. Se llamará al método “addProduct” con los campos:
title: “producto prueba”
description:”Este es un producto prueba”
price:200,
thumbnail:”Sin imagen”
code:”abc123”,
stock:25

*/
//4. El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

manager.addProduct("Producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);

//5. Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

console.log(manager.getProducts());

//6. Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

//manager.addProduct("Producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25)

//devuelve --> el codigo debe ser unico

manager.addProduct("fideos", "no se pegan", 200, "sin imagen", "abc124", 25);
manager.addProduct("arroz", "no se pasa", 200, "sin imagen", "abc125", 25);
manager.addProduct("aceite", "lo podes usar", 200, "sin imagen", "abc126", 25);

console.log(manager.getProducts())


//pruebo agregar producto que le falta un campo
manager.addProduct("sal", "lo podes usar", 200, "sin imagen", "abc127");

//7. Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

console.log("Verificamos");

manager.getProductById(5); //not found
manager.getProductById(4); //existe
