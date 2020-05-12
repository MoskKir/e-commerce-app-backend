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

    public static routes(path :string = '/') {
        this._router.post(`${path}`, this.addNewProduct);

        return this._router;
    }
}