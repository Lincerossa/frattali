import React from 'react'
import * as S from './styles'

export default ({items}) => (
  <S.Panel>
    {
      items.map(block => (
        <S.PanelBlock>
          {
            block.map(({text, onClick, isActive, Component}) => (
              Component ? Component()  : <S.PanelInner 
                onClick={onClick}
                isActive={isActive}
              >{text}</S.PanelInner>
            ))
          }
        </S.PanelBlock>
      ))
    }
  </S.Panel>)