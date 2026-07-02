# CWG Glasgow - Team Scotland Preparation Camp Timeline

A React app displaying the Team Scotland Preparation Camp schedule from July 15-21, with interactive filtering, search, and day-by-day views.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/OllieScotSwim/CWGGlasgow.git
cd CWGGlasgow
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the app and push it to the `gh-pages` branch. Your site will be live at `https://OllieScotSwim.github.io/CWGGlasgow/`

## Features

- **Overview Tab**: See the full week schedule with all activities
- **Day Tabs**: Select individual days to view detailed schedules
- **Search**: Find activities by title, location, people involved, or details
- **Type Filter**: Filter activities by type (Swim, Media, S&C, Meals, etc.)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Color-Coded Activities**: Each activity type has a distinct color for easy identification

## Technology Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)

## License

MIT
