import mongoose from 'mongoose'

export interface IIssue {
    issue_account: mongoose.Schema.Types.String
    issue_project_id: mongoose.Schema.Types.String
    issue_title: mongoose.Schema.Types.String
    issue_project_name: mongoose.Schema.Types.String
    issue_state: 'open' | 'voting' | 'winner_declared' | 'closed'
    issue_summary: mongoose.Schema.Types.String
    issue_gh_url: mongoose.Schema.Types.String
    issue_stake_amount: Number
    issue_stake_token_symbol: mongoose.Schema.Types.String
    issue_stake_token_url: mongoose.Schema.Types.String
    issue_prs: IIssuePRs[]
    issue_tags: mongoose.Schema.Types.Array
}

export interface IIssuePRs {
    issue_pr_account: string
    issue_pr_author: string
    issue_pr_link: string
    issue_originality_score: number
    issue_author_github: string
    issue_title: string
    issue_vote_amount: number
}

export const IssuePRsSchema = new mongoose.Schema<IIssuePRs>(
    {
        issue_pr_account: {
            type: mongoose.Schema.Types.String,
        },
        issue_pr_author: {
            type: mongoose.Schema.Types.String,
        },
        issue_pr_link: {
            type: mongoose.Schema.Types.String,
        },
        issue_originality_score: {
            type: mongoose.Schema.Types.Number,
        },
        issue_author_github: {
            type: mongoose.Schema.Types.String,
        },
        issue_title: {
            type: mongoose.Schema.Types.String,
        },
        issue_vote_amount: {
            type: mongoose.Schema.Types.Number,
        },
    },
    { versionKey: false, _id: false }
)

export const IssueSchema = new mongoose.Schema<IIssue>(
    {
        issue_account: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        issue_project_id: {
            type: mongoose.Schema.Types.String,
        },
        issue_title: {
            type: mongoose.Schema.Types.String,
        },
        issue_project_name: {
            type: mongoose.Schema.Types.String,
        },
        issue_state: {
            type: mongoose.Schema.Types.String,
        },
        issue_summary: {
            type: mongoose.Schema.Types.String,
        },
        issue_gh_url: {
            type: mongoose.Schema.Types.String,
        },
        issue_stake_amount: {
            type: mongoose.Schema.Types.Number,
        },
        issue_stake_token_symbol: {
            type: mongoose.Schema.Types.String,
        },
        issue_stake_token_url: {
            type: mongoose.Schema.Types.String,
        },
        issue_prs: {
            type: [IssuePRsSchema],
        },
        issue_tags: {
            type: [mongoose.Schema.Types.String],
        },
    },
    { versionKey: false }
)

export const Issues = mongoose.model('Issues', IssueSchema)
