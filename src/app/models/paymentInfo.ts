export interface PaymentInfo{
    id:number;
    userFirstName:string;
    userLastName:string;
    userEmail:string;
    userAddress:string;
    boSaveInfo:boolean;
    boCreditType :boolean;
    boDebitType :boolean;
    boDebitCart :boolean;
    cardUserName :string;
    cardNumber:string;
    cardExpMonth :number;
    cardExpYear :number;
    cardCvv :number;
    userId :number;
}