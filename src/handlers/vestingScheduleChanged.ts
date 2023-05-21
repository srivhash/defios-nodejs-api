import { IVestingScheduleChanged } from '../events'
import { IIssuePRs, Issues, IIssue } from '../models/issues'
import { Token } from '../models/token'

export const vestingScheduleChanged = async (commit: IVestingScheduleChanged) => {
    return new Promise(async (resolve, reject) => {
        const token_obj = await Token.findOne({
            token_creator_name: commit.repository_creator.toString(),
        })
        
        if (token_obj) {
            //modify the token object
            token_obj.token_creator_name = commit.repository_creator.toString()
            token_obj.token_repository_url = commit.repository_account.toString()
            
            token_obj.new_vesting_schedule= commit.new_vesting_schedule.toString()
            // token_obj.old_vesting_schedule= commit.old_vesting_schedule.toString()
            token_obj.save((err, token) => {
                if (err) {
                    reject(err)
                }
                resolve(token)
            })
        }
    })
}
