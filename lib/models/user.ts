import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    quizIds: [{
        quizId: { type: String },
        score: { type: String, default: "-1" },
        isAttempted: { type: Boolean, default: false }
    }],
})

const User = models.User || model('User', UserSchema);

export default User;