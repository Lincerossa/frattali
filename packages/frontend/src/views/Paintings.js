import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Fullscreen } from 'components'

import theme from '../styles/theme'

import { getPaintings } from '../Redux/paintings/reducer'
import { getCanvas } from '../Redux/canvas/reducer'

import * as paintingsActions from '../Redux/paintings/actions'
import * as canvasActions from '../Redux/canvas/actions'

const actions = {
  ...paintingsActions,
  ...canvasActions,
}

const Art = ({ paintings, canvas, removePainting, updateCanvas }) => {
  const [currentId, selectCurrentID] = useState(canvas.id)

  useEffect(() => {
    if (currentId !== canvas.id) {
      const newCanvas = paintings.find(painting => painting.id === currentId)
      updateCanvas(newCanvas)
    }
  }, [currentId])

  return (
    <Fullscreen backgroundColor={theme.colors.dark}>
      <Paintings>
        {paintings &&
          paintings.length > 0 &&
          paintings.map(e => (
            <Painting>
              <PaintingTitle
                isActive={e.id === canvas.id}
                onClick={() => selectCurrentID(e.id)}
              >
                {e.title}
              </PaintingTitle>
              <PaintingLink>
                <Link to="/">-></Link>
              </PaintingLink>
            </Painting>
          ))}
      </Paintings>
    </Fullscreen>
  )
}

const Paintings = styled.div`
  padding: 2rem;
  color: white;
  min-width: 300px;
`

const Painting = styled.div`
  display: flex;
  border: 1px solid white;
  height: 2rem;
  margin-bottom: 0.25rem;
`
const PaintingTitle = styled.div`
  flex-basis: 100%;
  color: ${props => (props.isActive ? props.theme.colors.main : 'white')};
  background-color: ${props => (props.isActive ? 'white' : 'auto')};
  padding: 0.25rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: white;
    color: ${props => props.theme.colors.main};
    cursor: pointer;
  }
`

const PaintingLink = styled.div`
  flex-basis: 50px;
  background: #ab01ff;
  a {
    color: white;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`

export default connect(
  state => ({
    paintings: getPaintings(state),
    canvas: getCanvas(state),
  }),
  actions
)(Art)
