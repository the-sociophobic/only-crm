import React from 'react'

import { Button, Col, Row } from 'react-bootstrap'

import { useDeleteMember, useUpdateMember } from '../../hooks/async/members'
import { UserType, UserTypeMain } from '../../models'
import { usePopup } from '../Common/Popup'
import MemberForm from './MemberForm'
import useStore from '../../hooks/useStore'


export type MemberItemProps = {
  member: UserType,
}


const MemberItem: React.FC<MemberItemProps> = ({
  member: member
}) => {
  const { mutate: deleteMember, isLoading: beingDeleted } = useDeleteMember()
  const { mutate: updateMember, isLoading: beingUpdated } = useUpdateMember()
  const { openPopup, closePopup } = usePopup()
  const currentUser = useStore(state => state.user)
  const isCurrentUser = currentUser?.username === member.username

  return (
    <Row className='px-3 py-1 d-flex flex-row align-items-center'>
      <hr className='m-0 mb-2' />
      <Col>
        {member.username}
      </Col>
      <Col>
        {member.name}
      </Col>
      <Col>
        {!isCurrentUser &&
          <Button onClick={() => openPopup(
            <>
              <h2 className='h2'>
                Edit member
              </h2>
              <MemberForm
                fieldNames={['name', 'password']}
                onSubmit={fields => {
                  updateMember({
                    ...fields,
                    user_id: member.user_id
                  } as UserTypeMain)
                  closePopup()
                }}
                initialValue={member}
                buttonText='Save'
                onCancel={closePopup}
              />
            </>
          )}>
            {!beingUpdated ? 'Edit' : 'Loading...'}
          </Button>
        }
      </Col>
      <Col>
        {!isCurrentUser &&
          <Button onClick={() => deleteMember(member.user_id)}>
            {!beingDeleted ? 'Delete' : 'Loading...'}
          </Button>
        }
      </Col>
    </Row>
  )
}


export default MemberItem
