export interface Article{
    id? : number;
    name: string;
    code : string;
    descripcion : string
    amount : number;
    costPrice : number;
    sellPrice : number;
    minimum : number;
    imagen : string;
    negativeStock: boolean;
    offer : boolean;
    branch : object;
    articleType : object;
    createdat? : Date;
    updatedat? : Date;
}