import { ITokensClaimed } from '../events'
import { Project } from '../models/project'

export const tokensClaimed = async (res: ITokensClaimed) => {
    return new Promise(async (resolve, reject) => {
        try {
            const project = await Project.findOne({
                project_account: res.repositoryAccount.toString(),
            })
            const arr = project.claimers_pending
            var index = arr.indexOf(res.username)
            if (index !== -1) {
                arr.splice(index, 1)
            }
            project.claimers_pending = arr
            project.save()
        } catch (err) {
            reject(err)
        }
    })
}
