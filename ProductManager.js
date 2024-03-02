const fs = require('fs')

class ProductManager{
    constructor() {
        this.products = []
        this.path = './products.json'
    }

    static id = 0

    getProducts = async() => {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
    }

    addProducts = async(title, description, price, thumbnail, code, stock) => {
        if(!title || !description || !price || !thumbnail || ! code || !stock){
            console.log('You forgot to put something.')
        }
        else{
            const found = this.products.find((array) => array.code === code)
            if (found){
               console.log('There are two products that had the same code.')
            }
            else{
                ProductManager.id++
                this.products.push({title, description, price, thumbnail, code, stock, id: ProductManager.id})
            }
        }
    }

    getProductById(id){
        const idProduct = this.products.find((array) => array.id === id)
        if(idProduct){
            console.log(idProduct)
        }
        else{
            console.log('Not found')
        }
    }

    updateProduct = async({title, description, price, thumbnail, code, stock, id}) =>{
        const file = await fs.promises.readFile(this.path, 'utf-8')
        const fileProducts = JSON.parse(file)
        const index = fileProducts.findIndex((p) => p.id === id)
        if(index === -1){
            console.log('We did not found that ID')
        }
        else{
            fileProducts[index] = {title, description, price, thumbnail, code, stock, id}
            await fs.promises.writeFile(this.path, JSON.stringify(fileProducts, null, 2))
        }
    }

    deleteProduct = async(id) => {
        const file = await fs.promises.readFile(this.path, 'utf-8')
        const fileProducts = JSON.parse(file)
        const findProduct = fileProducts.filter((p) => p.id !== id)
        if(findProduct.length !== fileProducts.length){
            return await fs.promises.writeFile(this.path, JSON.stringify(findProduct, null, 2))
        }
        else{
            console.log('This ID do not exist. Try with another ID')
        }
    }
}

const products = new ProductManager()

// Devuelve un arreglo vacío []
products.getProducts()
// Agrega los productos al arregló que antes estaba vacío
products.addProducts('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
products.addProducts('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc124', 25)
products.addProducts('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc125', 25)
products.addProducts('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc126', 25)
products.getProducts()
// Devuelve el producto del ID (en caso de error saldrá un 'Not Found')
products.getProductById(2)
// Actualiza un producto (en este caso, el del ID 4)
products.updateProduct
    ({
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc120",
    stock: 25,
    id: 4
    })
// Se elimina el producto
products.deleteProduct(1)
