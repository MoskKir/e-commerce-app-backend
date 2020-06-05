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

    public static async addProduct(body :string, imageUrl :string) {
        const bodyProduct: bodyProductInterface = JSON.parse(body);
        bodyProduct.photo = imageUrl;
        const product = new Product(bodyProduct);
        await product.save();

        return product;
    }

    public static async getAllProducts(params: { pageNo: number, size: number }) {
        return await Product.find().skip(+params.pageNo).limit(+params.size);
    }

    public static async getProductById(productrId: string) {
        return await Product.findById(productrId);
    }

    public static async deleteProduct(id :string) {
        return await Product.findByIdAndDelete(id);
    }

}
