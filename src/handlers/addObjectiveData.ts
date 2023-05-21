import { IAddObjectiveData } from '../events'
import { IIssuePRs, Issues, IIssue } from '../models/issues'

export const addObjectiveData = async (data: IAddObjectiveData) => {
    return new Promise(async (resolve, reject) => {
        const issue = await Issues.findOne({
            issue_account: data.objective_issue.toString(),
        })
        issue.issue_state = 'winner_declared'
        if (issue) {
            issue.issue_prs.push({
                issue_pr_account: data.objective_public_key.toString(),
                issue_pr_author: data.objective_issue.toString(),
                issue_pr_link: data.metadataUri,
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
