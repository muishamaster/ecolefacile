# React + Vite

## Project Overview

This project is a **premium admin dashboard** for a school management system, built with **React**, **Vite**, and **Lucide icons**. It provides a modern, glass‑morphic UI with dark‑mode support, dynamic animations, and responsive layouts for both desktop and mobile.

### Core Features

- **Dashboard Overview**: Quick stats for student enrollments, active teachers, payment compliance, and schedule summaries.
- **Students Module**: Search, filter by status, and view detailed enrollment information.
- **Teachers Module**: Searchable directory with teacher stats, contact details, and class assignments.
- **Schedules Module**: Interactive timetable grid and daily attendance snapshot.
- **Finances Module**: Payment tracking, collection statistics, and filtering by payment status.
- **Notifications**: Real‑time alerts for new messages, payments, and upcoming meetings.
- **Responsive Design**: Mobile‑first bottom navigation and desktop sidebar with glass‑card components.
- **Premium UI**: Glass‑morphism cards, smooth hover effects, and a cohesive dark theme using custom CSS variables.

### What Was Modified

- Added **admin dashboard components** (`AdminDashboard.jsx`, `StudentsModule`, `TeachersModule`, `SchedulesModule`, `FinancesModule`).
- Implemented **state management** for tab navigation, notifications, and filters.
- Created **custom CSS** (`index.css`) for glass‑cards, dark theme, and responsive layout.
- Integrated **Lucide‑react icons** for a modern look.
- Set up **Git repository** with proper `.gitignore`, ESLint configuration, and Vite build.
- Updated `README.md` to reflect these features and provide setup instructions.

## Setup & Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to explore the admin dashboard.

---

## Existing Documentation (from Vite template)

- React Compiler
- ESLint configuration

You can enable the React Compiler or switch to TypeScript as needed (refer to the original Vite template docs).

---

*This README was generated to give a clear overview of the project's functionality and recent modifications.*

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
