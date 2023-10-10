import React from 'react'

import { Row, Col, Card } from 'react-bootstrap'


const SmartMessages: React.FC = () => {

  return (
    <>
      <Row>
        <Col>
          <h1 className='h1 text-left my-4'>
            SmartMessages
          </h1>
        </Col>
      </Row>
      <Col>
        <Card className='h-200'>
          <Card.Body>
            Smart Messages mailing soon!
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}


export default SmartMessages
