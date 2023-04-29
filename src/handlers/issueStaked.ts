import { IIssueStaked } from "../events";
import { Issue } from "../models/issues";
import { Project } from "../models/project";
import { Contribution, User } from "../models/users";


export const issueStaked = async (res: IIssueStaked) => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ user_phantom_address: res.issueStaker.toString() })
        if (!user) {
            reject("User not found");
            return
        }
        const issue = await Issue.findOne({ issue_account: res.issueAccount.toString() })
        if (!issue) {
            reject("issue not found");
            return
        }
        issue.issue_stake_amount = parseInt(res.stakedAmount.toString()) + parseInt(issue.issue_stake_amount.toString());
        issue.save()
        const contribution = new Contribution({
            contributor_github: user.user_github,
            contribution_link: "", // TODO: Add link to contribution
            contribution_timestamp: new Date(),
            contribution_amt: res.stakedAmount,
            contribution_token_symbol: issue.issue_stake_token_symbol,
            contribution_token_url: issue.issue_stake_token_url,
            contribution_type: "inbound",
        })
        user.user_contributions.push(contribution)
        user.save((err, user) => {
            if (err) {
                reject(err);
            }
            resolve(user);
        })
    })
}