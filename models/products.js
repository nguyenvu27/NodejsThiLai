import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    price: { 
        type: Number, 
        default: null 
    },
    description: {
        type: String,
        default: null
    }
})