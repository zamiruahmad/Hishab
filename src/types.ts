export interface Transaction {
  id: string;
  type: 'expense' | 'income' | 'dena' | 'paona' | 'repayment' | 'joma' | 'invest' | 'transfer';
  txName?: string;
  amount: number;
  category: string;
  subCategory?: string;
  account: string;
  accountIcon?: string;
  accountColor?: string;
  accountImage?: string;
  toAccount?: string;
  toAccountIcon?: string;
  toAccountColor?: string;
  toAccountImage?: string;
  person?: string;
  date: string;
  time: string;
  notes?: string;
  location?: string;
  receipt?: string | null;
  icon?: string;
  color?: string;
  image?: string;
  addToIncome?: boolean;
  addToExpense?: boolean;
  linkedTxId?: string;
  repaymentType?: string;
  status?: string;
}

export interface SummaryData {
  totalBalance: number;
  income: number;
  expense: number;
  receivable: number;
  payable: number;
  savings: number;
}

export interface WorkspaceMember {
  id: string;
  name: string;
  avatar: string;
}

export interface SharedExpense {
  id: string;
  paidBy: string; // memberId
  amount: number;
  description: string;
  date: string;
  splitWith: string[]; // memberIds
}

export interface Workspace {
  id: string;
  title: string;
  members: WorkspaceMember[];
  expenses: SharedExpense[];
}
