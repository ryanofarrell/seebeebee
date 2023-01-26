import { Anchor, Button, H1, Paragraph, Separator, Sheet, XStack, YStack } from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'solito/router'
import useDebouncedEffect from 'use-debounced-effect'
import { getRecordsAsync } from '../../firebase/crud'
import { where } from 'firebase/firestore'
import { Input, Spinner } from 'tamagui'

export function HomeScreen() {
  const { push, replace, back, parseNextPath } = useRouter()

  // Store search results in state
  const [searchResults, setSearchResults] = useState({})
  // Store search query in state
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const searchQueryNormalized = searchQuery.toLowerCase().replace(/[^a-z]/g, '')

  // Debounce the search query, then fetch results from database
  useDebouncedEffect(
    () => {
      // Convert search query to only lowercase alphabetical characters

      if (searchQueryNormalized.length < 3) {
        setSearchResults([])
        setLoading(false)
        return
      }

      const res1 = getRecordsAsync({
        coll: 'teams',
        q: [where('team_name_spellings', 'array-contains', searchQueryNormalized)],
      })
      const res2 = getRecordsAsync({
        coll: 'teams',
        q: [
          where('lower_alpha', '>=', searchQueryNormalized),
          where('lower_alpha', '<', searchQueryNormalized + 'z'),
        ],
      })

      // Resolve all promises then combine results
      Promise.all([res1, res2]).then(([r1, r2]) => {
        const results = [...r1.out, ...r2.out]
        const outObj = {}
        results.forEach((r) => {
          outObj[r.id] = r
        })
        console.log(outObj)
        setLoading(false)
        setSearchResults(outObj)
      })
    },
    500,
    [searchQueryNormalized]
  )

  // Set loading every time search query changes
  useEffect(() => {
    if (searchQueryNormalized.length >= 3) {
      setLoading(true)
      return
    }
  }, [searchQueryNormalized])

  return (
    <YStack f={1} boc="green" ai="center" jc="center" w="100%">
      <YStack f={1} jc="center" als="center" p="$4" space boc={'yellow'} maw={500} w="100%">
        <YStack space>
          <H1 ta="center">Welcome</H1>
          <Separator />
          <Paragraph ta="center">Search for a team</Paragraph>
          <Input value={searchQuery} onChangeText={setSearchQuery} miw={'$20'} />
          <Separator />
        </YStack>
        <YStack f={1} space boc="red">
          {loading ? (
            <Spinner />
          ) : (
            Object.keys(searchResults).map((k) => {
              const team = searchResults[k]
              return (
                <Button
                  key={k}
                  onPress={() => {
                    push(`/${team.id}`)
                  }}
                >
                  {team.team_name}
                </Button>
              )
            })
          )}
        </YStack>
        <YStack space>
          <Separator />
          <Paragraph ta="center">
            Created by {` `}
            <Anchor color="$color12" href="https://linkedin.com/in/ryan-ofarrell" target="_blank">
              Ryan O'Farrell
            </Anchor>
          </Paragraph>
        </YStack>
      </YStack>
    </YStack>
  )
}
