import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Board from './Board'
import { Provider } from 'react-redux'
import store from '../../reducers/store'

test('board is rendered', () => {
  const component = render(
    <Provider store={store}>
      <Board />
    </Provider>
  )

  // test 1
  const div = component.container.querySelector('.firstRoot')
  expect(div).toBeDefined()

})

