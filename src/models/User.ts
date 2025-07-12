import mongoose, { Schema } from "mongoose";
import { IUser } from "types/IUser";
import validator from "validator";


const userSchema: Schema<IUser> = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        },
        nickName: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (value: string) => validator.isEmail(value),
                message: (props: any) => `Invalid email address: ${props.value}`,
            },
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: (value: string) => validator.isStrongPassword(value),
                message: (props: any) => `Enter a Strong Password: ${props.value}`,
            },
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
