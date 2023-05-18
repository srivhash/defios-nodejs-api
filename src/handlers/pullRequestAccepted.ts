import { IPullRequestAccepted } from '../events2'
import { IIssuePRs, Issues, IIssue } from '../models/issues'

export const pullRequestAccepted = async (commit: IPullRequestAccepted) => {
    return new Promise(async (resolve, reject) => {
        const issue = await Issues.findOne({
            issue_account: commit.issue.toString(),
        })
        issue.issue_state = 'winner_declared'
        if (issue) {
            issue.issue_prs.push({
                issue_pr_account: commit.pull_request_addr.toString(),
                issue_pr_author: commit.pull_request_addr.toString(),
                issue_pr_link: commit.repository,
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
