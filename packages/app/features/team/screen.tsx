import { Button, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import React, { useState, useEffect } from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { getRecordAsync } from '../../firebase/crud'
import { Input, Spinner, H1 } from 'tamagui'
const { useParam } = createParam<{ id: string }>()

export function TeamDetailScreen() {
  const [id] = useParam('id')

  const linkProps = useLink({ href: '/' })
  const [team, setTeam] = useState(null)
  console.log(team)

  // Fetch team record from database using useEffect
  useEffect(() => {
    // Fetch team record from database
    // Set team record in state
    if (!id) return
    getRecordAsync({ coll: 'teams', id }).then((r) => {
      setTeam(r)
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
