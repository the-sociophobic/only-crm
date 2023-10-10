import React from 'react'

import { Row, Col, Card, Button } from 'react-bootstrap'

import useStore from '../hooks/useStore'
import { _delete } from '../queries/utils'
import MemberItem from '../components/Members/MemberItem'
import { usePopup } from '../components/Common/Popup'
import MemberForm from '../components/Members/MemberForm'
import { useAddMember, useMembers } from '../hooks/async/members'
import { UserType } from '../models'


const Members: React.FC = () => {
  const currentUser = useStore(state => state.user) || { account: 0, id: 0 }
  const { data: members, isLoading } = useMembers(currentUser?.account || 0)
  const { openPopup, closePopup } = usePopup()
  const { mutate: addMember } = useAddMember(currentUser.account)

  return <>
    <Row>
      <Col>
        <Card className='mb-3'>
          <Card.Body>
            <div className='d-flex flex-row'>
              <h2 className='h2 text-left me-auto'>
                Members ({members?.length})
              </h2>
              <Button onClick={() => openPopup(
                <>
                  <h2 className='h2'>
                    Add member
                  </h2>
                  <MemberForm
                    fieldNames={['username', 'password', 'name']}
                    onSubmit={fields => {
                      addMember(fields as UserType)
                      closePopup()
                    }}
                    buttonText='Add'
                    onCancel={closePopup} />
                </>
              )}>
                Add member
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Col>
      <Card>
        <Card.Body className='p-0'>
          <Row className='px-3 py-1'>
            <Col>
              <b>username</b>
            </Col>
            <Col>
              <b>name</b>
            </Col>
            <Col />
            <Col />
          </Row>
          {members
            ?.sort((a, b) => {
              if (a.id === currentUser.id)
                return 1
              else if (b.id === currentUser.id)
                return -1
              return a.username?.localeCompare(b.username + '') || 1
            })
            ?.map?.(member =>
              <MemberItem
                key={member.user_id}
                member={member as any}
              />
            )}
        </Card.Body>
      </Card>
    </Col>
  </>
}


export default Members
