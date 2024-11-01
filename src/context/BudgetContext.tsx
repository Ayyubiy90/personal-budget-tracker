// Import necessary React hooks and context API
import React, { createContext, useContext, useState, useEffect } from "react";
// Import types for transactions, budgets, budget summary, and transaction categories
import {
  Transaction,
  Budget,
  BudgetSummary,
  TransactionCategory,
} from "../types/budget";

// Define the shape of the context data for the budget management
interface BudgetContextType {
  transactions: Transaction[]; // Array of transaction objects
  addTransaction: (transaction: Omit<Transaction, "id">) => void; // Function to add a new transaction
  deleteTransaction: (id: string) => void; // Function to delete a transaction by ID
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void; // Function to update an existing transaction
  budgets: Budget[]; // Array of budget objects
  updateBudget: (
    category: TransactionCategory,
    budget: Partial<Budget>
  ) => void; // Function to update a budget
  summary: BudgetSummary; // Summary of budget data
}

// Default budgets to be used if no budgets are found in localStorage
const defaultBudgets: Budget[] = [
  {
    category: "groceries",
    limit: 500,
    spent: 0,
    currency: "USD",
    alertThreshold: 80,
  },
  {
    category: "utilities",
    limit: 300,
    spent: 0,
    currency: "USD",
    alertThreshold: 80,
  },
  {
    category: "rent",
    limit: 1500,
    spent: 0,
    currency: "USD",
    alertThreshold: 90,
  },
  {
    category: "other",
    limit: 400,
    spent: 0,
    currency: "USD",
    alertThreshold: 80,
  },
];

// Create a context for the budget data, initially undefined
const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

// BudgetProvider component to wrap around parts of the application that need access to budget data
export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to hold transactions and budgets
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>(defaultBudgets);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions"); // Get saved transactions
    const savedBudgets = localStorage.getItem("budgets"); // Get saved budgets

    // If saved transactions exist, parse and set them in state
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    // If saved budgets exist, parse and set them; otherwise, use default budgets
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    } else {
      setBudgets(defaultBudgets);
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Save budgets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  // Calculate the total spent for each budget category whenever transactions change
  useEffect(() => {
    const spentByCategory = transactions.reduce((acc, transaction) => {
      if (transaction.type === "expense") {
        acc[transaction.category] =
          (acc[transaction.category] || 0) + transaction.amount; // Sum expenses by category
      }
      return acc; // Return the accumulated value
    }, {} as Record<TransactionCategory, number>);

    // Update budgets with the spent amount for each category
    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) => ({
        ...budget,
        spent: spentByCategory[budget.category] || 0, // Set spent amount or 0 if not found
      }))
    );
  }, [transactions]);

  // Function to add a new transaction
  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(), // Generate a unique ID for the new transaction
    };
    setTransactions((prev) => [...prev, newTransaction]); // Update the state with the new transaction
  };

  // Function to delete a transaction by its ID
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id)); // Filter out the transaction with the given ID
  };

  // Function to update an existing transaction
  const updateTransaction = (id: string, transaction: Partial<Transaction>) => {
    setTransactions(
      (prev) => prev.map((t) => (t.id === id ? { ...t, ...transaction } : t)) // Update the transaction with the given ID
    );
  };

  // Function to update a budget
  const updateBudget = (
    category: TransactionCategory,
    budget: Partial<Budget>
  ) => {
    setBudgets((prev) => {
      const existing = prev.find((b) => b.category === category); // Find the budget for the given category
      if (existing) {
        return prev.map(
          (b) => (b.category === category ? { ...b, ...budget } : b) // Update the budget if found
        );
      }
      return [...prev, { category, ...budget } as Budget]; // Add a new budget if not found
    });
  };

  // Calculate the budget summary
  const summary: BudgetSummary = {
    totalIncome: transactions // Calculate total income
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + (t.amount || 0), 0),
    totalExpenses: transactions // Calculate total expenses
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + (t.amount || 0), 0),
    balance: 0, // Initialize balance to 0
    budgets, // Include budgets in the summary
    transactions, // Include transactions in the summary
    currency: "USD", // Set the currency to USD
  };

  // Calculate the balance by subtracting total expenses from total income
  summary.balance = summary.totalIncome - summary.totalExpenses;

  // Create the context value with all the necessary data and functions
  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    budgets,
    updateBudget,
    summary,
  };

  // Return the BudgetContext Provider with the context value
  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};

// Hook to access the budget context
export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};

// Export the BudgetContext
export default BudgetContext;
