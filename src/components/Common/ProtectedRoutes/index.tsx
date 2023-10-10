import React from 'react'

import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import useStore from '../../../hooks/useStore'
import TitleWrapper from '../TitleWrapper'
import Layout from '../Layout'
import Loader from '../Loader'
import { RouteType, authorized_routes, unauthorized_routes } from './routes'
import { useUser } from '../../../hooks/async/user'
import { useCreators } from '../../../hooks/async/creators'


const mapRoutes = (routes: RouteType[], withLayout?: boolean) =>
  <Routes>
    {routes.map(route => (
      <Route
        key={route.to}
        path={route.to}
        element={
          <TitleWrapper title={route.title}>
            {withLayout ?
              <Layout>
                {route.Comp}
              </Layout>
              :
              route.Comp
            }
          </TitleWrapper>
        }
      />
    ))}
    <Route
      path="*"
      element={
        <Navigate
          to={{
            pathname: routes[0].to,
            search: window.location.search
          }}
          replace
        />
      }
    />
  </Routes>


const ProtectedRoutes: React.FC = () => {
  const { data: user, isLoading: loadingUser } = useUser()
  const { data: creators, isLoading: loadingCreators } = useCreators()

  if (loadingUser || loadingCreators)
    return <Loader />

  const currentCreator = creators && creators.length > 0 ? creators[0] : null

  useStore.setState({
    user,
    creators,
    currentCreator
  })

  return mapRoutes(user ? authorized_routes : unauthorized_routes, !!user)
}


export default ProtectedRoutes
