import React from "react"; // Importing React library to use its features
import { BudgetProvider } from "./context/BudgetContext"; // Importing BudgetProvider to manage budget state
import Dashboard from "./components/Dashboard"; // Importing Dashboard component to display budget overview
import TransactionForm from "./components/TransactionForm"; // Importing TransactionForm to add new transactions
import TransactionList from "./components/TransactionList"; // Importing TransactionList to display recent transactions
import { Wallet } from "lucide-react"; // Importing Wallet icon from lucide-react for UI

// Main App component
function App() {
  return (
    // Wrapping the entire application in BudgetProvider to provide budget context to all components
    <BudgetProvider>
      <div className="min-h-screen bg-gray-100">
        {" "}
        {/* Main container with minimum height and background color */}
        <nav className="bg-white shadow-sm">
          {" "}
          {/* Navigation bar with shadow effect */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {" "}
            {/* Centering and padding for the nav bar */}
            <div className="flex justify-between h-16 items-center">
              {" "}
              {/* Flex container for layout */}
              <div className="flex items-center">
                {" "}
                {/* Flex container for logo and title */}
                <Wallet className="h-8 w-8 text-blue-600" />{" "}
                {/* Wallet icon with specific size and color */}
                <span className="ml-2 text-xl font-bold text-gray-900">
                  {" "}
                  {/* Title of the app with styling */}
                  Personal Budget Tracker
                </span>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {" "}
          {/* Main content area */}
          <div className="space-y-8">
            {" "}
            {/* Vertical spacing between elements */}
            <Dashboard />{" "}
            {/* Dashboard component to show the overall budget status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {" "}
              {/* Grid layout for transaction form and list */}
              <div className="lg:col-span-1">
                {" "}
                {/* Column for the transaction form, taking full width on small screens */}
                <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>{" "}
                {/* Section title for adding transactions */}
                <TransactionForm />{" "}
                {/* TransactionForm component for inputting new transactions */}
              </div>
              <div className="lg:col-span-2">
                {" "}
                {/* Column for the transaction list, taking two-thirds width on large screens */}
                <h2 className="text-lg font-semibold mb-4">
                  {" "}
                  {/* Section title for recent transactions */}
                  Recent Transactions
                </h2>
                <TransactionList />{" "}
                {/* TransactionList component to display a list of recent transactions */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </BudgetProvider>
  );
}

export default App; // Exporting the App component for use in other parts of the application
