import { createSchema, Type, typedModel, } from 'ts-mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import { Schema } from 'mongoose';

const UserSchema = createSchema({
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
    pets: Type.array().of({
        type: Schema.Types.ObjectId,
        ref: 'Peets'
    })
});

UserSchema.pre<any>('save', async function(next :any) {
    const user = this;
    if(user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);
    next();
});

UserSchema.methods.generateAuthToken = async function() {
    const token = jwt.encode({_id: this._id }, 'mysecretword');
    return token;
};

UserSchema.statics.findByCredentials = async function(email :string, password :string) {
    const user = await User.findOne({email: email});

    if(!user) throw new Error('Unable email');
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error('Unable to password');
    
    return user;
};

const User = typedModel('User', UserSchema);

export default User;