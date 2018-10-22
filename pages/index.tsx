import {Component} from 'react'

import '../styles/index.scss'

import Header from '../components/header'
import Items from '../components/items'
import PaymentChooser from '../components/payment-chooser'
import Prices from '../components/prices'
import ShippingAddressForm from '../components/shipping-address-form'
import ShippingRateChooser from '../components/shipping-rate-chooser'

interface Props {
  cart: Cart,
  shopName: string,
}

export type setAddress = (address: Address) => any
export type setShippingRate = (shippingRate: ShippingRate) => any

export default class Checkout extends Component<Props> {
  public static getInitialProps({req}): Props {
    return {
      cart: JSON.parse(decodeURIComponent(req.session.cart || 'null')),
      shopName: req.session.shopName,
    }
  }

  public state: {
    shippingAddress: Address,
    shippingRate: ShippingRate,
  } = {
    shippingAddress: null,
    shippingRate: null,
  }

  public render() {
    return <div className='grid-x'>
      <div className='cell small-12 medium-7'>
        <Header />
        {this.renderStep()}
      </div>

      <div className='cell show-for-medium medium-5'>
        <h2>Order Summary</h2>
        <Items cart={this.props.cart} />
        <Prices />
      </div>
    </div>
  }

  private renderStep = () => {
    if (!this.state.shippingAddress) { return <ShippingAddressForm setShippingAddress={this.setShippingAddress} /> }
    if (!this.state.shippingRate) {
      return <ShippingRateChooser
        setShippingRate={this.setShippingRate}
        shippingAddress={this.state.shippingAddress}
        shopName={this.props.shopName}
      />
    }
    return <PaymentChooser shopName={this.props.shopName} />
  }

  private setShippingAddress: setAddress = (shippingAddress: Address) => this.setState({...this.state, shippingAddress})
  private setShippingRate: setShippingRate = (shippingRate: ShippingRate) => this.setState({...this.state, shippingRate})
}
