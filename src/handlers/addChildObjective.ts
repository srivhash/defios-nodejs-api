import { IAddChildObjective } from '../events2'
import { IIssuePRs, Issues, IIssue } from '../models/issues'

export const addChildObjective = async (child: IAddChildObjective) => {
    return new Promise(async (resolve, reject) => {
        const issue = await Issues.findOne({
            issue_account: child.parent_account.toString(),
        })
        issue.issue_state = 'winner_declared'
        if (issue) {
            issue.issue_prs.push({
                issue_pr_account: child.parent_account.toString(),
                issue_pr_author: child.added_by.toString(),
                // issue_pr_link: child.metadataUri,
                // issue_originality_score: 0,
                // issue_author_github: '',
                // issue_title: '',
                // issue_vote_amount: 0,
            })
            issue.save((err, issue) => {
                if (err) {
                    reject(err)
                }
                resolve(issue)
            })
        }
    })
}
