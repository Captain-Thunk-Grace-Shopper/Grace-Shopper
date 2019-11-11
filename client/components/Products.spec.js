/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Products from './Products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Products', () => {
  let products

  beforeEach(() => {
    products = shallow(<Products products={{name: 'bananas'}} />)
  })

  it('renders the product name in an b', () => {
    expect(products.find('b').text()).to.be.equal('bananas')
  })
})
