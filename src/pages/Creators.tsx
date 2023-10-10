import React from 'react'

import { Row, Col } from 'react-bootstrap'
import { useQuery } from 'react-query'

import CreatorItem from '../components/Creators/CreatorItem'
import useStore from '../hooks/useStore'
import { CreatorType } from '../models'
import { getCreators } from '../queries'


const Creators: React.FC = () => {
  const currentUser = useStore(state => state.user)
  const { data: creators } = useQuery<CreatorType[]>('models', () => {
    if (!currentUser) return []
    return getCreators(currentUser.account)
  })

  return !creators ?
    <p>Loading...</p>
    :
    <>
      <Row>
        <Col>
          <h1 className='h1 text-left my-4'>
            Creators ({creators.length})
          </h1>
        </Col>
      </Row>
      <Col>
        {creators.map(creator =>
          <CreatorItem creator={creator} />
        )}
      </Col>
    </>
}


export default Creators
