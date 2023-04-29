import { PublicKey } from "@solana/web3.js"
import { BN } from "@project-serum/anchor"

export interface INameRouterCreated {
    routerCreator: PublicKey,
    nameRouterAccount: PublicKey,
}

export interface IVerifiedUserAdded {
    routerCreator: PublicKey,
    nameRouterAccount: PublicKey,
    verifiedUserAccount: PublicKey,
    userName: string,
    userPubkey: PublicKey,
}

export interface ICommitAdded {
    commitCreator: PublicKey,
    commitAccount: PublicKey,
    issueAccount: PublicKey,
    metadataUri: string,
}

export interface IIssueCreated {
    issueCreator: PublicKey,
    issueAccount: PublicKey,
    repositoryAccount: PublicKey,
    issueTokenPoolAccount: PublicKey,
    rewardsMint: PublicKey,
    uri: String,
}

export interface IRepositoryCreated {
    repositoryCreator: PublicKey,
    repositoryAccount: PublicKey,
    rewardsMint: PublicKey,
    uri: string,
    name: string,
    description: string,
    ghUsernames: string[],
    claimAmounts: BN[],
    tokenName: String,
    tokenSymbol: String,
    tokenUri: String,
}

export interface IIssueStaked {
    issueStaker: PublicKey,
    issueStakerTokenAccount: PublicKey,
    issueAccount: PublicKey,
    stakedAmount: number,
    rewardsMint: PublicKey,
}

export interface ITokensClaimed {
    username: string,
    repositoryAccount: PublicKey,
}