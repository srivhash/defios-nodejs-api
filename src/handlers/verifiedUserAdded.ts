import { IVerifiedUserAdded } from '../events'
import { User } from '../models/users'

export const addVerifiedUser = async (user: IVerifiedUserAdded) => {
    return new Promise((resolve, reject) => {
        try {
            const newUser = new User({
                user_github: user.userName,
                user_phantom_address: user.userPubkey.toString(),
            })
            newUser.save()
        } catch (err) {
            reject(err)
        }
    })
}
