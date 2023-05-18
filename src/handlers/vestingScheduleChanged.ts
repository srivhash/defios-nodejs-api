import { IVestingScheduleChanged } from '../events2'
import { IIssuePRs, Issues, IIssue } from '../models/issues'

export const vestingScheduleChanged = async (commit: IVestingScheduleChanged) => {
    return new Promise(async (resolve, reject) => {
        const issue = await Issues.findOne({
            issue_account: commit.repository_account.toString(),
        })
        issue.issue_state = 'winner_declared'
        if (issue) {
            issue.issue_prs.push({
                issue_pr_account: commit.repository_creator.toString(),
                issue_pr_author: commit.repository_creator.toString(),
                issue_pr_link: '',
                issue_originality_score: 0,
                issue_author_github: '',
                issue_title: '',
                issue_vote_amount: 0,
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
