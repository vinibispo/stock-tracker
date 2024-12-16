# Stock Tracker App

A feature-rich **ReactJS** application built with **TypeScript**, **Material-UI**, and **WebSockets** to track and visualize stock prices in real-time. The app leverages responsive UI components, live data updates, and customizable alerts to provide a seamless experience.

---

## Features

- **Real-Time Stock Data**: Fetches and updates stock prices using WebSockets.
- **Responsive Design**: Built with Material-UI for a seamless experience across devices.
- **Customizable Alerts**: Set alerts for stock price thresholds and get notified.
- **Interactive Charts**: Visualize stock trends dynamically.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v22 or higher)
- **Yarn** (Preferred package manager)

---

### Installation

1. **Clone the Repository**:
  ```bash
  git clone https://github.com/vinibispo/stock-tracker
  cd stock-tracker
  ```
2. **Install Dependencies**:
  ```bash
  yarn install --frozen-lockfile 
  ```

3. **Run the Development Server**:
  ```bash
  yarn dev
  ```
---

### Configuration

1. **Create a `.env.development` file in the root directory based on the `.env.example`**:
  ```bash
  cp .env.example .env.development
  ```
2. **Update the `VITE_FINNHUB_API_KEY` for the one that's on your Finnhub dashboard**

---

### File Structure

```bash
stock-tracker/
├── public/                # Static assets
├── src/                   # Application source code
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API logic
│   ├── contexts/          # Context API for state management
│   ├── providers/         # Context API Providers to hold values of the contexts
│   ├── App.tsx            # Main application component
│   ├── App.css            # CSS Fix for the #root element
│   ├── main.tsx           # Entry point of the app
│   ├── theme.ts           # File to define the theme of the app
├── tsconfig.node.json     # TypeScript configuration for Vite config file
├── tsconfig.app.json      # TypeScript configuration for the project
├── tsconfig.json          # TypeScript configuration for everything
├── package.json           # Project dependencies and scripts
├── yarn.lock              # Project dependencies lockfile
├── .gitignore             # Files to exclude from version control
├── README.md              # Project documentation
```
#### Main Components

The project is structured to ensure reusability, scalability, and maintainability. Below is a description of the key components in the application:

1. **StockCard**
*Purpose*: Displays individual stock information, including the symbol, current price, and customizable alert status.
*Usage*:
Displays data in a concise and visually appealing format using Material-UI's Card component.
Highlights when a stock price reaches the alert threshold.

2. **TopCards**
*Purpose*: A horizontal scrollable list of stock cards.
*Key Features*:
- Dynamically updates to show the latest stock information.
- Scrollable interface for viewing multiple stocks in real time.
*Implementation*:
Built with Material-UI's AppBar and Stack components for responsiveness.
Integrates with the WebSocket service to ensure live updates.
3. **LeftForm**
*Purpose*: A form for adding stocks to track.
*Key Features*:
- Dropdown menu for selecting stock symbols.
- Input field for setting alert thresholds.
- Focus management to improve accessibility and usability.
4. Charts
*Purpose*: Visualizes stock price trends using an interactive chart.
*Key Features*:
- Displays real-time data points fetched from WebSocket updates.
- Provides a clear and dynamic representation of stock performance.
*Implementation*:
Utilizes a charting library called @mui/x-charts.
Supports time-series data with timestamps as the X-axis.

---

### Dependencies

#### Core Libraries

- ReactJS: Frontend library for building dynamic user interfaces.
- TypeScript: Ensures a strongly typed, robust codebase.
- Material-UI (MUI): Provides a sleek, responsive UI framework.

#### Development Tools
- ESLint: For code linting.
- Vite: For develop react application with fast refresh

---

### Contact

For Questions or support reach out to vinibispo<vini.bispo015@gmail.com>
