import React from 'react'
import { shallow } from 'zustand/shallow'
import { Row, Col } from 'react-bootstrap'
import useStore from '../../hooks/useStore'
import CreatorDropdown from './CreatorDropdown'
import { CreatorType } from '../../models'

const Header: React.FC = () => {
  const [
    creators,
    currentCreator,
    setCurrentCreator
  ] = useStore(state => [
    state.creators,
    state.currentCreator,
    state.setCurrentCreator
  ], shallow)


  if (!creators || !currentCreator)
    return <div />

  return (
    <Row>
      <Col>
        <div className='border-bottom p-3 d-flex flex-row justify-content-end'>
          <CreatorDropdown
            creators={creators as CreatorType[]}
            active={currentCreator}
            setActive={setCurrentCreator}
          />
        </div>
      </Col>
    </Row>
  )
}


export default Header
