import * as anchor from '@project-serum/anchor'
import { Defios } from './defios'
import {
    ICommitAdded,
    IIssueCreated,
    IIssueStaked,
    INameRouterCreated,
    IRepositoryCreated,
    ITokensClaimed,
    IVerifiedUserAdded,
} from './events'

import{
    IAddObjectiveData,
    IAddRoadmapData,
    IAddChildObjective,
    IPullRequestSent,
    IAddCommitToPR,
    IPullRequestAccepted,
    IVestingScheduleChanged,
    IIssueUnstaked,
} from './events2'

import { commitCreated } from './handlers/commitCreated'
import { issueCreated } from './handlers/issueCreated'
import { issueStaked } from './handlers/issueStaked'
import { issueUnstaked } from './handlers/issueUnstaked'
import { repositoryCreated } from './handlers/repositoryCreated'
import { addVerifiedUser } from './handlers/verifiedUserAdded'
import { tokensClaimed } from './handlers/tokensClaimed'

import {addObjectiveData}   from './handlers/addObjectiveData'
import {addRoadmapData}     from './handlers/addRoadmapData'
import {addChildObjective}  from './handlers/addChildObjective'
import {addCommitToPR}      from './handlers/addCommitToPR'
import {pullRequestSent}    from './handlers/pullRequestSent'
import {pullRequestAccepted} from './handlers/pullRequestAccepted'
import {vestingScheduleChanged} from './handlers/vestingScheduleChanged'
// import {issueUnstaked} from './handlers2/issueUnstaked'

export const addEventListener = (program: anchor.Program<Defios>) => {
    program.addEventListener('NameRouterCreated', (res: INameRouterCreated) => {
        console.log('Router created!')
        console.log(res)
    })

    program.addEventListener('VerifiedUserAdded', (res: IVerifiedUserAdded) => {
        addVerifiedUser(res)
            .then(() => {
                console.log('VerifiedUserAdded')
            })
            .catch((e) => {
                console.log('Error Adding User: ', e)
            })
    })

    program.addEventListener('CommitAdded', (res: ICommitAdded) => {
        commitCreated(res)
            .then(() => {
                console.log('CommitAdded')
            })
            .catch((e) => {
                console.log('Error Adding Commit: ', e)
            })
    })

    program.addEventListener('IssueCreated', (res: IIssueCreated) => {
        issueCreated(res)
            .then(() => {
                console.log('IssueCreated')
            })
            .catch((e) => {
                console.log('Error Adding Issue: ', e)
            })
    })

    program.addEventListener('RepositoryCreated', (res: IRepositoryCreated) => {
        repositoryCreated(res)
            .then(() => {
                console.log('IssueCreated')
            })
            .catch((e) => {
                console.log('Error Adding Repo: ', e)
            })
    })

    program.addEventListener('IssueStaked', (res: IIssueStaked) => {
        issueStaked(res)
            .then(() => {
                console.log('IssueStaked')
            })
            .catch((e) => {
                console.log('Error Adding Stake: ', e)
            })
    })

    program.addEventListener('IssueUnstaked', (res: IIssueStaked) => {
        issueUnstaked(res)
            .then(() => {
                console.log('IssueUnstaked')
            })
            .catch((e) => {
                console.log('Error Adding Stake: ', e)
            })
    })

    program.addEventListener('TokensClaimed', (res: ITokensClaimed) => {
        tokensClaimed(res)
            .then(() => {
                console.log('ClaimedTokens')
            })
            .catch((e) => {
                console.log('Error Adding claim token: ', e)
            })
    })

    //New Listeners 
    program.addEventListener('ObjectiveDataAdded', (res: IAddObjectiveData) => {
        addObjectiveData(res)
            .then(() => {
                console.log('ObjectiveDataAdded')
            })
            .catch((e) => {
                console.log('Error Adding Objective Data: ', e)
            })
    })
    

    program.addEventListener('RoadmapDataAdded', (res: IAddRoadmapData) => {
        addRoadmapData(res)
            .then(() => {
                console.log('RoadmapDataAdded')
            })
            .catch((e) => {
                console.log('Error Adding Roadmap Data: ', e)
            })
    })

    program.addEventListener('ChildObjectiveAdded', (res: IAddChildObjective) => {
        addChildObjective(res)
            .then(() => {   
                console.log('ChildObjectiveAdded')
            })
            .catch((e) => {
                console.log('Error Adding Child Objective: ', e)
            })
    })

    program.addEventListener('PullRequestSent', (res: IPullRequestSent) => {
        pullRequestSent(res)
            .then(() => {
                console.log('PullRequestSent')
            })
            .catch((e) => {
                console.log('Error Adding Pull Request: ', e)

            })
    })

    program.addEventListener('CommitAddedToPullRequest', (res: IAddCommitToPR) => {
        addCommitToPR(res)
            .then(() => {
                console.log('CommitAddedToPullRequest')
            })
            .catch((e) => {
                console.log('Error Adding Commit to Pull Request: ', e)
            })
    })

    program.addEventListener('PullRequestAccepted', (res: IPullRequestAccepted) => {
        pullRequestAccepted(res)

            .then(() => {
                console.log('PullRequestAccepted')
            })
            .catch((e) => {
                console.log('Error Accepting Pull Request: ', e)
            })
    })

    program.addEventListener('VestingScheduleChanged', (res: IVestingScheduleChanged) => {
        vestingScheduleChanged(res)
            .then(() => {
                console.log('VestingScheduleChanged')
            })
            .catch((e) => {
                console.log('Error Changing Vesting Schedule: ', e)
            })

    })

    console.log('Listeners Added')
}