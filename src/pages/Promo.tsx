import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { get, post, put } from '../queries/utils'
import useStore from '../hooks/useStore';
import { useQuery } from 'react-query';
import { collectLink, getLinks } from '../queries';

export interface PromoLink {
  id: number;
  creator: string;
  link_id: number;
  name: string;
  subscribers: number;
  payments: number;
  average: number;
  median: number;
  paying: number;
  total: number;
  created_at: number;
}

const Promo: React.FC = () => {
  const currentCreator = useStore(state => state.currentCreator)
  let { data: links } = useQuery<PromoLink[]>(
    [currentCreator],
    () => {
      if (!currentCreator) return []
      return getLinks(currentCreator?.creator_id)
    }
  )

  return (
    <>
      <h1>Promo Links</h1>

      <section className="link-container">

        {links?.map(link => (
          <Card key={link.id} className="promo-card">
            <Card.Body>
              <Card.Title>{link.name}</Card.Title>
              <Card.Text>
                Created: <span>{new Date(link.created_at * 1000).toLocaleDateString()}</span>
              </Card.Text>
              <Card.Text>
                Subscribers: <span>{link.subscribers}</span>
              </Card.Text>
              <Card.Text>
                Paying: <span>{link.paying || 0}</span>
              </Card.Text>
              <Card.Text>
                Payments: <span>{link.payments}</span>
              </Card.Text>
              <Card.Text>
                Average: <span>{link.average.toFixed(2) || 0}</span>
              </Card.Text>
              <Card.Text>
                Median: <span>{link.median.toFixed(2) || 0}</span>
              </Card.Text>
              <Card.Text>
                Total: <span>{link.total.toFixed(2) || 0}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}

      </section>

    </>
  )
};

export default Promo;
