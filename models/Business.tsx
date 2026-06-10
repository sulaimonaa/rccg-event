import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema(
    {
        business: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        service: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Business ||
mongoose.model("Business", BusinessSchema);