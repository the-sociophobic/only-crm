import React, { useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import useDropdown from '../hooks/useDropdown'
import SampleGraph from '../components/Graphs/SampleGraph'
import useStore from '../hooks/useStore'
import capitalize from '../utils/capitalize'
import { useQuery } from 'react-query'
import { getStats, refresh_payments } from '../queries'
import TopFans from '../components/Graphs/TopFans'

export interface Stats {
  total: number
  count: number
  avg: number
}

const Analytics: React.FC = () => {
  const [period, PeriodDropdown] = useDropdown(['Last 30 days', 'Last 2 month', 'Last 3 month'])
  const [revenueType, RevenueTypeDropdown] = useDropdown(['Net Revenue', 'Matrix Revenue'])
  const currentCreator = useStore(state => state.currentCreator)

  let { data: stats } = useQuery<Stats>(
    ['stats', currentCreator],
    () => {
      if (!currentCreator) return { total: 0.0, count: 0, avg: 0.0 }
      return getStats(currentCreator?.creator_id)
    }
  )

  useEffect(() => {
    if (currentCreator) {
      refresh_payments(currentCreator.creator_id)
        .catch(error => {
          console.error('Error refreshing payments:', error);
        });
    }
  }, [currentCreator]);

  if (!currentCreator) return null

  if (!stats) {
    stats = { total: 0.0, count: 0, avg: 0.0 }
  }
  return (
    <>
      <Col>
        <Card className='mb-3'>
          <Card.Body>
            <Row>
              <Col className='col-6'>
                <h1 className='h1 text-left'>
                  {capitalize(currentCreator.username)} Analytics
                </h1>
              </Col>
              <Col className='col-2'>
                <Card className="text-center p-10">
                  <Card.Title> {`$${stats.total.toFixed(2)}`} </Card.Title>
                  <Card.Subtitle> Total earnings </Card.Subtitle>
                </Card>
              </Col>

              <Col className='col-2'>
                <Card className="text-center p-10">
                  <Card.Title> {`${stats.count}`} </Card.Title>
                  <Card.Subtitle> Purchase count </Card.Subtitle>
                </Card>
              </Col>

              <Col className='col-2'>
                <Card className="text-center p-10">
                  <Card.Title> {`$${stats.avg.toFixed(2)}`} </Card.Title>
                  <Card.Subtitle> Average purchase </Card.Subtitle>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      {/* <Col className='d-flex flex-row'>
        <PeriodDropdown className='ms-auto me-3' />
        <RevenueTypeDropdown />
      </Col> */}
      <Row className='mt-4'>
        <Col className='stat-block'>
          <h2 className='h2'>Earning Metrics</h2>
          <Card>
            <Card.Body className='Graph-Card'>
              <SampleGraph />
            </Card.Body>
          </Card>
        </Col>
        <Col className='stat-block'>
          <h2 className='h2'>Top Fans</h2>
          <Card>
            <Card.Body className='table-card'>
              <TopFans />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}


export default Analytics
