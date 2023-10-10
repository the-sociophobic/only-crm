import React from 'react'

import { useMutation, useQueryClient } from 'react-query'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { register } from '../queries'
import Logo from '../components/Common/Logo'
import MemberForm from '../components/Members/MemberForm'


const Register: React.FC = () => {
  const [error, setError] = React.useState('')
  const queryClient = useQueryClient()
  const registerMutation = useMutation({
    mutationFn: props =>
      register(props as any),
    onSuccess: () => {
      setError('')
      queryClient.invalidateQueries('user')
    },
    onError(error: Error | any, variables, context) {
      setError(error.toString())
    },
  })

  return (
    <Col className='d-flex flex-column justify-content-start'>
      <Row className='d-flex flex-column justify-content-center'>
        <div className='col-md-5 col-lg-4 mx-auto mw-420'>
          <Logo />
          <h2 className='h2 mb-3 text-center pt-8'>
            Register
          </h2>
          <small className='d-block mb-38 text-center'>
            Or <Link to='/login'>sign in to your account</Link>
          </small>
          {error.length > 0 &&
            <small className='text-red d-block mb-3'>
              {error}
            </small>
          }
          <MemberForm
            fieldNames={['username', 'password', 'name']}
            onSubmit={registerMutation.mutate as any}
            buttonText='Register'
          />
          <small className='d-block mt-3 text-center mb-5'>
            By signing up you agree to our terms
          </small>
        </div>
      </Row>
    </Col>
  )
}


export default Register
