# HTML5 Gaming Website

A modern HTML5 gaming platform that showcases browser-based games with an immersive, arcade-inspired interface where users can discover, play, and track their gaming experiences. Built with Laravel for easy deployment.

## Features

- 🎮 **Game Gallery** - Browse and play HTML5 games directly in your browser
- ❤️ **Favorites System** - Mark your favorite games for quick access
- 🎯 **Category Filtering** - Filter games by Action, Puzzle, Arcade, Strategy, and Sports
- 📊 **Play Statistics** - Track play counts for each game
- 🎨 **Modern UI** - Beautiful, responsive design with dark mode support
- 💰 **Donations Panel** - Built-in admin panel for managing donations

## Tech Stack

- **Laravel 11** - Backend framework for easy deployment
- **React 19** - Latest React with modern hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Local Storage** - Client-side data persistence

## Getting Started

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/coreylad/html5-gaming-website.git
cd html5-gaming-website
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Create environment file and generate application key:
```bash
cp .env.example .env
php artisan key:generate
```

5. Configure your `.env` file with your database and other settings (optional for this app as it uses localStorage).

### Development

1. Start the Laravel development server:
```bash
php artisan serve
```

2. In another terminal, start the Vite development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:8000`

### Building for Production

1. Build the frontend assets:
```bash
npm run build
```

2. The application is now ready for deployment. Serve it using Laravel's built-in server or configure your web server (Apache/Nginx).

## Deployment

### Simple Deployment (Shared Hosting)

1. Upload all files to your web server
2. Point your domain to the `public` directory
3. Run `composer install --no-dev --optimize-autoloader`
4. Run `npm run build`
5. Set proper permissions:
```bash
chmod -R 755 storage bootstrap/cache
```

### Laravel Forge / Vapor

This app is ready to deploy to Laravel Forge or Vapor with minimal configuration:

1. Connect your repository
2. Set up the deployment script:
```bash
cd /home/forge/your-site.com
git pull origin main
composer install --no-dev --optimize-autoloader
npm install
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Traditional Server (Ubuntu/Nginx)

See the official Laravel deployment documentation: https://laravel.com/docs/11.x/deployment

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
