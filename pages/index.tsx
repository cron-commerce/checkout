import {Component} from 'react'

import '../styles/index.scss'

import Confirm from '../components/confirm'
import EmailForm from '../components/email-form'
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

export type SetAddress = (address: Address) => any
export type SetCustomerEmail = (customerEmail: string) => any
export type SetShippingRate = (shippingRate: ShippingRate) => any
export type SetStripeToken = (strikeToken: string) => any

export default class Checkout extends Component<Props> {
  public static getInitialProps({req}): Props {
    return {
      cart: JSON.parse(decodeURIComponent(req.session.cart || 'null')),
      shopName: req.session.shopName,
    }
  }

  public state: {
    customerEmail: string,
    shippingAddress: Address,
    shippingRate: ShippingRate,
    stripeToken: string,
  } = {
    customerEmail: null,
    shippingAddress: null,
    shippingRate: null,
    stripeToken: null,
  }

  public render() {
    return <div className='grid-x'>
      <div className='cell small-12 medium-7'>
        <Header />
        <EmailForm setCustomerEmail={this.setCustomerEmail} />
        <ShippingAddressForm setShippingAddress={this.setShippingAddress} />
        <ShippingRateChooser setShippingRate={this.setShippingRate} shippingAddress={this.state.shippingAddress} shopName={this.props.shopName} />
        <PaymentChooser setStripeToken={this.setStripeToken} shopName={this.props.shopName} />
        <Confirm />
      </div>

      <div className='cell show-for-medium medium-5'>
        <h2>Order Summary</h2>
        <Items cart={this.props.cart} />
        <Prices />
      </div>
    </div>
  }

  private setCustomerEmail: SetCustomerEmail = customerEmail => this.setState({...this.state, customerEmail})
  private setShippingAddress: SetAddress = shippingAddress => this.setState({...this.state, shippingAddress})
  private setShippingRate: SetShippingRate = shippingRate => this.setState({...this.state, shippingRate})
  private setStripeToken: SetStripeToken = stripeToken => this.setState({...this.state, stripeToken})
}
