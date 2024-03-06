# React/TypeScript DataTable

A user-friendly data table built with React, TypeScript, and Vite, designed to display and manage a list of persons with features including:

- Data pagination
- Row highlighting
- Jump-to-row functionality
- Detailed person information modal

## Features

- **Pagination:** Handles large datasets gracefully with efficient pagination controls.
- **Row Selection and Highlighting:** Visually highlights the currently selected row.
- **Jump-to-Row:** Quickly navigates to specific rows by entering the row number.
- **Person Details Modal:** Provides in-depth information about a selected person.

## Technologies

- **React:** Core UI framework for building dynamic user interfaces.
- **TypeScript:** Enhances code readability, maintainability, and type safety.
- **Vite:** Provides lightning-fast development and production builds.
- **SCSS:** Used for modular and maintainable styling.
- **Bootstrap:** For responsive and mobile-first design.

## Getting Started

1. **Clone the Project**

   ```bash
   git clone https://github.com/ebenezerdon/react-table.git
   ```

2. **Install Dependencies**

   ```bash
   cd react-table
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

   Typically the app will be available at <http://localhost:5173/>

## Project Structure

- `src`
  - `components`
    - `DataTable.tsx` - The main data table component.
    - `PersonDetailsModal.tsx` - Modal for displaying person details.
    - `DataTable.scss` - Styles for the DataTable component.
  - `data`
    - `random-people-data.json` - user data in JSON format.
    - `types.ts`: Contains TypeScript interfaces for the data.
- `App.tsx` - Main application component.
- `main.tsx` - Entry point for the application.
- `index.html` - Main HTML file.
- `package.json` - Project dependencies and scripts.
- `tsconfig.json` - TypeScript configuration.
- `vite.config.ts` - Vite configuration.

## Design Decisions

- **Component-Based Structure:** The project is organized into reusable React components for scalability and maintainability.
- **Focused Scope:** The initial design centers on the core data table functionality, offering a base for expansion.
- **TypeScript Usage:** TypeScript is used to ensure type safety and code clarity.
- **Vite for Development:** Vite is chosen for its rapid development and production builds.

## Future Enhancements

- **Column Sorting:** Enable sorting by various data fields (name, email, etc.).
- **Filtering/Searching:** Implement search functionality to filter the data table.
- **Data Fetching:** Integrate with an API to fetch data dynamically.
- **Robust Testing:** Add comprehensive unit and integration tests.
