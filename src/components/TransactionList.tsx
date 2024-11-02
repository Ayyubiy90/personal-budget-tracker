// Importing React and useState hook for managing component state
import React, { useState } from "react";

// Importing useBudget hook to access transactions from the budget context
import { useBudget } from "../context/BudgetContext";

// Importing utility function to format currency amounts
import { formatAmount } from "../utils/currency";

// Importing Transaction type for type safety
import { Transaction } from "../types/budgets";

// Importing format function from date-fns for formatting dates
import { format } from "date-fns";

// Importing icons from lucide-react for visual representation of transaction types
import { Search, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Defining the TransactionList component as a functional React component
const TransactionList: React.FC = () => {
  // Destructuring the transactions array from the useBudget hook
  const { transactions } = useBudget();

  // State to manage the search term input by the user
  const [searchTerm, setSearchTerm] = useState("");

  // State to manage the selected filter for transaction type
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  // Filtering transactions based on the search term and selected filter
  const filteredTransactions = transactions
    .filter((transaction: Transaction) => {
      // Check if the transaction description or category includes the search term (case insensitive)
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      // Check if the transaction matches the selected filter
      const matchesFilter = filter === "all" || transaction.type === filter;
      // Return true if both search and filter conditions are met
      return matchesSearch && matchesFilter;
    })
    // Sorting transactions by date in descending order
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Returning the JSX for rendering the transaction list
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Transactions
        </h2>
        {/* Search input for filtering transactions */}
        <div className="flex space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "income" | "expense")
            }>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </div>
      </div>

      {/* Table to display filtered transactions */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b dark:border-gray-700">
              <th className="pb-3 text-gray-600 dark:text-gray-300">Date</th>
              <th className="pb-3 text-gray-600 dark:text-gray-300">Type</th>
              <th className=" pb-3 text-gray-600 dark:text-gray-300">
                Category
              </th>
              <th className="pb-3 text-gray-600 dark:text-gray-300">
                Description 
              </th>
              <th className="pb-3 text-gray-600 dark:text-gray-300 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b dark:border-gray-700">
                  <td className="py-4 text-gray-900 dark:text-gray-100">
                    {format(new Date(transaction.date), "MMM d, yyyy")}
                  </td>
                  <td className="py-4">
                    {transaction.type === "income" ? (
                      <span className="flex items-center text-green-500">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        Income
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        Expense
                      </span>
                    )}
                  </td>
                  <td className="py-4 capitalize text-gray-900 dark:text-gray-100">
                    {transaction.category}
                  </td>
                  <td className="py-4 text-gray-900 dark:text-gray-100">
                    {transaction.description}
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={
                        transaction.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }>
                      {formatAmount(
                        transaction.amount || 0,
                        transaction.currency
                      )}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 text-center text-gray-600 dark:text-gray-300">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Exporting the TransactionList component
export default TransactionList;
