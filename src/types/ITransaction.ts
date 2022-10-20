export interface ITransaction {
  id: string;
  userId: string;
  bankId: string;
  transactionDate: string;
  description: string;
  tag: string;
  category: string;
  type: string;
  amount: number;
  isReccurent: false;
  paymentType: string;
  createdAt: Date;
  updatedAt: Date;
  users: {
    name: string;
    email: string;
  };
  bankAccounts: {
    bankName: string;
    balance: number;
  };
}
