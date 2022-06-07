export interface IActivity {
    _id?: string,
    category: string,
    title: string
    subCycleNumber: number,
    isOptional: boolean,
    createdAt?: Date,
    updatedAt?: Date
};