import mongoose from "mongoose";

export interface IContribution {    
    contribution_type: "inbound" | "outbound",
    contributor_github: mongoose.Schema.Types.String,
    contribution_link: mongoose.Schema.Types.String,
    contribution_timestamp: mongoose.Schema.Types.Date,
    contributor_project_id: mongoose.Schema.Types.String,
    contribution_amt: mongoose.Schema.Types.Number,
    contribution_token_symbol: mongoose.Schema.Types.String,
    contribution_token_icon: mongoose.Schema.Types.String,
}

export const ContributionSchema = new mongoose.Schema<IContribution>({
    contribution_type: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    contributor_github: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    contribution_link: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    contribution_timestamp: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    contributor_project_id: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    contribution_amt: {
        type: mongoose.Schema.Types.Number,
    },
    contribution_token_symbol: {
        type: mongoose.Schema.Types.String,
    },
    contribution_token_icon: {
        type: mongoose.Schema.Types.String,
    },
}, { versionKey: false });

export interface IUser {
    user_github: mongoose.Schema.Types.String,
    user_phantom_address: mongoose.Schema.Types.String,
    user_fb_uid: mongoose.Schema.Types.String,
    user_gh_name: mongoose.Schema.Types.String,
    user_profile_pic: mongoose.Schema.Types.String,
    user_contributions: IContribution[],
}

export const UserSchema = new mongoose.Schema<IUser>({
    user_github: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    user_phantom_address: {
        type: mongoose.Schema.Types.String,
    },
    user_fb_uid: {
        type: mongoose.Schema.Types.String,
    },
    user_gh_name: {
        type: mongoose.Schema.Types.String,
    },
    user_profile_pic: {
        type: mongoose.Schema.Types.String,
    },
    user_contributions: {
        type: [ContributionSchema],
    },
}, { versionKey: false });

export const User = mongoose.model<IUser>("Users", UserSchema);
export const Contribution = mongoose.model<IContribution>("Contributions", ContributionSchema);