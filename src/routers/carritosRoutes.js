import { Router } from "express";
import ApiClass from "../api";

const carritoRouter = Router();

const apiClass = new ApiClass('/data_base/carritos.json')

carritoRouter.get('/',async(req,res)=>{
    const carrito = await apiClass.getAll()
    res.json(carrito)
})

//ruta agrega un nuevo producto
carritoRouter.post('/', async(req, res)=>{
    const nuevoCarrito = req.body
    await apiClass.saveElemnt(nuevoCarrito)

    res.send({
        mensaje: ' Carrito agregado',
        Carrito:{
            ...nuevoCarrito
        }
    })
})

//ruta elimina un producto por id
carritoRouter.delete('/:id', async(req,res)=>{
    const idCarrito = parseInt(req.params.id) 
    await apiClass.deleteById(idCarrito)
    res.send('Producto eliminado')
})

// ruta que devuelve un producto por id
carritoRouter.get('/:id/productos',async(req,res)=>{
    const idCarrito = parseInt(req.params.id)
    const carrito = await apiClass.getById(idCarrito)
    res.json(carrito)
})

export default carritoRouter