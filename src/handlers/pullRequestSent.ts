import { IPullRequestSent } from '../events'
import { IIssuePRs, Issues, IIssue } from '../models/issues'
import { User } from '../models/users'

export const pullRequestSent = async (commit: IPullRequestSent) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                user_phantom_address: commit.sent_by.toString(),
            })

            if (user) {
                user.Contributions.push({
                    contribution_type: 'Pull Request',
                    contribution_link: commit.commits.toString(),
                    contribution_amount: 0,
                    contribution_token: '',
                    contribution_project: '',
                    contribution_issue: '',
                })
                user.save()
            }
        } catch (err) {
            reject(err);
        }
    })
}