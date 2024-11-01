// Define a type for transaction categories, which can be one of the specified strings
export type TransactionCategory = 'groceries' | 'utilities' | 'rent' | 'salary' | 'other';

// Define a type for transaction types, which can either be 'income' or 'expense'
export type TransactionType = 'income' | 'expense';

// Define an interface representing a financial transaction
export interface Transaction {
  id: string; // Unique identifier for the transaction
  type: TransactionType; // The type of transaction (income or expense)
  category: TransactionCategory; // The category of the transaction (e.g., groceries, rent)
  amount: number; // The monetary amount of the transaction
  description: string; // A brief description of the transaction
  date: string; // The date of the transaction, typically in ISO format (e.g., 'YYYY-MM-DD')
  currency: string; // The currency in which the transaction is made (e.g., 'USD', 'EUR')
}

// Define an interface representing a budget for a specific category
export interface Budget {
  category: TransactionCategory; // The category for which the budget is set
  limit: number; // The maximum amount allowed to be spent in this category
  spent: number; // The amount that has been spent in this category so far
  currency: string; // The currency in which the budget is set
  alertThreshold: number; // The threshold amount for triggering an alert (e.g., a warning when approaching the limit)
}

// Define an interface representing a summary of the budget and transactions
export interface BudgetSummary {
  totalIncome: number; // The total income from all transactions
  totalExpenses: number; // The total expenses from all transactions
  balance: number; // The current balance calculated as total income minus total expenses
  budgets: Budget[]; // An array of budgets for different categories
  transactions: Transaction[]; // An array of transactions recorded
  currency: string; // The currency used for the budget summary (e.g., 'USD', 'EUR')
}