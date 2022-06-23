import mongoose from "mongoose"

mongoose.connect();

class ApiClass{
    constructor(file){
        this.file = __dirname + file
    }

    async saveElemnt(element){
        try {
            const contenidoFileJson = await fs.promises.readFile(this.file, 'utf-8')
            let listElement = JSON.parse(contenidoFileJson)
            if(listElement.length === 0) {
                element.id = listElement.length+1
            }else{
                const lastElement = listElement[listElement.length-1]
                element.id = lastElement.id+1
            }
            listElement.push(element)
            await fs.promises.writeFile(this.file, JSON.stringify(listElement, null, 2))
            console.log(`Producto id:${element.id} - Agregado`);
            return element.id
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }

    async saveModifications(id, element){
        try {
            const contenidoFileJson = await fs.promises.readFile(this.file, 'utf-8')
            let listElement = JSON.parse(contenidoFileJson)
            listElement[id-1] = element
            await fs.promises.writeFile(this.file, JSON.stringify(listElement, null, 2))
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }

    async getById(id){   
        try {
            const contenidoFileJson = await fs.promises.readFile(this.file, 'utf-8')
            let listElement = JSON.parse(contenidoFileJson)
            let element = listElement.find(el => el.id === id);
            if(!element) element=null
            return element
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }

    async getAll(){  
        try {
            const contenidoFileJson = await fs.promises.readFile(this.file, 'utf-8')
            let listElement = JSON.parse(contenidoFileJson)
            return listElement
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }

    async deleteById(id){   
        try {
            const contenidoFileJson = await fs.promises.readFile(this.file, 'utf-8')
            let listElement = JSON.parse(contenidoFileJson)
            let element = listElement.find(el => el.id === id);
            let indiceElement = listElement.indexOf(element);
            if(indiceElement===-1) console.log('No existe el producto')
            else {
                listElement.splice(indiceElement,1)
                await fs.promises.writeFile(this.file,JSON.stringify(listElement, null, 2))
                console.log(`Producto id:${id} - eliminado`);
            }
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }
}

export default ApiClass