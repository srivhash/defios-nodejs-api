import { IRepositoryCreated } from "../events";
import { Project } from "../models/project";
import { Token } from "../models/token";
import { User } from "../models/users";
import axios from "axios";
import { addUserClaimAccount } from "../..";

export const repositoryCreated = async (res: IRepositoryCreated) => {
    return new Promise(async (resolve, reject) => {
        const tokenAddress = res.rewardsMint
        // setTimeout(async () => {
        //     const token = await Token.findOne({ token_spl_addr: tokenAddress.toBase58() })
        //     const tokenInfo = await axios.get(`https://api.solscan.io/account?address=${tokenAddress.toBase58()}&cluster=devnet`)
        //     token.token_symbol = tokenInfo.data.data.metadata.data.symbol
        //     token.token_name = tokenInfo.data.data.metadata.data.name
        //     token.token_image_url = tokenInfo.data.data.metadata.data.uri
        //     token.save((err: any, token: any) => {
        //         if (err) {
        //             reject(err);
        //         }
        //     })
        // }, 60000)
        res.ghUsernames.forEach((username, i) => {
            try {
                console.log('Adding user claim', username, res.claimAmounts[i]);
                addUserClaimAccount(username, res.repositoryAccount, res.claimAmounts[i]);
            } catch (e) {
                console.log(e);
            }
        });
        const token = new Token({
            token_spl_addr: tokenAddress.toBase58(),
            token_symbol: res.tokenSymbol,
            token_name: res.tokenName,
            token_image_url: res.tokenUri,
        })
        token.save((err: any, token: any) => {
            if (err) {
                reject(err);
            }
        })
        const user = await User.findOne({ user_phantom_address: res.repositoryCreator.toString() })
        if (!user) {
            reject("User not found");
            return
        }
        const project = new Project({
            project_account: res.repositoryAccount.toString(),
            project_name: res.name,
            num_contributions: 0,
            num_contributions_chg_perc: 0,
            num_open_issues: 0,
            community_health: 0,
            project_repo_link: res.uri,
            project_token: token._id,
            project_owner_github: user.user_github,
            claimers_pending: res.ghUsernames
        })
        project.save((err: any, project: unknown) => {
            if (err) {
                reject(err);
            }
            resolve(project);
        })
    })
}