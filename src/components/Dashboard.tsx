// Importing React library for building the user interface
import React from 'react';

// Importing the useBudget hook from the context to access budget-related data
import { useBudget } from '../context/BudgetContext';

// Importing a utility function to format currency amounts
import { formatAmount } from '../utils/currency';

// Importing necessary components from the recharts library to create a pie chart
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Importing icons from the lucide-react library for visual representation of financial data
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

// Defining an array of colors to be used for pie chart slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Defining the Dashboard component as a functional React component
const Dashboard: React.FC = () => {
  // Using the useBudget hook to get the summary of the budget
  const { summary } = useBudget();

  // Preparing chart data by filtering budgets that have been spent
  const chartData = summary.budgets
    .filter(budget => budget.spent > 0) // Only include budgets with spent amounts greater than 0
    .map(budget => ({
      // Mapping to create an object for each budget with a capitalized category name and spent value
      name: budget.category.charAt(0).toUpperCase() + budget.category.slice(1), // Capitalizing the first letter of the category
      value: budget.spent // Setting the spent amount as the value
    }));

  // Returning the JSX for rendering the dashboard
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Grid layout for responsive design */}
      <div className="col-span-1 md:col-span-2"> {/* This div takes full width on small screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Nested grid for balance, income, and expenses cards */}
          
          {/* Balance Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> {/* Card styling */}
            <div className="flex items-center justify-between"> {/* Flexbox for alignment */}
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Balance</h3> {/* Title for the card */}
              <Wallet className="text-primary-500" /> {/* Wallet icon */}
            </div>
            <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
              {formatAmount(summary.balance, summary.currency)} {/* Displaying formatted balance amount */}
            </p>
          </div>

          {/* Income Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> {/* Card styling */}
            <div className="flex items-center justify-between"> {/* Flexbox for alignment */}
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Income</h3> {/* Title for the card */}
              <TrendingUp className="text-green-500" /> {/* Trending up icon */}
            </div>
            <p className="text-2xl font-bold mt-2 text-green-600 dark:text-green-400">
              {formatAmount(summary.totalIncome, summary.currency)} {/* Displaying formatted income amount */}
            </p>
          </div>

          {/* Expenses Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> {/* Card styling */}
            <div className="flex items-center justify-between"> {/* Flexbox for alignment */}
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Expenses</h3> {/* Title for the card */}
              <TrendingDown className="text-red-500" /> {/* Trending down icon */}
            </div>
            <p className="text-2xl font-bold mt-2 text-red-600 dark:text-red-400">
              {formatAmount(summary.totalExpenses, summary.currency)} {/* Displaying formatted expenses amount */}
            </p>
          </div>
        </div>
      </div>

      {/* Spending Distribution Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> {/* Card styling */}
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Spending Distribution</h3> {/* Title for the chart */}
        <div className="h-64"> {/* Fixed height for the chart container */}
          {chartData.length > 0 ? ( // Check if there is data to display
            <ResponsiveContainer width="100%" height="100%"> {/* Responsive container for the chart */}
              <PieChart> {/* Pie chart component */}
                <Pie
                  data={chartData} // Data for the pie chart
                  cx="50%" // Center x position
                  cy="50%" // Center y position
                  innerRadius={60} // Inner radius for a donut chart
                  outerRadius={80} // Outer radius for a donut chart
                  paddingAngle={5} // Padding angle between slices
                  dataKey="value" // Key for the value field in the data
                >
                  {chartData.map((_, index) => ( // Mapping data to create pie chart slices
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> // Using colors from the COLORS array
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatAmount(value as number, summary.currency)} /> {/* Tooltip with formatted currency */}
                <Legend /> {/* Chart legend */}
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              No spending data to display {/* Displaying a message when there is no data */}
            </div>
          )}
        </div>
      </div>

      {/* Budget Overview */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> {/* Card styling */}
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Budget Overview</h3> {/* Title for the budget overview */}
        <div className="space-y-4"> {/* Container for budget overview items */}
          {summary.budgets.map((budget) => ( // Mapping budgets to display overview
            <div key={budget.category} className="space-y-2"> {/* Container for each budget item */}
              <div className="flex justify-between text-sm"> {/* Flexbox for alignment */}
                <span className="text-gray-600 dark:text-gray-300 capitalize">{budget.category}</span> {/* Budget category */}
                <span className="text-gray-900 dark:text-white">
                  {formatAmount(budget.spent, budget.currency)} / {formatAmount(budget.limit, budget.currency)} {/* Displaying spent and limit amounts */}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"> {/* Progress bar container */}
                <div
                  className={`h-2 rounded-full ${
                    (budget.spent / budget.limit) * 100 > budget.alertThreshold
                      ? 'bg-red-500' // Alert color when spent exceeds the threshold
                      : 'bg-primary-500' // Normal color
                  }`}
                  style={{ width: `${Math.min((budget.spent / budget.limit) * 100, 100)}%` }} {/* Progress bar width calculation */}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; // Exporting the Dashboard component