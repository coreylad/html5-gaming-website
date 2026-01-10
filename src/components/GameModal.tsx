import { X } from '@phosphor-icons/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Game } from '@/lib/types'

interface GameModalProps {
  game: Game | null
  isOpen: boolean
  onClose: () => void
}

export function GameModal({ game, isOpen, onClose }: GameModalProps) {
  if (!game) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0 gap-0">
        <DialogHeader className="p-4 border-b border-border flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-2xl font-bold">{game.title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>
        <div className="flex-1 flex items-center justify-center bg-muted p-8">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
              <div className="text-6xl">🎮</div>
            </div>
            <h3 className="text-xl font-bold text-foreground">Game Demo</h3>
            <p className="text-muted-foreground max-w-md">
              This is a placeholder for the actual game. In a real implementation, 
              you would embed the HTML5 game using an iframe or canvas element.
            </p>
            <div className="pt-4">
              <code className="text-sm bg-card px-4 py-2 rounded-md">
                Game URL: {game.gameUrl}
              </code>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
