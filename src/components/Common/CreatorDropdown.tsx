import React from 'react'

import { Dropdown } from 'react-bootstrap'

import { CreatorType } from '../../models'


export type CreatorDropdownProps = {
  className?: string
  active: CreatorType
  setActive: (value: CreatorType) => void
  creators: CreatorType[]
}


const CreatorDropdown: React.FC<CreatorDropdownProps> = ({
  active,
  setActive,
  creators
}) => {
  const renderCreator = (creator: CreatorType) =>
    <>
      <img className='toggle-avatar'
        src={creator.avatar50}
      />
      {creator.username}
    </>

  return (
    <Dropdown>
      <Dropdown.Toggle
        className='creators_toggle'
        // variant='secondary'
      >
        {renderCreator(active)}
      </Dropdown.Toggle>

      <Dropdown.Menu className='creators_toggle_menu'>
        {creators.map(creator => (
          <Dropdown.Item
            className='creators_toggle_element'
            key={creator.creator_id}
            onClick={() => setActive(creator)}
          >
            {renderCreator(creator)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}


export default CreatorDropdown
