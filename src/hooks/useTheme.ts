// Import necessary hooks from React
import { useState, useEffect } from 'react';

// Define a type for the theme, which can either be 'light' or 'dark'
type Theme = 'light' | 'dark';

// Custom hook to manage the theme of the application
export function useTheme() {
  // State to hold the current theme, initialized with a function to determine the initial value
  const [theme, setTheme] = useState<Theme>(() => {
    // Retrieve the saved theme from localStorage
    const saved = localStorage.getItem('theme');
    // Check if the user prefers a dark color scheme using the matchMedia API
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Return the saved theme if it exists, otherwise return 'dark' if preferred, or default to 'light'
    return (saved as Theme) || (prefersDark ? 'dark' : 'light');
  });

  // Effect to apply the theme to the document whenever it changes
  useEffect(() => {
    // Get the root element of the document (usually the <html> element)
    const root = window.document.documentElement;
    // Remove any existing theme classes ('light' or 'dark') from the root element
    root.classList.remove('light', 'dark');
    // Add the new theme class to the root element
    root.classList.add(theme);
    // Save the current theme to localStorage for persistence
    localStorage.setItem('theme', theme);
  }, [theme]); // Dependency array ensures this effect runs whenever 'theme' changes

  // Return the current theme and the function to update it
  return { theme, setTheme };
}