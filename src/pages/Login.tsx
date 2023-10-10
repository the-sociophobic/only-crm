import React from 'react'

import { useMutation, useQueryClient } from 'react-query'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { auth } from '../queries'
import Logo from '../components/Common/Logo'
import MemberForm from '../components/Members/MemberForm'


const Login: React.FC = () => {
  const [error, setError] = React.useState('')
  const queryClient = useQueryClient()
  const authMutation = useMutation({
    mutationFn: props => {
      console.log('AUTH');
      return auth(props as any);
    },
    onSuccess: () => {
      console.log('Success')
      setError('')
      queryClient.invalidateQueries('user')
    },
    onError(error: Error | any, variables, context) {
      console.log('ERROR ', error)
      setError(error.toString())
    },
  })

  return (
    <Col className='d-flex flex-column justify-content-start'>
      <Row className='d-flex flex-column justify-content-center'>
        <div className='col-md-5 col-lg-4 mx-auto mw-420'>
          <Logo />
          <h2 className='h2 mb-3 text-center pt-8'>
            Sign in
          </h2>
          <small className='d-block mb-38 text-center'>
            Or <Link to='/register'>create an account</Link>
          </small>
          {error.length > 0 &&
            <small className='text-red d-block mb-3'>
              {error}
            </small>
          }
          <MemberForm
            fieldNames={['username', 'password']}
            onSubmit={authMutation.mutate as any}
            buttonText='Login'
          />
          <small className='d-block mt-3 text-center mb-5'>
            Forgot password ?
          </small>
        </div>
      </Row>
    </Col>
  )
}

export default Login
