export interface ITracks {
    data: Array<IData>;
}

export interface IData {
    _id: string,
    track: string,
} 

export interface IGivenRating {
    name: string,
    age: number,
    email: string,
    logicalRating: number,
    communicationRating: number,
    assignmentRating: number,
    proactivenessRating: number,
    assignedTrack: string,
}