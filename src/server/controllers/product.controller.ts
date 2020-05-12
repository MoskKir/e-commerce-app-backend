import { Router as ExpressRouter, Request, Response, NextFunction } from 'express';
import ProductService from '../db/product.service';


export default class ProductController {
    private static _router :ExpressRouter = ExpressRouter();
    
    private static addNewProduct(req :Request, res :Response, next :NextFunction) {
        try {
            if (req.body) ProductService.addProduct(req.body); 
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

    public static routes(path :string = '/') {
        this._router.post(`${path}`, this.addNewProduct);
        this._router.get(`${path}`, this.getAllProducts);

        return this._router;
    }
}