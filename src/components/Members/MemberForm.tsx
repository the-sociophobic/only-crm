import React from 'react'

import { Button, Col, Form, Row } from 'react-bootstrap'

import { IteratableObject, UserTypePartial } from '../../models'
import capitalize from '../../utils/capitalize'
import HidePassword from '../../assets/images/svg/hide-password.svg'


export type MemberFormProps = {
  fieldNames: string[]
  onSubmit: (fields: UserTypePartial) => any
  initialValue?: UserTypePartial
  buttonText?: string
  onCancel?: () => void
}


const MemberForm: React.FC<MemberFormProps> = ({
  fieldNames,
  initialValue,
  onSubmit,
  buttonText,
  onCancel
}) => {
  const [validated, setValidated] = React.useState(false)
  const emptyState = fieldNames
    .map(fieldName => ({ [fieldName]: '' }))
    .reduce((a, b) => ({ ...a, ...b }))
  const [state, setState] = React.useState<UserTypePartial & IteratableObject>(initialValue || emptyState)
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <Form onSubmit={e => {
      e.preventDefault()
      if (e.currentTarget.checkValidity() === false)
        e.preventDefault()
      else
        onSubmit(state)
        setValidated(true)
    }}>
      {fieldNames.map(fieldName =>
        <Row
          key={fieldName}
          className='mb-4'
        >
          <Form.Group
            as={Col}
            key={fieldName}
            controlId={fieldName}
            className=' position-relative'
          >
            <Form.Control
              required
              type={(() => {
                switch(fieldName) {
                  case 'email':
                    return 'email'
                  case 'password':
                    return showPassword ? 'text' : 'password'
                  default:
                    return 'text'
                }
              })()}
              placeholder={fieldName === 'username' ? 'Email' : capitalize(fieldName)}
              value={state[fieldName]}
              onChange={e => setState({ ...state, [fieldName]: e.target.value })}
            />
            {fieldName === 'password' &&
              <img
                src={HidePassword}
                className='show-password'
                onClick={() => setShowPassword(!showPassword)}
              />
            }
          </Form.Group>
        </Row>
      )}
      <div className='d-flex flex-row'>
        <Button type='submit' className='flex-grow-1'>
          {buttonText || 'Submit'}
        </Button >
        {/* {onCancel &&
          <Button
            onClick={onCancel}
            className='ms-3'
          >
            Cancel
          </Button >
        } */}
      </div>
    </Form >
  )
}


export default MemberForm
