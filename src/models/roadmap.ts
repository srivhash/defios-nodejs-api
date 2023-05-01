import mongoose from 'mongoose'

export interface Roadmap {
    roadmap_creator_gh: mongoose.Schema.Types.String
    roadmap_creator_gh_profile_url: mongoose.Schema.Types.String
    roadmap_cover_img_url: mongoose.Schema.Types.String
    roadmap_total_stake: mongoose.Schema.Types.Number
    roadmap_active_objectives: mongoose.Schema.Types.Number
    roadmap_outcome_types: Array<
        'Infrastructure' | 'Tooling' | 'Publication' | 'Product' | 'Other'
    >
    roadmap_objectives_list: RoadmapObjective[]
    roadmap_objectives_graph: Object
}

export interface RoadmapObjective {
    objective_title: mongoose.Schema.Types.String
    objective_creation_date: mongoose.Schema.Types.Date
    objective_creator_gh_name: mongoose.Schema.Types.String
    objective_creator_gh_profile_pic: mongoose.Schema.Types.String
    objective_deliverable:
        | 'Infrastructure'
        | 'Tooling'
        | 'Publication'
        | 'Product'
        | 'Other'
    objective_state: 'Locked' | 'InProgress' | 'Closed' | 'Deprecated'
    objective_start_date: mongoose.Schema.Types.Date
    objective_end_date: mongoose.Schema.Types.Date
}

export const RoadmapObjectiveSchema = new mongoose.Schema<RoadmapObjective>(
    {
        objective_title: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        objective_creation_date: {
            type: mongoose.Schema.Types.Date,
        },
        objective_creator_gh_name: {
            type: mongoose.Schema.Types.String,
        },
        objective_creator_gh_profile_pic: {
            type: mongoose.Schema.Types.String,
        },
        objective_deliverable: {
            type: mongoose.Schema.Types.String,
        },
        objective_state: {
            type: mongoose.Schema.Types.String,
        },
        objective_start_date: {
            type: mongoose.Schema.Types.Date,
        },
        objective_end_date: {
            type: mongoose.Schema.Types.Date,
        },
    },
    { versionKey: false }
)

export const RoadmapSchema = new mongoose.Schema<Roadmap>(
    {
        roadmap_creator_gh: {
            type: mongoose.Schema.Types.String,
        },
        roadmap_creator_gh_profile_url: {
            type: mongoose.Schema.Types.String,
        },
        roadmap_cover_img_url: {
            type: mongoose.Schema.Types.String,
        },
        roadmap_total_stake: {
            type: mongoose.Schema.Types.Number,
        },
        roadmap_active_objectives: {
            type: mongoose.Schema.Types.Number,
        },
        roadmap_outcome_types: {
            type: [mongoose.Schema.Types.String],
        },
        roadmap_objectives_list: {
            type: [RoadmapObjectiveSchema],
        },
        roadmap_objectives_graph: {
            type: Object,
        },
    },
    { versionKey: false }
)

export const Roadmap = mongoose.model<Roadmap>('Roadmap', RoadmapSchema)
