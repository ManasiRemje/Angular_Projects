export interface ITrainer {
    name: string,
    age: number
    email: string,
    password: string,
    assignedTrack: string,
}

export interface ITrack {
    name: string,
}

export interface ITracks {
    data: Array<IData>;
}

export interface IData {
    _id: string,
    track: string,
} 