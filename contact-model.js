import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    }
});

const contact = mongoose.model("Contact", contactSchema);

export { contact };