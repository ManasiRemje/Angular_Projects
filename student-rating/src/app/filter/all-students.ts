export interface IStudents {
    data: Array<IData>,
    error: string,
}

export interface IData {
    _id: string,
    name: string,
    email: string,
    age: number,

    assignedTrack: Array<IAssignedTracks>,
    ratings:  Array<IRatings>,
    role: Array<IRoles>,
    updationData: Array<IUpdationData>,
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
    proactiveness: number,
    createdAt: string,
    updatedAt: string
}

export interface IUpdationData {
    _id: string,
    logicalRating: number,
    communicationRating: number,
    assignmentRating: number,
    proactiveness: number,
    createdAt: string,
    updatedAt: string
}

export interface IRoles {
    id: string,
    role: string,
}

export interface ITracks {
    data: Array<ITrackData>;
}

export interface ITrackData {
    _id: string,
    track: string,
} 

export interface IFilter {
    track: string,
    rating: number,
}