import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'

export interface IPullRequestSent {
    pullSender: PublicKey
    commits: PublicKey
    metadataUri: string
}

export interface IAddCommitToPR {
    commitCreator: PublicKey
    commitAccount: PublicKey
    issueAccount: PublicKey
    metadataUri: string
    // objective_start_unix: u64,
    // objective_creation_unix: u64,
    // objective_end_unix: u64,
    // objective_deliverable: ObjectiveDeliverable,
}


export interface IAddChildObjective {
    parent_account: PublicKey
    added_by: PublicKey
}

export interface IAddObjectiveData {
    objective_title: String,
    metadataUri: String,
    objective_public_key: PublicKey,
    objective_issue: PublicKey,
}

export interface IAddRoadmapData {
    roadmap_title: String,
    roadmap_description_link: String,
    roadmap_creator: PublicKey,
    issueAccount: PublicKey
}


export interface IIssueUnstaked {
    issue_staker: PublicKey
    issue_staker_token_account: PublicKey
    issueAccount: PublicKey
    unstaked_amount: number
    rewards_mint: PublicKey
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
}

