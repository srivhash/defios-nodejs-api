import * as anchor from '@project-serum/anchor';
import { Defios } from "../type-file/defios"
import { ICommitAdded, IIssueCreated, IIssueStaked, INameRouterCreated, IRepositoryCreated, ITokensClaimed, IVerifiedUserAdded } from "./events"
import { commitCreated } from './handlers/commitCreated';
import { issueCreated } from './handlers/issueCreated';
import { issueStaked } from './handlers/issueStaked';
import { issueUnstaked } from './handlers/issueUnstaked';
import { repositoryCreated } from './handlers/repositoryCreated';
import { addVerifiedUser } from './handlers/verifiedUserAdded';
import { tokensClaimed } from './handlers/tokensClaimed';

export const addEventListener = (program: anchor.Program<Defios>) => {
    program.addEventListener("NameRouterCreated", (res: INameRouterCreated) => {
        console.log("Router created!");
        console.log(res);
    });


    program.addEventListener("VerifiedUserAdded", (res: IVerifiedUserAdded) => {
        addVerifiedUser(res).then(() => {
            console.log("VerifiedUserAdded");
        }).catch(e => {
            console.log("Error Adding User: ", e);
        })
    });

    program.addEventListener("CommitAdded", (res: ICommitAdded) => {
        commitCreated(res).then(() => {
            console.log("CommitAdded");
        }).catch(e => {
            console.log("Error Adding Commit: ", e);
        })
    });

    program.addEventListener("IssueCreated", (res: IIssueCreated) => {
        issueCreated(res).then(() => {
            console.log("IssueCreated");
        }).catch(e => {
            console.log("Error Adding Issue: ", e);
        })
    });

    program.addEventListener("RepositoryCreated", (res: IRepositoryCreated) => {
        repositoryCreated(res).then(() => {
            console.log("IssueCreated");
        }).catch(e => {
            console.log("Error Adding Repo: ", e);
        })
    });

    program.addEventListener("IssueStaked", (res: IIssueStaked) => {
        issueStaked(res).then(() => {
            console.log("IssueStaked");
        }).catch(e => {
            console.log("Error Adding Stake: ", e);
        })
    });

    program.addEventListener("IssueUnstaked", (res: IIssueStaked) => {
        issueUnstaked(res).then(() => {
            console.log("IssueUnstaked");
        }).catch(e => {
            console.log("Error Adding Stake: ", e);
        })
    });

    program.addEventListener("TokensClaimed", (res: ITokensClaimed) => {
        tokensClaimed(res).then(() => {
            console.log("ClaimedTokens");
        }).catch(e => {
            console.log("Error Adding claim token: ", e);
        })
    });

    console.log("Listeners Added")
}