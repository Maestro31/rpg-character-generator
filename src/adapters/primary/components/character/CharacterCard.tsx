import styled from '@emotion/styled'
import React from 'react'
import { CharacterDTO } from '../../../../core/models/Character'
import characterImage from '../../assets/images/character.svg'
import upIcon from '../../assets/icons/up.svg'

interface CharacterCardProps {
  character?: CharacterDTO
  selected: boolean
  onCharacterSelected: (e: React.MouseEvent) => void
}

export default function CharacterCard({
  character,
  selected,
  onCharacterSelected,
}: CharacterCardProps) {
  const canUpSkill = character && character.skillPoints > 0

  return (
    <Container
      selected={selected}
      onClick={onCharacterSelected}
      up={!!canUpSkill}
    >
      {character && (
        <React.Fragment>
          <Rank>{character.rank}</Rank>
          <img src={characterImage} alt="character illustration" width="75px" />
          {canUpSkill && (
            <Up>
              <img src={upIcon} alt="up character" />
            </Up>
          )}
        </React.Fragment>
      )}
    </Container>
  )
}

const Container = styled.div(
  ({ selected, up }: { selected: boolean; up: boolean }) => ({
    backgroundColor: '#8F7769',
    borderRadius: '5px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: selected
      ? '2px solid white'
      : up
      ? '2px solid #BAEC2D'
      : '2px solid transparent',
  })
)

const Rank = styled.div({
  position: 'absolute',
  left: '5px',
  top: '5px',
  color: '#DCE001',
})

const Up = styled.div({
  position: 'absolute',
  bottom: '5px',
  right: '5px',
})