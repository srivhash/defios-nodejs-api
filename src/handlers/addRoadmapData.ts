import { IAddRoadmapData } from '../events2'
import { IIssuePRs, Issues, IIssue } from '../models/issues'
// import{ } from '../models/roadmap'
export const addRoadmapData = async (commit: IAddRoadmapData) => {
    return new Promise(async (resolve, reject) => {
        const issue = await Issues.findOne({
            issue_account: commit.issueAccount.toString(),
        })
        issue.issue_state = 'winner_declared'
        if (issue) {
            issue.issue_prs.push({
                issue_pr_account: commit.roadmap_creator.toString(),
                issue_pr_author: commit.roadmap_creator.toString(),
                issue_pr_link: commit.roadmap_description_link,
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
