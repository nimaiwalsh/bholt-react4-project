import React from 'react'
import { create } from 'react-test-renderer'
import Details from '../Details'

//npx jest 
//npx jest -update s
//npx jest -- --watch

//Snapshot takes a snapshot of the current component.
//Easy to write, low-confidence test. Good for API test
//If anythingis changed the second time test is run and something
//changed the test fails
test('snapshot', () => {
  const c = create(<Details />)
  expect(c.toJSON()).toMatchSnapshot()
})

test('show modal when toggleModal is called', () => {
  const c = create(<Details search={() => {}} />)
  const instance = c.getInstance()

  expect(instance.state.showModal).toBe(false)
  instance.toggleModal()
  expect(instance.state.showModal).toBe(true)
})