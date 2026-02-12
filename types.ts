
export enum Category {
  INVESTING = 'Investing',
  SAVING = 'Saving',
  DEBT = 'Debt',
  BUDGETING = 'Budgeting',
  TAX = 'Tax'
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  excerpt: string;
  url: string;
  ticker?: string;
  history?: number[]; // 7 days of price points
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  amount: number;
}

export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
}
