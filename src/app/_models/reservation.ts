export interface Reservation {
    id?: Number;
    subject: string;
    startDate: Date;
    endDate: Date;
    reservationType?: Number;
    recurringData?: string;
    noOfPlayers: Number;
    approval?: Number;
}
