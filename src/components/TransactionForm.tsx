// Importing React library for building the user interface
import React from "react";

// Importing useForm hook from react-hook-form for managing form state and validation
import { useForm } from "react-hook-form";

// Importing the useBudget hook to access budget-related functions such as adding transactions
import { useBudget } from "../context/BudgetContext";

// Importing the TransactionCategory type for type safety in the form data
import { TransactionCategory } from "../types/budget";

// Defining the shape of the data that will be collected from the transaction form
interface TransactionFormData {
  type: "income" | "expense"; // Type of transaction: income or expense
  category: TransactionCategory; // Category of the transaction
  amount: number; // Amount of the transaction
  description: string; // Description of the transaction
  date: string; // Date of the transaction
}

// Defining the TransactionForm component as a functional React component
const TransactionForm: React.FC = () => {
  // Destructuring the addTransaction function from the useBudget hook
  const { addTransaction } = useBudget();

  // Using the useForm hook to manage the form state and validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    // Setting default values for the form fields
    defaultValues: {
      type: "expense", // Default transaction type is 'expense'
      category: "other", // Default category is 'other'
      date: new Date().toISOString().split("T")[0], // Default date is today's date in YYYY-MM-DD format
    },
  });

  // Function to handle form submission
  const onSubmit = (data: TransactionFormData) => {
    // Adding the transaction using the addTransaction function
    addTransaction({
      ...data, // Spread operator to include all form data
      amount: Number(data.amount), // Ensuring the amount is a number
      currency: "USD", // Setting a default currency
    });
    reset(); // Resetting the form fields after submission
  };

  // Returning the JSX for rendering the transaction form
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Add Transaction
      </h2>{" "}
      {/* Form title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {" "}
        {/* Grid layout for form fields */}
        {/* Transaction Type Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type
          </label>
          <select
            {...register("type", { required: "Type is required" })} // Registering the field with validation
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="income">Income</option> {/* Option for income */}
            <option value="expense">Expense</option> {/* Option for expense */}
          </select>
          {errors.type && ( // Displaying error message if validation fails
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>
        {/* Transaction Category Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })} // Registering the field with validation
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="groceries">Groceries</option>{" "}
            {/* Option for groceries */}
            <option value="utilities">Utilities</option>{" "}
            {/* Option for utilities */}
            <option value="rent">Rent</option> {/* Option for rent */}
            <option value="salary">Salary</option> {/* Option for salary */}
            <option value="other">Other</option>{" "}
            {/* Option for other categories */}
          </select>
          {errors.category && ( // Displaying error message if validation fails
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>
        {/* Transaction Amount Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <input
            type="number" // Input type for amount
            step="0.01" // Allowing decimal values with two digits
            {...register("amount", {
              required: "Amount is required", // Validation for required field
              min: { value: 0.01, message: "Amount must be greater than 0" }, // Validation for minimum value
            })}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.amount && ( // Displaying error message if validation fails
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>
        {/* Transaction Date Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date" // Input type for date
            {...register("date", { required: "Date is required" })} // Registering the field with validation
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.date && ( // Displaying error message if validation fails
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>
      </div>
      {/* Transaction Description Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <input
          type="text" // Input type for description
          {...register("description", {
            required: "Description is required", // Validation for required field
            minLength: {
              value: 3,
              message: "Description must be at least 3 characters",
            }, // Validation for minimum length
          })}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.description && ( // Displaying error message if validation fails
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
        Add Transaction
      </button>
    </form>
  );
};

// Exporting the TransactionForm component
export default TransactionForm;
