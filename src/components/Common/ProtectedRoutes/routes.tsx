import Login from '../../../pages/Login'
import Register from '../../../pages/Register'
import Analytics from '../../../pages/Analytics'
import Tasks from '../../../pages/Tasks'
import Members from '../../../pages/Members'
import Reports from '../../../pages/Reports'
import Fans from '../../../pages/Fans'
import AutoFollow from '../../../pages/AutoFollow'
import Settings from '../../../pages/Settings'
import Creators from '../../../pages/Creators'

import { ReactComponent as AnalyticsSVG } from '../../../assets/images/svg/analytics.svg'
import { ReactComponent as ReportsSVG } from '../../../assets/images/svg/reports.svg'
import { ReactComponent as FansSVG } from '../../../assets/images/svg/fans.svg'
import { ReactComponent as AutoFollowSVG } from '../../../assets/images/svg/auto-follow.svg'
import { ReactComponent as PromoSVG } from '../../../assets/images/svg/auto-follow.svg'
import { ReactComponent as TasksSVG } from '../../../assets/images/svg/auto-follow.svg'
import { ReactComponent as MessagesSVG } from '../../../assets/images/svg/messages.svg'
import { ReactComponent as SettingsSVG } from '../../../assets/images/svg/settings.svg'
import Promo from '../../../pages/Promo'


export type RouteType = {
  to: string
  title?: string
  Comp: any
  exact?: boolean
  unauthorized?: boolean
  svg?: any
}


const authorized_routes: RouteType[] = [
  {
    to: '/analytics',
    title: 'Analytics',
    Comp: <Analytics />,
    svg: AnalyticsSVG,
  },
  {
    to: '/reports',
    title: 'Reports',
    Comp: <Reports />,
    svg: ReportsSVG,
  },
  {
    to: '/fans',
    title: 'Fans',
    Comp: <Fans />,
    svg: FansSVG,
  },
  {
    to: '/creators',
    title: 'Creators',
    Comp: <Creators />,
    svg: MessagesSVG,
  },
  {
    to: '/members',
    title: 'Members',
    Comp: <Members />,
    svg: FansSVG,
  },
  {
    to: '/auto-follow',
    title: 'Auto Follow',
    Comp: <AutoFollow />,
    svg: AutoFollowSVG,
  },
  {
    to: '/promo',
    title: 'Promo',
    Comp: <Promo />,
    svg: PromoSVG,
  },
  {
    to: '/tasks',
    title: 'Tasks',
    Comp: <Tasks />,
    svg: TasksSVG,
  },
  {
    to: '/settings',
    title: 'Settings',
    Comp: <Settings />,
    svg: SettingsSVG,
  },
]

const unauthorized_routes: RouteType[] = [
  {
    to: '/login',
    title: 'Login',
    Comp: <Login />,
  },
  {
    to: '/register',
    title: 'Register',
    Comp: <Register />,
  },
]


export {
  authorized_routes,
  unauthorized_routes
}
