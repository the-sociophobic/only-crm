import React from 'react'

import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap'
import submitFieldNames from '../utils/submitFieldNames'
import { auth, register } from '../queries'
import { useMutation, useQueryClient } from 'react-query'


const Login: React.FC = () => {
  const [activeKey, setActiveKey] = React.useState('login')
  const registerFieldNames = ['username', 'password', 'firstname', 'lastname']
  const renderField = (fieldName: string) =>
    <Form.Group as={Col} controlId={fieldName}>
      <Form.Label>{fieldName}</Form.Label>
      <Form.Control
        type={['email', 'password'].includes(fieldName) ? fieldName : 'text'}
        placeholder={`Enter ${fieldName}`}
      />
    </Form.Group>
  const fieldsMapped = registerFieldNames.map(fieldName => renderField(fieldName))

  const queryClient = useQueryClient()
  const authMutation = useMutation(props => auth(props as any), {
    onSuccess: () => queryClient.invalidateQueries('user')
  })
  const registerMutation = useMutation(props => register(props as any), {
    onSuccess: () => queryClient.invalidateQueries('user')
  })

  const renderLogin = () => (
    <Form onSubmit={submitFieldNames(registerFieldNames.slice(0, 2), authMutation.mutate as any)}>
      <Row className='mb-4'>
        {fieldsMapped.slice(0, 2)}
      </Row>
      <Button type='submit'>Login</Button>
    </Form>
  )

  const renderRegister = () => (
    <Form onSubmit={submitFieldNames(registerFieldNames, registerMutation.mutate as any)}>
      <Row className='mb-4'>
        {fieldsMapped.slice(0, 2)}
      </Row>
      <Row className='mb-4'>
        {fieldsMapped.slice(2)}
      </Row>

      <Button type='submit'>Register</Button>
    </Form>
  )

  const renderActive = () => {
    switch (activeKey) {
      case 'login':
        return renderLogin()
      case 'register':
        return renderRegister()
    }
  }

  return (
    <Container className='mt-5'>
      <Nav
        fill
        variant='tabs'
        activeKey={activeKey}
        onSelect={eventKey => setActiveKey(eventKey + '')}
        className='mb-5'
      >
        <Nav.Item>
          <Nav.Link eventKey='login'>Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='register'>Register</Nav.Link>
        </Nav.Item>
      </Nav>
      {renderActive()}
    </Container>
  )
}


export default Login
