import {Component} from 'react'

import '../styles/index.scss'

import CreditCardForm from '../components/credit-card-form'
import Header from '../components/header'
import Items from '../components/items'
import Prices from '../components/prices'
import ShippingAddressForm from '../components/shipping-address-form'

interface Props {
  cart: Cart,
  shopName: string,
}

export type setAddress = (address: Address) => any

export default class Checkout extends Component<Props> {
  public static getInitialProps({req}): Props {
    return {
      cart: JSON.parse(decodeURIComponent(req.session.cart || 'null')),
      shopName: req.session.shopName,
    }
  }

  public state: {
    shippingAddress: Address,
  } = {
    shippingAddress: null,
  }

  public render() {
    return <div className='grid-x'>
      <div className='cell small-12 medium-7'>
        <Header />
        {!this.state.shippingAddress ? <ShippingAddressForm setShippingAddress={this.setShippingAddress} /> : <CreditCardForm />}
      </div>

      <div className='cell show-for-medium medium-5'>
        <h2>Order Summary</h2>
        <Items cart={this.props.cart} />
        <Prices />
      </div>
    </div>
  }

  private setShippingAddress: setAddress = (shippingAddress: Address) => this.setState({...this.state, shippingAddress})
}
