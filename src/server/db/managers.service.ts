import Manager from './managers.model';

export default class ManagersService {

    public static async addManagers(body :any) {
        const manager = new Manager(body);
        await manager.save();

        return manager;
    }

    public static async getAllManagers() {
        return await Manager.find({});
    }

    public static async getManagerById(productrId: string) {
        return await Manager.findById(productrId);
    }

    public static async auth(email :string, password :string) {
        const manager = await Manager.findByCredentials(email, password);
        if (!manager) throw new Error('Manager not found'); 
        const token = await manager.generateAuthToken();
        
        return {manager, token};
    }

}