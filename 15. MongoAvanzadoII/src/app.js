/** clase mongo avanzado 2 **/

// temas de la ultima clase
//1. agregaciones
//2. paginacion
//3. tp final y consignas

import mongoose from "mongoose";
import OrderModel from "./models/order.model.js";

const main = async () => {
    mongoose.connect("mongodb+srv://valemicolgarcia:coderhouse@cluster0.rslwa.mongodb.net/MongoAvanzado2?retryWrites=true&w=majority&appName=Cluster0");

    /*
    //calculamos el total de pizzas vendidas por sabor en tamanio familiar
    const resultado = await OrderModel.aggregate([
        {
            //1 stage: voy a matchear con el tamanio familiar
            $match: {
                tam: "familiar"
            }
        },
        {
            //2 stage
            $group: {
                _id: "$nombre",
                total: {
                    $sum: "$cantidad"
                }
            }
        },
        //Nuevas peticiones de nuestra marketing lead
        {
            //ordenamos de mayor a menor
            $sort: {
                total: -1
            }
        },
        {
            $group: {
                _id: 1,
                orders: {
                    $push: "$$ROOT"
                    //root hace referencia al documento actual.
                }
            }
        },
        //una vez que agrupamos los resultados, los guardamos en una coleccion
        {
            $project: {
                "_id": 0,
                orders: "$orders"
                //aca le decimos que el campo orders va a ser igual al resultado que guardamos en el paso anterior
            }
        },
        //ultimo paso: hacemos el merge y se crea la coleccion nuevva
        {
            $merge: {
                into: "reports"
            }
        }


    ]);
    */

    //paginate
    const resultado = await OrderModel.paginate({ "tam": "familiar" }, { limit: 4, page: 1 });

    //verificamos el resultado
    console.log(resultado);

}

main();

//generamos un pequenio servidor
import express from "express";
const app = express();
const PUERTO = 8080;
import { engine } from "express-handlebars";

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//rutas
app.get("/pizzas", async (req, res) => {
    const page = req.query.page || 1;
    const limit = 2;


    const pizzas = await OrderModel.paginate({}, { limit, page }); //aca es donde configuaria los filtros
    //paginate me retorna un objeto
    //la informacion de las pizzAS se las pido a la base de datos que esta en la funcion main 

    //recuperamos los dosc 
    //pizzas.docs es donde se encuentra el array y con map lo vamos a desestructurar
    const pizzasResultadoFinal = pizzas.docs.map(
        pizza => {
            const { _id, ...rest } = pizza.toObject(); //le saco el id
            return rest;
        }
    );

    res.render("pizzas", {// le pasamos el nombre de la vista
        pizzas: pizzasResultadoFinal,
        hasPrevPage: pizzas.hasPrevPage,
        hasNextPage: pizzas.hasNextPage,
        prevPage: pizzas.prevPage,
        nextPage: pizzas.nextPage,
        currentPage: pizzas.page,
        totalPages: pizzas.totalPages
    });

})

//rutas
app.listen(PUERTO, () => console.log("sisi funciona "));