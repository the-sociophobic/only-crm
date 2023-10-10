import React from 'react'

import { Button, Col, Row } from 'react-bootstrap'

import { CreatorType } from '../../models'
import { useDeleteCreator, useUpdateCreator } from '../../hooks/async/creators'
import { usePopup } from '../Common/Popup'
import MemberForm from '../Members/MemberForm'


export type CreatorItemProps = {
  creator: CreatorType
}


const CreatorItem: React.FC<CreatorItemProps> = ({
  creator
}) => {
  const { mutate: updateCreator, isLoading: beingUpdated } = useUpdateCreator()
  const { mutate: deleteCreator, isLoading: beingDeleted } = useDeleteCreator()
  const { openPopup, closePopup } = usePopup()
  const [fakeDeleted, setFakeDeleted] = React.useState(false)

  return fakeDeleted ?
    <></>
    :
    <Row className='px-3 py-1 d-flex flex-row align-items-center'>
      <hr className='m-0 mb-2' />
      <Col>
        <img
          src={creator.avatar50}
          className='avatar'
        />
      </Col>
      <Col>
        {creator.username}
      </Col>
      <Col>
        <Button onClick={() => openPopup(
          <>
            <h2 className='h2'>
              Edit {creator.username}
            </h2>
            <MemberForm
              fieldNames={['age', 'name', 'country', 'proxy']}
              onSubmit={fields => {
                updateCreator({
                  ...fields,
                  creator_id: creator.creator_id
                } as CreatorType)
                closePopup()
              }}
              initialValue={creator}
              buttonText='Save'
              onCancel={closePopup}
            />
          </>
        )}>
          {!beingUpdated ? 'Edit' : 'Loading...'}
        </Button>
      </Col>
      <Col>
        <Button onClick={() => setFakeDeleted(true)}>
          Delete
        </Button>
      </Col>
    </Row>
}


export default CreatorItem
