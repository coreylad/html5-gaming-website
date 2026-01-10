import { useState } from 'react'
import { PlayCircle, Heart, Trophy } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Game } from '@/lib/types'
import { cn } from '@/lib/utils'

interface GameCardProps {
  game: Game
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  onPlay: (game: Game) => void
}

export function GameCard({ game, isFavorite, onToggleFavorite, onPlay }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="game-card relative overflow-hidden bg-card border-border group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(game)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-70'
          )}
        />
        <Button
          size="icon"
          className={cn(
            'absolute top-2 right-2 z-10 bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-200',
            isFavorite ? 'text-accent' : 'text-card-foreground'
          )}
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(game.id)
          }}
        >
          <Heart weight={isFavorite ? 'fill' : 'regular'} className="w-5 h-5" />
        </Button>
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-300',
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          )}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect"
            onClick={(e) => {
              e.stopPropagation()
              onPlay(game)
            }}
          >
            <PlayCircle weight="fill" className="w-6 h-6 mr-2" />
            Play Now
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-card-foreground leading-tight">
            {game.title}
          </h3>
          <Badge variant="secondary" className="shrink-0">
            {game.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {game.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Trophy weight="fill" className="w-4 h-4" />
          <span>{game.playCount} plays</span>
        </div>
      </div>
    </Card>
  )
}
