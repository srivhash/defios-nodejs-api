import { ICommitAdded } from "../events";
import { IIssuePRs, Issue, IIssue } from "../models/issues"

export const commitCreated = async (commit: ICommitAdded) => {
    return new Promise(async (resolve, reject) => {
        const issue = await Issue.findOne({ issue_account: commit.issueAccount.toString() })
        issue.issue_state = 'winner_declared'
        if (issue) {
            issue.issue_prs.push({
                issue_pr_account: commit.commitCreator.toString(),
                issue_pr_author: commit.commitAccount.toString(),
                issue_pr_link: commit.metadataUri,
                issue_originality_score: 0,
                issue_author_github: "",
                issue_title: "",
                issue_vote_amount: 0,
            });
            issue.save((err, issue) => {
                if (err) {
                    reject(err);
                }
                resolve(issue);
            })
        }
    })
}