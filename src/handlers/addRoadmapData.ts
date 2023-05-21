import { IAddRoadmapData } from '../events'
import { IIssuePRs, Issues, IIssue } from '../models/issues'
import {Roadmap} from '../models/roadmap'
import { DateTime } from 'luxon'

export const addRoadmapData = async (commit: IAddRoadmapData) => {
    return new Promise(async (resolve, reject) => {

        const roadmap_obj = await Roadmap.findOne({
            roadmap_title: commit.roadmap_title.toString(),
        })
        
        if (roadmap_obj) {
            //modify roadmap_obj
            roadmap_obj.roadmap_objectives_list.push({
                objective_title: commit.roadmap_title.toString(),
                objective_creation_date: DateTime.now().toString(),
                objective_creator_gh_name: commit.roadmap_creator.toString(),
                // objective_creator_gh_profile_pic: commit.roadmap_objective_creator_gh_profile_pic.toString(),
                // objective_deliverable: commit.roadmap_objective_deliverable.toString(),
                // objective_state: commit.roadmap_objective_state.toString(),
                objective_start_date: DateTime.now().toString(),
                // objective_end_date: commit.roadmap_objective_end_date,
            })
            roadmap_obj.save((err, issue) => {
                if (err) {
                    reject(err)
                }
                resolve(issue)
            })
        }
    })
}
