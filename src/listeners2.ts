import * as anchor from '@project-serum/anchor'
import { Defios } from './defios'
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

import {addObjectiveData}   from './handlers2/addObjectiveData'
import {addRoadmapData}     from './handlers2/addRoadmapData'
import {addChildObjective}  from './handlers2/addChildObjective'
import {addCommitToPR}      from './handlers2/addCommitToPR'
import {pullRequestSent}    from './handlers2/pullRequestSent'
import {pullRequestAccepted} from './handlers2/pullRequestAccepted'
import {vestingScheduleChanged} from './handlers2/vestingScheduleChanged'
import {issueUnstaked} from './handlers2/issueUnstaked'

export const addEventListener = (program: anchor.Program<Defios>) => {

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

    program.addEventListener('IssueUnstaked', (res: IIssueUnstaked) => {
        issueUnstaked(res)
            .then(() => {
                console.log('IssueUnstaked')
            })
            .catch((e) => {
                console.log('Error Issuing Unstaked Tokens: ', e)
            })
    })

    
    console.log('Listeners Added')
}