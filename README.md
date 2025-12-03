# React Dashboard with Redux & Sagas

A fully responsive, modern dashboard application built with React, TypeScript, Redux Toolkit, and Redux-Saga. Features mock authentication, dynamic data visualization, skeleton loading states, and smooth animations.

## ✨ Features

### Authentication
- **Mock Login System**: Secure login flow with form validation
- **Demo Credentials**: `admin@demo.com` / `password` (or any email with 6+ char password)
- **Persistent Sessions**: User data stored in localStorage
- **Protected Routes**: Dashboard requires authentication

### Dashboard Components
- **6 Statistical Cards**: New Tickets, Closed Today, New Replies, Followers, Daily Earnings, Products
- **Activity Chart**: Area chart showing development activity trends
- **Pie Charts**: Two pie charts displaying category distribution and device breakdown
- **Activity Table**: Recent commit history with user avatars
- **Collapsible Sidebar**: Responsive navigation with icons and labels

### User Experience
- **Skeleton Loading States**: Shimmer effects during data fetching
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Dark/Light Ready**: CSS variables for easy theming

## 🏗️ Architecture

### State Management

```
src/store/
├── index.ts              # Store configuration with saga middleware
├── hooks.ts              # Typed useAppDispatch & useAppSelector
├── slices/
│   ├── authSlice.ts      # Authentication state (user, isAuthenticated, loading, error)
│   └── dashboardSlice.ts # Dashboard data (stats, charts, activity)
└── sagas/
    ├── index.ts          # Root saga combining all sagas
    ├── authSaga.ts       # Login flow with mock API
    └── dashboardSaga.ts  # Dashboard data fetching
```

### Component Structure

```
src/components/dashboard/
├── DashboardHeader.tsx   # Top bar with search, notifications, user menu
├── DashboardSidebar.tsx  # Collapsible navigation sidebar
├── StatCard.tsx          # Individual stat display with trends
├── ActivityChart.tsx     # Recharts area chart component
├── PieChartCard.tsx      # Recharts pie chart component
├── ActivityTable.tsx     # Recent activity list
└── Skeletons.tsx         # Loading skeleton components
```

### Pages

```
src/pages/
├── Login.tsx             # Authentication page with form
├── Dashboard.tsx         # Main dashboard layout
├── Index.tsx             # Redirect to login
└── NotFound.tsx          # 404 error page
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Redux Toolkit** | State Management |
| **Redux-Saga** | Side Effects & Async Logic |
| **React Router v6** | Client-side Routing |
| **Recharts** | Data Visualization |
| **Framer Motion** | Animations |
| **Tailwind CSS** | Styling |
| **Shadcn/ui** | UI Components |
| **Vite** | Build Tool |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <https://github.com/YeeshaDev/saga-dashboard.git >

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, collapsed sidebar |
| Tablet | 640px - 1024px | Two columns, icon-only sidebar |
| Desktop | > 1024px | Full layout with expanded sidebar |

## 🎨 Design System

### CSS Variables (index.css)

```css
:root {
  --background: 210 20% 98%;
  --foreground: 222 47% 11%;
  --primary: 221 83% 53%;
  --secondary: 210 40% 96%;
  --accent: 210 40% 96%;
  --muted: 210 40% 96%;
  /* ... more variables */
}
```

### Custom Animations

- `fade-in` - Smooth opacity transition
- `slide-up` - Upward motion entrance
- `pulse-soft` - Gentle pulsing effect
- `shimmer` - Skeleton loading effect

## 📊 Data Flow

```
User Action → Redux Action → Saga Middleware → Mock API → Redux State → React Components
```

### Example: Login Flow

1. User submits login form
2. `loginRequest` action dispatched
3. `authSaga` catches action, calls mock API
4. On success: `loginSuccess` updates state, saves to localStorage
5. Component re-renders, navigates to dashboard

### Example: Dashboard Data

1. Dashboard mounts, dispatches `fetchDashboardRequest`
2. `dashboardSaga` generates mock data with delay
3. `fetchDashboardSuccess` populates state
4. Components render with real data (skeletons disappear)

## 🔐 Authentication

### Mock Credentials
- **Admin**: `admin@demo.com` / `password`
- **Any User**: Any valid email + password (min 6 characters)

### Session Persistence
User data is stored in `localStorage` under the key `user`. On app load, the auth slice checks for existing session.

## 📁 Project Structure

```
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── dashboard/      # Dashboard-specific components
│   │   └── ui/             # Shadcn UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Route pages
│   ├── store/              # Redux store, slices, sagas
│   ├── App.tsx             # Root component with routes
│   ├── index.css           # Global styles & CSS variables
│   └── main.tsx            # Entry point
├── tailwind.config.ts      # Tailwind configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies
```

## 🧪 Key Implementation Details

### Redux-Saga Pattern
```typescript
function* handleLogin(action: PayloadAction<{ email: string; password: string }>) {
  try {
    const user = yield mockLogin(action.payload.email, action.payload.password);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}
```

