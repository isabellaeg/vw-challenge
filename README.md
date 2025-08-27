# Isabella Esquivel

# Volkswagen Technical Challenge: Interactive Dog Breed Data Table

A web application built for the Volkswagen technical challenge, featuring an interactive data table for browsing and managing dog breed information, (my favorite animal!)

## 🚀 Live Demo

[View Live Application](https://your-netlify-url.netlify.app)

## ✨ Features

### Core Functionality

- **Interactive Data Table**: Sortable columns, row selection, and pagination
- **Mobile-First Design**: Responsive layout with card-based mobile view and table view for desktop
- **CRUD Operations**: Create, read, update, and delete dog breed records
- **Search & Filter**: search across breed attributes
- **Bulk Actions**: Select multiple breeds for bulk delete operations
- **Accessible Design**: Full keyboard navigation
- **Reusable Components**: Tried to use generic components that can be reused on different parts of the app

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite (fast development and optimized builds)
- **State Management**: Zustand (lightweight, easy setup)
- **Styling**: Tailwind CSS (utility-first, consistent design system)
- **Icons**: Lucide React (modern, consistent iconography)
- **Deployment**: Netlify (continuous deployment from GitHub)

## 🏗 Architecture Decisions

### State Management - Zustand

I chose Zustand over Redux/Context API because:

- **Minimal boilerplate**: No providers, reducers, or action creators needed
- **Better performance**: Prevents unnecessary re-renders with selective subscriptions
- **TypeScript-first**: Excellent type inference and safety
- **Developer experience**: Simple API that's easy to debug and maintain

### Component Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Table/          # Generic table component
│   ├── Modal/          # Accessible modal system
│   ├── Button/         # Consistent button variants
│   └── Layout/         # App shell structure
├── pages/              # Route-level components
├── hooks/              # Custom React hooks for logic reuse
├── store/              # Zustand stores for state management
├── types/              # TypeScript type definitions
└── utils/              # Helper functions and utilities
```

### Design Patterns Used

**1. Generic Components**
Tried to create some generic component that could be reused regardless of data type such as the Table and the Buttons

**2. Custom Hooks**
Extracted complex logic into hooks for better separation of concerns

## 🎯 Key Technical Decisions

### Tailwind CSS

- Chose Tailwind for a mixture of personal preference, quicker development than switching between CSS files, built in mobile first breakpoints.

### Accessibility

Tried to make it as accessible as possible considering aria attributes, keyboard navigation and proper focus management. (still tons of room for improvement)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/vw-challenge.git
   cd vw-challenge
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   Application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 🎨 Design

### Mobile-First Approach

- **Cards on mobile**: Better touch targets and readability
- **Table on desktop**: Efficient data scanning and comparison
- **Progressive enhancement**: Core functionality works on all devices

### User Experience Focus

- **Immediate feedback**: Loading states and success/error messages
- **Intuitive interactions**: Click anywhere on row to view details
- **Consistent patterns**: Similar interactions across all components

## 📝 Things to Improve

1. Need more tests for all the possible interactions the user may have but ran out of time.

2. Would've liked to had filtering in the responsive view perhaps with a hamburger menu that opens a sidebar

Built with ❤️ by Isabella Esquivel for the Volkswagen Technical Challenge
