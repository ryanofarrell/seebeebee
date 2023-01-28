export interface Game {
  id: string
}

export const exampleGame: Game = {
  id: '123',
}

export interface SeasonTeam {
  id: string
  team_id: string
  season: number
  season_team_id: string
  games: Array<Game>
}

export const exampleSeasonTeam: SeasonTeam = {
  id: '123',
  team_id: '123',
  season: 2020,
  season_team_id: '123',
  games: [exampleGame],
}
