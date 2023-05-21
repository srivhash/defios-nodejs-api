import axios from 'axios'
import { IIssueCreated } from '../defios-nodejs-api/src/events'
import { Issues } from '../defios-nodejs-api/src/models/issues'
import { Project } from '../defios-nodejs-api/src/models/project'
import { Token } from '../defios-nodejs-api/src/models/token'
import { User } from '../defios-nodejs-api/src/models/users'
const config = require('config');

const token = process.env.GH_TOKEN as string
const github_token = config.github.api_key
console.log(github_token)
export const issueCreated = async (res: IIssueCreated) => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({
            user_phantom_address: res.issueCreator.toString(),
        })
        if (!user) {
            reject('User not found')
            return
        }
        const token = await Token.findOne({
            token_spl_addr: res.rewardsMint.toString(),
        })
        if (!token) {
            reject('Token not found')
            return
        }
        const project = await Project.findOne({
            project_account: res.repositoryAccount.toString(),
        })
        if (!project) {
            reject('Project not found')
            return
        }
        var config = {
            method: 'get',
            url: res.uri.replace(
                'https://github.com/',
                'https://api.github.com/repos/'
            ),
            headers: {
                Authorization: 'token '+github_token,
                'Content-Type': 'application/json',
            },
        }

        axios(config)
            .then((data) => {
                const issue = new Issues({
                    issue_account: res.issueAccount.toString(),
                    issue_author: res.issueCreator.toString(),
                    issue_title: data.data.title,
                    issue_summary: data.data.body,
                    issue_prs: [],
                    issue_vote_amount: 0,
                    issue_originality_score: 0,
                    issue_author_github: user.user_github,
                    issue_gh_url: res.uri,
                    issue_stake_amount: 0,
                    issue_stake_token_url: res.rewardsMint.toString(),
                    issue_project_id: res.repositoryAccount.toString(),
                    issue_stake_token_symbol: token.token_symbol,
                    issue_project_name: project.project_name,
                    issue_state: 'open',
                    // issue_tags: data.data.labels.map((label: any) => label.name),
                })
                issue.save((err, issue) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(issue)
                })
            })
            .catch((err) => {
                reject(err)
            })
    })
}
