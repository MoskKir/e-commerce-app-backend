import { createSchema, Type, typedModel, } from 'ts-mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';

const ManagersSchema = createSchema({
    name: Type.string({   
        required: true,
        trim: true
    }),
    email: Type.string({
        required: true,
        unique:true,
        trim: true
    }),
    password: Type.string({
        required: true,
        minlength: 6,
        trim: true,
    }),
    role: Type.string({
        required: true,
        trim: true,
    }),
});

ManagersSchema.pre<any>('save', async function(next :any) {
    const manager = this;
    if(manager.isModified('password')) manager.password = await bcrypt.hash(manager.password, 8);
    next();
});

ManagersSchema.methods.generateAuthToken = async function() {
    const token = jwt.encode({_id: this._id }, 'mysecretword');
    return token;
};

ManagersSchema.statics.findByCredentials = async function(email :string, password :string) {
    const manager = await Manager.findOne({email: email});

    if(!manager) throw new Error('Unable email');
    
    const isMatch = await bcrypt.compare(password, manager.password);

    if (!isMatch) throw new Error('Unable to password');
    
    return manager;
};

const Manager = typedModel('Manager', ManagersSchema);

export default Manager;