export interface IHistory {
    data: IHistoryData,
    error: string,
}

export interface IHistoryData {
    name: string,
    email: string,
    age: number,
    assignedTrack: Array<IAssignedTracks>,
    ratingHistory: Array<IRatings>,
}

export interface IAssignedTracks {
    _id: string,
    track: string
}

export interface IRatings {
    _id: string,
    logicalRating: number,
    communicationRating: number,
    assignmentRating: number,
    proactivenessRating: number,
    createdAt: string,
    updatedAt: string,
}