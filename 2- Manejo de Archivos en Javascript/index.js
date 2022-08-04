const {promises:fs} = require("fs");
const { stringify } = require("querystring");
const { CLIENT_RENEG_WINDOW } = require("tls");

class Producto{
    constructor(title,price,thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }

    async save(producto){
        let objs = await this.getAll();
        let newId;
        if(objs.length == 0){
            newId =1;
        }else{
            newId = objs[objs.length-1].id + 1;
        }
        producto={id: newId,...producto}
        let datos = [...objs,producto];
        try {
            await fs.writeFile(this.archivo,JSON.stringify(datos,null,2))
        } catch (error) {
            throw new Error(`Error al guardar los datos ${error}`);
        }
    }

    async getById(id){
        let objs = await this.getAll();
        let obj = objs.filter( o => o.id == id)
        if(obj.length != 0){
            return obj
        }else{
            return `No se puede obtener el producto con ese Id: ${id}`
        }
    }

    async getAll(){
        try{
            const objs = await fs.readFile(this.archivo);
            return JSON.parse(objs);
        }catch(error){
            return [];
        }
    }

    async deleteById(id){
        let objs = await this.getAll();
        let obj = objs.filter( o => o.id != id)
        try {
            await fs.writeFile(this.archivo,JSON.stringify(obj,null,2))
            return obj
        } catch (error) {
            return `no se puede obtener el registro ${error}`
        }
        
    }

    async deleteAll(){
        try {
            await fs.writeFile(this.archivo,stringify([],null,2))
        } catch (error) {
            return `No se pudieron borrar los datos ${error}`
        }
    }
}


let productos = new Contenedor('./productos.txt');
 let producto = new Producto("Notebook Asus",350000,"https://http2.mlstatic.com/D_NQ_NP_979391-MLA50111675848_052022-O.webp")
let producto2 = new Producto("Monitor LG",60000,"https://http2.mlstatic.com/D_NQ_NP_2X_748692-MLA50510766441_062022-F.webp")
let producto3 = new Producto("teclado Logitech",12000,"https://http2.mlstatic.com/D_NQ_NP_2X_748692-MLA50510766441_062022-F.webp")

 
// productos.save(producto3)

// productos.getAll().then(o =>{
//         console.log(o)
//     }).catch( error =>{
//         console.log(`No se puedo mostrar el producto ${error}`)
//     })


// productos.getById(1).then(o =>{
//     console.log(o)
// }).catch( error =>{
//     console.log(`No se puedo mostrar el producto ${error}`)
// })


// productos.deleteById(3).then(o =>{
//     console.log(o)
// }).catch( error =>{
//     console.log(`No se puedo mostrar el producto ${error}`)
// })


//productos.deleteAll()