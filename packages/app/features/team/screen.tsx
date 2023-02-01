import { Button, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import React, { useState, useEffect } from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { getRecordAsync, getRecordsAsync } from '../../firebase/crud'
import { Input, Spinner, H1 } from 'tamagui'
import { where } from 'firebase/firestore'
import { SeasonTeam, exampleSeasonTeam, Team, exampleTeam } from 'app/types'
const { useParam } = createParam<{ id: string }>()

export function TeamDetailScreen() {
  const [id] = useParam('id')

  const linkProps = useLink({ href: '/' })
  const [team, setTeam] = useState(null)
  const [seasonTeams, setSeasonTeams] = useState<SeasonTeam[] | null>(null)
  console.log(id)

  // Fetch team record from database using useEffect
  useEffect(() => {
    // Fetch team record from database
    // Set team record in state
    // TODO store team in state?
    if (!id) return
    getRecordAsync<Team>({ coll: 'teams', id, exampleObj: exampleTeam }).then((team) => {
      if (!team) return
      getRecordsAsync<SeasonTeam>({
        coll: 'season_teams',
        q: [where('slug', '==', team.slug)],
        exampleObj: exampleSeasonTeam,
      }).then((seasonTeams) => {
        if (seasonTeams.status !== 'success') {
          console.log('errors!')
          console.log(seasonTeams.errors)
          return
        }
        console.log(seasonTeams.out)
        setTeam(team)
        setSeasonTeams(seasonTeams.out)
      })
    })
  }, [id])

  if (!id || !team) {
    return (
      <YStack f={1} jc="center" ai="center" space>
        <Paragraph ta="center" fow="800">
          Loading...
        </Paragraph>
        <Spinner />
      </YStack>
    )
  }
  return (
    <YStack f={1} jc="center" ai="center" space>
      <YStack space ac="center" ai={'center'}>
        <H1>{team.team_name}</H1>
        <Paragraph>{`D1 from ${team.first_d1_season} to ${team.last_d1_season}`}</Paragraph>
      </YStack>
    </YStack>
  )
}
