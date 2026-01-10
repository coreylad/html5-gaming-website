import { useState, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { GameController, Heart, Funnel, GearSix } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GameCard } from '@/components/GameCard'
import { GameModal } from '@/components/GameModal'
import { AdminPanel } from '@/components/AdminPanel'
import { GAMES } from '@/lib/gameData'
import { Game, GameCategory } from '@/lib/types'
import { toast } from 'sonner'

const CATEGORIES: GameCategory[] = ['Action', 'Puzzle', 'Arcade', 'Strategy', 'Sports']

function App() {
  const [favorites, setFavorites] = useKV<string[]>('game-favorites', [])
  const [playCounts, setPlayCounts] = useKV<Record<string, number>>('game-play-counts', {})
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isGameModalOpen, setIsGameModalOpen] = useState(false)
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<GameCategory | 'All'>('All')
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all')

  const gamesWithCounts = useMemo(() => {
    return GAMES.map(game => ({
      ...game,
      playCount: (playCounts && playCounts[game.id]) || 0
    }))
  }, [playCounts])

  const filteredGames = useMemo(() => {
    let games = gamesWithCounts

    if (activeTab === 'favorites') {
      games = games.filter(game => favorites && favorites.includes(game.id))
    }

    if (activeCategory !== 'All') {
      games = games.filter(game => game.category === activeCategory)
    }

    return games
  }, [gamesWithCounts, activeTab, activeCategory, favorites])

  const handleToggleFavorite = (gameId: string) => {
    setFavorites((current = []) => {
      if (current.includes(gameId)) {
        toast.success('Removed from favorites')
        return current.filter(id => id !== gameId)
      } else {
        toast.success('Added to favorites')
        return [...current, gameId]
      }
    })
  }

  const handlePlayGame = (game: Game) => {
    setPlayCounts((current = {}) => ({
      ...current,
      [game.id]: ((current && current[game.id]) || 0) + 1
    }))
    setSelectedGame(game)
    setIsGameModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsGameModalOpen(false)
    setTimeout(() => setSelectedGame(null), 300)
  }

  const getCategoryCount = (category: GameCategory | 'All') => {
    if (category === 'All') return gamesWithCounts.length
    return gamesWithCounts.filter(game => game.category === category).length
  }

  return (
    <div className="min-h-screen bg-background pattern-bg">
      <div className="container mx-auto px-6 py-8 md:px-12 md:py-12 space-y-8">
        <header className="text-center space-y-4 relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-0"
            onClick={() => setIsAdminPanelOpen(true)}
            title="Admin Panel"
          >
            <GearSix className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center justify-center gap-3">
            <GameController weight="fill" className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase">
              WEBGAMES.LOL
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your ultimate HTML5 gaming destination. Play instantly in your browser.
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'favorites')} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <TabsList className="bg-card">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                All Games ({gamesWithCounts.length})
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <Heart weight="fill" className="w-4 h-4 mr-2" />
                Favorites ({favorites?.length || 0})
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Funnel className="w-5 h-5 text-muted-foreground" />
              <Button
                variant={activeCategory === 'All' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory('All')}
              >
                All ({getCategoryCount('All')})
              </Button>
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category} ({getCategoryCount(category)})
                </Button>
              ))}
            </div>
          </div>

          <TabsContent value="all" className="space-y-6">
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isFavorite={favorites ? favorites.includes(game.id) : false}
                    onToggleFavorite={handleToggleFavorite}
                    onPlay={handlePlayGame}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 space-y-4">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold text-foreground">No games found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more games
                </p>
                <Button onClick={() => setActiveCategory('All')}>
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isFavorite={favorites ? favorites.includes(game.id) : false}
                    onToggleFavorite={handleToggleFavorite}
                    onPlay={handlePlayGame}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 space-y-4">
                <div className="text-6xl mb-4">💜</div>
                <h3 className="text-2xl font-bold text-foreground">No favorites yet</h3>
                <p className="text-muted-foreground">
                  Click the heart icon on any game to add it to your favorites
                </p>
                <Button onClick={() => setActiveTab('all')}>
                  Browse Games
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <GameModal
        game={selectedGame}
        isOpen={isGameModalOpen}
        onClose={handleCloseModal}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
    </div>
  )
}

export default App