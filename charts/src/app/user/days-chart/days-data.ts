export interface IDaily{
    data:Array<IData>;
}

export interface IData{
    date: Date;
    sales: number;
}

// export interface ISales{
//     type: Number;
// }