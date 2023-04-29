import { IVerifiedUserAdded } from "../events";
import { User } from "../models/users"

export const addVerifiedUser = async (user: IVerifiedUserAdded) => {
    return new Promise((resolve, reject) => {
        const newUser = new User({
            user_github: user.userName,
            user_phantom_address: user.userPubkey.toString(),
        })
        newUser.save((err, user) => {
            if (err) {
                reject(err);
            }
            resolve(user);
        });
    })
}