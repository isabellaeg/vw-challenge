# Isabella Esquivel

# Volkswagen Technical Challenge: Interactive Dog Breed Data Table

Web application built as the Volkswagen technical challenge. It will feature an interactive data table to display information about dog breeds (my favorite animal!)

## Features

- **Displays Data:** Renders a list of dog breeds in a clean
- **Modern Tech Stack:** Utilizes Vite, React, and TypeScript for a fast, type-safe development experience.
- **(In Progress) Interactivity:** Future features will include selecting, deleting, and viewing details for each row.

## Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repo-url>
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd vw-challenge
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### 1. Project Structure

The project is organized in the following structure:

- `src/components/`: Contains reusable React components. The key component is `Table/Table.tsx`, which is a generic component designed to render any data array passed to it.
- `src/pages/`: Holds top-level components that represent a "page" in the application. This separates page-level logic (like data fetching and layout) from general-purpose components.
- `src/types/`: A central location for all TypeScript type definitions, facilitates data finding.
- `src/services/`: upcoming

### 2. Project Architecture

- Zustand: Super easy and clean setup, reduces unnecesary re renders and straightforward usage.
- Tailwind CSS
- Vite
