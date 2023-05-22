import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'

export interface INameRouterCreated {
    router_creator: PublicKey
    name_router_account: PublicKey
}

export interface IVerifiedUserAdded {
    router_creator: PublicKey,
    name_router_account: PublicKey,
    verified_user_account: PublicKey,
    user_name: String
}

export interface ICommitAdded {
    commit_creator: PublicKey,
    commit_account: PublicKey,
    issue_account: PublicKey,
    metadata_uri: String,
}

export interface IIssueCreated {
    issue_creator: PublicKey,
    issue_account: PublicKey,
    repository_account: PublicKey,
    issue_token_pool_account: PublicKey,
    rewards_mint: PublicKey,
    uri: String,
}

export interface IRepositoryCreated {
    repository_creator: PublicKey,
    repository_account: PublicKey,
    rewards_mint: PublicKey,
    uri: String,
    name: String,
    description: String,
}

export interface IIssueStaked {
    issue_staker: PublicKey,
    issue_staker_token_account: PublicKey,
    issue_account: PublicKey,
    staked_amount: number,
    rewards_mint: PublicKey,
    issue_contribution_link: String,
}

export interface ITokensClaimed {
    username: string
    repositoryAccount: PublicKey
}

export interface IPullRequestSent {
    sent_by: PublicKey,
    commits: Array<PublicKey>,
    metadata_uri: String,
}

export interface IAddCommitToPR {
    commit: PublicKey,
    by: PublicKey,
}


export interface IAddChildObjective {
    parent_account: PublicKey
    added_by: PublicKey
}

export interface IAddObjectiveDataEvent {
    objective_title: String,
    objective_metadata_uri: String,
    objective_start_unix: number,
    objective_creation_unix: number,

    // look into these 2 fields

    // objective_end_unix: Option<number>,
    // objective_deliverable: ObjectiveDeliverable,
    
    objective_public_key: PublicKey,
    objective_issue: PublicKey,
}

export interface IAddRoadmapDataEvent {
    roadmap_title: String,
    roadmap_description_link: String,
    roadmap_creation_unix: number,
    roadmap_creator: PublicKey,
}


export interface IIssueUnstaked {
    issue_staker: PublicKey,
    issue_staker_token_account: PublicKey,
    issueAccount: PublicKey,
    unstaked_amount: number,
    rewards_mint: PublicKey,
    issue_contribution_link: String
}

export interface IPullRequestAccepted {
    pull_request_addr: PublicKey,
    repository: PublicKey,
    repository_name: String,
    issue: PublicKey,
    repository_creator: PublicKey,
}


export interface IVestingScheduleChanged {
    repository_account: PublicKey,
    repository_creator: PublicKey,
    old_vesting_schedule: Array<String>,
    new_vesting_schedule: Array<String>,
}


export interface IDefaultVestingScheduleChanged {
    number_of_schedules: number,
    per_vesting_amount: number,
    unix_change: number
}

export interface IPullRequestStaked {
    pr_staker: PublicKey,
    pr_staker_token_account: PublicKey,
    pr_account: PublicKey,
    staked_amount: number,
    rewards_mint: PublicKey,
    pr_contribution_link: String,

}

export interface IPullRequestUnstaked {
    pr_staker: PublicKey,
    pr_staker_token_account: PublicKey,
    pr_account: PublicKey,
    staked_amount: number,
    rewards_mint: PublicKey,
    pr_contribution_link: String,
}