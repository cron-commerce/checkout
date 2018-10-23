import {Component, createContext} from 'react'

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

interface CheckoutContextInterface {
  customerEmail: string,
  setCustomerEmail: SetCustomerEmail,
  setShippingAddress: SetAddress,
  setShippingRate: SetShippingRate,
  shippingAddress: Address,
  shippingRate: ShippingRate,
  shopName: string,
}

export const CheckoutContext = createContext<CheckoutContextInterface>({} as any)

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
    const contextValue = {
      customerEmail: this.state.customerEmail,
      setCustomerEmail: this.setCustomerEmail,
      setShippingAddress: this.setShippingAddress,
      setShippingRate: this.setShippingRate,
      shippingAddress: this.state.shippingAddress,
      shippingRate: this.state.shippingRate,
      shopName: this.props.shopName,
    }

    return <CheckoutContext.Provider value={contextValue}>
      <div className='grid-x'>
        <div className='cell small-12 medium-7'>
          <Header />
          <EmailForm />
          <ShippingAddressForm />
          <ShippingRateChooser />
          <PaymentChooser setStripeToken={this.setStripeToken} shopName={this.props.shopName} />
          <Confirm />
        </div>

        <div className='cell show-for-medium medium-5'>
          <h2>Order Summary</h2>
          <Items cart={this.props.cart} />
          <Prices />
        </div>
      </div>
    </CheckoutContext.Provider>
  }

  private setCustomerEmail: SetCustomerEmail = customerEmail => this.setState({...this.state, customerEmail})
  private setShippingAddress: SetAddress = shippingAddress => this.setState({...this.state, shippingAddress})
  private setShippingRate: SetShippingRate = shippingRate => this.setState({...this.state, shippingRate})
  private setStripeToken: SetStripeToken = stripeToken => this.setState({...this.state, stripeToken})
}
