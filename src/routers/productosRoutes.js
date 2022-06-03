import { Router } from "express";
import ApiClass from "../api";

const productosRouter = Router();

const apiClass = new ApiClass('/data_base/productos.json')

const accessPermission = true;

const accessUsers = (req, res, next)=>{
    if(!accessPermission){
        res.send('Operación no permitida')
    }else{
        next()
    }
}

productosRouter.get('/',async(req,res)=>{
    const listaProductos = await apiClass.getAll()
    res.json(listaProductos)
})

// ruta que devuelve un producto por id
productosRouter.get('/:id',async(req,res)=>{
    const idProducto = parseInt(req.params.id)
    const producto = await apiClass.getById(idProducto)
    res.json(producto)
})

//ruta agrega un nuevo producto
productosRouter.post('/', accessUsers, async(req, res)=>{
    const nuevoProducto = req.body
    nuevoProducto.price = parseInt(nuevoProducto.price)
    await apiClass.saveElemnt(nuevoProducto)

    res.send({
        mensaje: ' producto nuevo agregado',
        producto:{
            ...nuevoProducto
        }
    })
})

//ruta actualiza un producto por id
productosRouter.put('/:id', accessUsers, async(req,res)=>{

    const idProducto = parseInt(req.params.id)
    const producto = await apiClass.getById(idProducto)
    const productoModificado = req.body

    if(producto.title != productoModificado.title) producto.title = productoModificado.title
    if(producto.price != productoModificado.price) producto.price = productoModificado.price

    await apiClass.saveModifications(idProducto, producto)

    res.json(producto)
})

//ruta elimina un producto por id
productosRouter.delete('/:id', accessUsers, async(req,res)=>{
    const idProducto = parseInt(req.params.id) 
    await apiClass.deleteById(idProducto)
    res.send('Producto eliminado')
})
export default productosRouter