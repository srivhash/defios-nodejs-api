import { ICommitAdded } from '../events'
import { IIssuePRs, Issues, IIssue } from '../models/issues'

import axios from 'axios'
const config = require('config')

const token = process.env.GH_TOKEN as string
const github_token = config.github.api_key

export const commitCreated = async (commit: ICommitAdded) => {
    await Issues.findOne({
        issue_account: commit.issueAccount.toString(),
    })
        .then((issue) => {
            if (issue) {
                var config = {
                    method: 'get',
                    url: issue.issue_gh_url
                        .toString()
                        .replace(
                            'https://github.com/',
                            'https://api.github.com/repos/'
                        ),
                    headers: {
                        Authorization: 'token ' + github_token,
                        'Content-Type': 'application/json',
                    },
                }
                axios(config)
                    .then((res) => {
                        issue.issue_prs.push({
                            issue_pr_account: commit.commitCreator.toString(),
                            issue_pr_author: commit.commitAccount.toString(),
                            issue_pr_link: commit.metadataUri,
                            issue_originality_score: 0,
                            issue_author_github: res.data.user.id,
                            issue_title: res.data.title,
                            issue_vote_amount: 0,
                        })
                        issue.save()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
        .catch((err) => console.log(err))
}
