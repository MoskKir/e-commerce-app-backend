import { Router as ExpressRouter, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import ManagersService from '../db/managers.service';


export default class ManagersController {
    private static _router :ExpressRouter = ExpressRouter();
    private static _upload = multer({dest: 'uploads'});

    private static async getAllManagers(req :Request, res :Response, next :NextFunction) {
        try {
            const managers = await ManagersService.getAllManagers();
            res.send(managers);  
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static addNewManager(req :Request, res :Response, next :NextFunction) {
        try {
            if (req.body) ManagersService.addManagers(req.body);
            res.status(200).send(req.body);          
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async authorization(req :Request, res :Response, next :NextFunction) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const userWithToken = await ManagersService.auth(email, password);
            res.send(userWithToken)
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    public static routes(path :string = '/') {
        this._router.post(`${path}`, this.addNewManager);
        this._router.post(`${path}login`, this.authorization );

        return this._router;
    }
}