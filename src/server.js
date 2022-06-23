import express from "express";
import morgan from "morgan";
import carritosRouter from "./routers/carritosRoutes";
import productosRouter from "./routers/productosRoutes";

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(morgan('dev'));

server.get('/', (req, res)=>{
    res.send("Proyecto final")
});
server.use('/productos',productosRouter);
server.use('/carrito',carritosRouter);

const port = 8080;
server.listen(port, ()=>{
    console.log(`Servidor conectado al puerto ${port}`)
});
server.on("error",error=>console.log(`Se produjo error de servidor ${error}`));