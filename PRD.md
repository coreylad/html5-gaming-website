# Planning Guide

A modern HTML5 gaming platform that showcases browser-based games with an immersive, arcade-inspired interface where users can discover, play, and track their gaming experiences.

**Experience Qualities**: 
1. **Energetic** - Bold colors and dynamic animations that capture the excitement and immediacy of gaming culture
2. **Playful** - Whimsical interactions and game-inspired design elements that feel fun and approachable
3. **Immersive** - Rich visual depth through layered backgrounds and smooth transitions that draw users into the gaming experience

**Complexity Level**: Light Application (multiple features with basic state)
This is a gaming showcase platform with game cards, categories, play tracking, and user favorites - not just a static page but also not requiring complex multi-view navigation or advanced data management.

## Essential Features

### Game Gallery Display
- **Functionality**: Displays a grid of playable HTML5 games with cover art, titles, categories, and play counts
- **Purpose**: Primary discovery mechanism for users to browse available games
- **Trigger**: Automatic on page load
- **Progression**: Page loads → Game cards render in grid → Hover reveals play button → Click launches game
- **Success criteria**: All games visible, responsive grid layout, smooth hover states

### Game Play Modal
- **Functionality**: Opens a full-screen modal with the selected game embedded and playable
- **Purpose**: Provides focused gaming experience without leaving the platform
- **Trigger**: Click "Play" button on any game card
- **Progression**: Click play → Modal animates in → Game loads in iframe/canvas → Play game → Close returns to gallery
- **Success criteria**: Modal covers viewport, game loads successfully, close button easily accessible

### Favorites System
- **Functionality**: Users can mark games as favorites and filter to show only favorited games
- **Purpose**: Personalization and quick access to preferred games
- **Trigger**: Click heart icon on game card
- **Progression**: Click heart → Icon fills with color → Game added to favorites → Toggle filter shows only favorites
- **Success criteria**: Favorites persist across sessions, visual feedback immediate, filter works correctly

### Category Filtering
- **Functionality**: Filter games by category tags (Action, Puzzle, Arcade, Strategy, Sports)
- **Purpose**: Help users find games matching their current mood or preference
- **Trigger**: Click category badge or filter button
- **Progression**: Click category → Gallery filters instantly → Show only matching games → Click "All" to reset
- **Success criteria**: Smooth filtering animation, category counts accurate, multiple categories can be active

### Play Statistics
- **Functionality**: Track and display play counts for each game
- **Purpose**: Social proof and personal achievement tracking
- **Trigger**: Each time a game is launched
- **Progression**: Game opens → Play count increments → Updates persist → Display refreshes on return
- **Success criteria**: Counts are accurate, persist across sessions, display updates smoothly

## Edge Case Handling

- **No Favorites Selected**: Show encouraging empty state with icon and text prompting users to add favorites
- **All Games Filtered Out**: Display "No games found" message with option to clear filters
- **Game Load Failure**: Show error overlay with retry button inside game modal
- **First Time Visitor**: All games show zero plays, no favorites - interface should feel inviting not empty
- **Mobile Touch**: Ensure hover states work as touch interactions, play buttons are easily tappable

## Design Direction

The design should evoke the nostalgic excitement of classic arcade cabinets mixed with modern gaming aesthetics - vibrant neon accents against dark backgrounds, geometric patterns reminiscent of pixel art, and smooth transitions that feel like entering a digital game world.

## Color Selection

A cyberpunk-inspired gaming palette with electric accents on a deep background.

- **Primary Color**: Electric Purple `oklch(0.65 0.25 300)` - Commands attention like arcade neon, represents premium gaming experiences
- **Secondary Colors**: Deep Navy `oklch(0.18 0.02 250)` for cards and surfaces, Cyber Blue `oklch(0.70 0.18 240)` for interactive accents
- **Accent Color**: Hot Pink `oklch(0.72 0.24 340)` - Eye-catching highlight for CTAs, active states, and favorite indicators
- **Foreground/Background Pairings**: 
  - Background (Deep Space #0A0E1A / oklch(0.10 0.02 250)): Bright White (#FFFFFF / oklch(1 0 0)) - Ratio 15.8:1 ✓
  - Primary (Electric Purple): White text (#FFFFFF / oklch(1 0 0)) - Ratio 4.9:1 ✓
  - Accent (Hot Pink): White text (#FFFFFF / oklch(1 0 0)) - Ratio 5.2:1 ✓
  - Card (Deep Navy): Light Gray (#E8E8EA / oklch(0.93 0 0)) - Ratio 8.1:1 ✓

## Font Selection

Typography should balance tech-forward modernity with gaming energy - a bold geometric sans-serif for headings that feels digital and commanding, paired with a clean readable sans for body text.

- **Typographic Hierarchy**: 
  - H1 (Platform Title): Orbitron Bold / 42px / tracking-tight / uppercase
  - H2 (Section Headers): Orbitron SemiBold / 28px / tracking-normal
  - H3 (Game Titles): Inter Bold / 18px / tracking-tight
  - Body (Descriptions): Inter Regular / 14px / leading-relaxed
  - Labels (Categories, Stats): Inter Medium / 12px / tracking-wide / uppercase

## Animations

Animations should feel snappy and game-like - quick state changes with slight bounce effects for playful feedback, smooth slide-ins for modals that feel like loading screens, and subtle floating animations on game cards to suggest interactivity. Hover states should respond within 100ms with scale transforms and glow effects. Modal transitions should use backdrop blur with a 300ms ease-out to create depth.

## Component Selection

- **Components**: 
  - Cards for game tiles with hover effects and overlay buttons
  - Dialog for full-screen game play modal
  - Badge for category tags with interactive filtering
  - Button with multiple variants (primary for play, ghost for filters, icon-only for favorites)
  - Tabs for switching between "All Games" and "Favorites" views
  - Skeleton for loading states on game cards
  
- **Customizations**: 
  - Custom game card component with gradient overlays and animated play button reveal on hover
  - Category badge that doubles as an interactive filter toggle
  - Floating stats indicator showing play count and favorite status
  
- **States**: 
  - Buttons: Subtle scale on hover (1.05x), glow effect via box-shadow, pressed state scales to 0.98x
  - Game cards: Lift on hover with shadow, gradient overlay fades up, play button slides in from center
  - Favorites: Heart outline when not favorited, fills with pink and bounces when toggled
  - Filter badges: Border and text color change when active, smooth color transition
  
- **Icon Selection**: 
  - Play (PlayCircle) for game launch
  - Heart for favorites toggle
  - GameController for gaming theme elements
  - Funnel for filter controls
  - X for modal close
  - Trophy for achievements/stats
  
- **Spacing**: 
  - Card grid: gap-6 (24px between cards)
  - Container padding: px-6 py-8 on mobile, px-12 py-12 on desktop
  - Card internal: p-4 for content padding
  - Section spacing: space-y-8 between major sections
  
- **Mobile**: 
  - Game grid: 1 column on mobile (<640px), 2 columns on tablet (640-1024px), 3-4 columns on desktop
  - Play modal: Full screen with minimal chrome on mobile, max-w-6xl centered on desktop
  - Category filters: Horizontal scroll on mobile with snap points, wrapped grid on desktop
  - Touch targets: Minimum 44px height for all interactive elements
  - Simplified hover effects replaced with immediate active states for touch
