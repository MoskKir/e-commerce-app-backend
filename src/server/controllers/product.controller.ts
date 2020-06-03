import { Router as ExpressRouter, Request, Response, NextFunction } from 'express';
import ProductService from '../db/product.service';
import uploadPhoto from '../middleware/uploadImg';
import server from '../constants/server';


export default class ProductController {
    private static _router :ExpressRouter = ExpressRouter();
    
    private static addNewProduct(req :Request, res :Response, next :NextFunction) {
        try {
            if (req.body) {
                const imageUrl = `http://localhost:${server.port}/products/${req.file.filename}`;
                ProductService.addProduct(req.body.product, imageUrl)
            }; 
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async getAllProducts(req :Request, res :Response, next :NextFunction) {
        try {
            const products = await ProductService.getAllProducts();
            res.send(products);  
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async getProductById(req :Request, res :Response, next :NextFunction) {
        try {
            const { id } = req.params
            const product = await ProductService.getProductById(id);
            res.send(product);  
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async deleteProduct(req :Request, res :Response) {
        try {
            const { id } = req.params
            await ProductService.deleteProduct(id);
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    public static routes(path :string = '/') {
        this._router.post(`${path}`, uploadPhoto, this.addNewProduct);
        this._router.get(`${path}`, this.getAllProducts);
        this._router.get(`${path}:id`, this.getProductById);
        this._router.delete(`${path}:id`, this.deleteProduct);

        return this._router;
    }
}