import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import UserDashboard from './index'

storiesOf('Sidebar', module).add('default', () => (
  <UserDashboard
    onClose={action('chiuso')}
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
    picture="https://www.unsplash.it/300/400"
  />
))
