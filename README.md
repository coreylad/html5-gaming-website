# HTML5 Gaming Website

A modern HTML5 gaming platform that showcases browser-based games with an immersive, arcade-inspired interface where users can discover, play, and track their gaming experiences.

## Features

- 🎮 **Game Gallery** - Browse and play HTML5 games directly in your browser
- ❤️ **Favorites System** - Mark your favorite games for quick access
- 🎯 **Category Filtering** - Filter games by Action, Puzzle, Arcade, Strategy, and Sports
- 📊 **Play Statistics** - Track play counts for each game
- 🎨 **Modern UI** - Beautiful, responsive design with dark mode support
- 💰 **Donations Panel** - Built-in admin panel for managing donations

## Tech Stack

- **React 19** - Latest React with modern hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Local Storage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/coreylad/html5-gaming-website.git
cd html5-gaming-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Docker Setup

This project includes Docker support for easy deployment and containerization.

### Using Docker Compose (Recommended)

Build and run the container:
```bash
docker-compose up -d
```

Stop the container:
```bash
docker-compose down
```

The application will be available at `http://localhost:8080`

### Using Docker directly

Build the image:
```bash
docker build -t html5-gaming-website .
```

Run the container:
```bash
docker run -d -p 8080:80 --name gaming-website html5-gaming-website
```

Stop the container:
```bash
docker stop gaming-website
docker rm gaming-website
```

### Docker Image Details
- **Base Image**: Node 20 Alpine (build stage), Nginx Alpine (production stage)
- **Build Process**: Multi-stage build for optimized image size
- **Port**: The application runs on port 80 inside the container, mapped to port 8080 on the host
- **Web Server**: Nginx for serving static files

## Admin Panel

The application includes an admin panel for managing donations and other settings.

- Click the gear icon in the top-right corner to access the admin panel
- Default password: `admin123` (change this in production!)
- Configure PayPal and Stripe payment options
- Manage donation tiers and buttons

## Data Persistence

User data (favorites, play counts, admin settings) is stored in the browser's localStorage. This means:
- Data persists across browser sessions
- Data is specific to each browser/device
- Clearing browser data will reset the application

For production use with multiple users, consider implementing a backend API with a database.

## Project Structure

```
html5-gaming-website/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── AdminPanel.tsx
│   │   ├── DonationsPanel.tsx
│   │   ├── GameCard.tsx
│   │   └── GameModal.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── useLocalStorage.ts
│   ├── lib/              # Utilities and data
│   │   ├── gameData.ts   # Game definitions
│   │   ├── types.ts      # TypeScript types
│   │   └── utils.ts      # Helper functions
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main app component
│   └── main.tsx          # App entry point
├── public/               # Static assets
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── nginx.conf           # Nginx configuration
└── package.json         # Project dependencies
```

## Adding New Games

To add new games to the platform:

1. Open `src/lib/gameData.ts`
2. Add a new game object to the `GAMES` array with the following structure:

```typescript
{
  id: 'unique-game-id',
  title: 'Game Title',
  description: 'Brief description of the game',
  category: 'Action', // or 'Puzzle', 'Arcade', 'Strategy', 'Sports'
  imageUrl: '/path/to/game/thumbnail.jpg',
  gameUrl: '/path/to/game/index.html' // or external URL
}
```

## License

MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
