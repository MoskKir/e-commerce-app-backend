import Product from './product.model';

interface bodyProductInterface {
    type :string;
    title :string;
    photo :string;
    info :string;
    price :number;
    date :Date;
}

export default class ProductService {

    public static async addProduct(body :bodyProductInterface) {
        const product = new Product(body);
        await product.save();

        return product;
    }

    public static async getAllProducts() {
        return await Product.find({});
    }

    public static async getProductById(productrId: string) {
        return await Product.findById(productrId);
    }

    

}
