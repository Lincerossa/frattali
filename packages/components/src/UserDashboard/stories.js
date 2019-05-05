import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import UserDashboard from './index'

storiesOf('UserDashboard', module).add('default', () => (
  <UserDashboard
    handleLogout={action('chiuso')}
    username="marcello luatti"
    LinkComponent={({ children, ...props }) => (
      <a href={props.to}>{children}</a>
    )}
    links={[
      {
        text: 'paintings',
        link: '/paintings',
      },
    ]}
    LogoutIcon={() => <div>L</div>}
    picture="https://www.unsplash.it/300/400"
  />
))
