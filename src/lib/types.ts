export type GameCategory = 'Action' | 'Puzzle' | 'Arcade' | 'Strategy' | 'Sports'

export interface Game {
  id: string
  title: string
  description: string
  category: GameCategory
  coverImage: string
  playCount: number
  gameUrl: string
}
