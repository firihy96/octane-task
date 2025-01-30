# Order Management Dashboard

## 📌 Overview
The **Order Management Dashboard** is a web application designed to display and manage order data fetched from APIs. It provides an interactive table with features like pagination, status updates, and bulk actions. The app also includes a dark mode toggle and a user-friendly interface for seamless navigation.

## 🚀 Features

### 🔹 Live Demo
- [Live Demo](https://octane-task.vercel.app/): Check out the deployed version of the app on Vercel.

### 🔹 Header
- **Tab Navigation:** Switch between two tables (Order Overview & User Management).
- **Theme Toggle:** Light/Dark mode switch for better user experience.

### 🔹 Main Section
- **Table Navigation Bar:** Displays the active table name.
- **Action Buttons:**
  - **Submit Button:** Enables when modifications are made to the table.
  - **Actions Dropdown:** Provides options to delete selected rows or clear all selections (only works when at least one row is selected).
- **Interactive Table:**
  - Displays order data fetched from an API.
  - Supports row selection using checkboxes.
  - Allows modification of order status (only when the edit button is clicked).
- **Pagination:**
  - Navigate to the first or last page easily.
  - Displays the current page.
  - Provides an input field for users to jump to a specific page.

### 🔹 Footer
- Displays copyright information.

## 📊 Tech Stack
- **Frontend:** React, Tailwind CSS
- **State Management:** React Hooks
- **API Handling:** Axios (or Fetch API)
- **Deployment:** Vercel

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/firihy96/octane-task.git
cd octane-task