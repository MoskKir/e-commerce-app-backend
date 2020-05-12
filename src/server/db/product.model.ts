import { createSchema, Type, typedModel, } from 'ts-mongoose';

const ProductSchema = createSchema({
    type: Type.string({        
        required: true,
        minlength: 1,
        trim: true
    }),
    title: Type.string({
        required: true,
        minlength: 1,
        trim: true,
    }),
    photo: Type.string({
        required: true,
        minlength: 1,
        trim: true,
    }),
    info: Type.string({
        required: true,
        minlength: 1,
        trim: true,
    }),
    price: Type.number({
        required: true,
    }),
    date: Type.date({
        required: true,
    })
});

const Product = typedModel('Product', ProductSchema);

export default Product;