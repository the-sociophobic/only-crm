import React from 'react'

import { Row, Col, Card } from 'react-bootstrap'


const Reports: React.FC = () => {

  return (
    <>
      <Row>
        <Col>
          <h1 className='h1 text-left my-4'>
            Reports
          </h1>
        </Col>
      </Row>
      <Col>
        <Card className='h-200'>
          <Card.Body>
            Reports handling soon!
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}


export default Reports
