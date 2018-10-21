import {Component} from 'react'

import '../styles/index.scss'

import Account from '../components/account'
import Address from '../components/address'
import Header from '../components/header'
import Items from '../components/items'
import Nav from '../components/nav'
import Prices from '../components/prices'

interface Props {
  cart: Cart,
  shopName: string,
}

export type setAccount = (account: Account) => any
export type setAddress = (address: Address) => any

export default class Checkout extends Component<Props> {
  public static getInitialProps({req}): Props {
    return {
      cart: JSON.parse(decodeURIComponent(req.session.cart || 'null')),
      shopName: req.session.shopName,
    }
  }

  public state: {
    account: Account,
    shippingAddress: Address,
  } = {
    account: null,
    shippingAddress: null,
  }

  public render() {
    return <div className='grid-x'>
      <div className='cell small-12 medium-7'>
        <Header />
        <Account setAccount={this.setAccount} />
        <Address setAddress={this.setAddress} />
        <Nav />
      </div>

      <div className='cell show-for-medium medium-5'>
        <h2>Order Summary</h2>
        <Items cart={this.props.cart} />
        <Prices />
      </div>
    </div>
  }

  private setAddress: setAddress = (address: Address) => this.setState({...this.state, address})
  private setAccount: setAccount = (account: Account) => this.setState({...this.state, account})
}
