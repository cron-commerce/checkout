import {Component} from 'react'

import '../styles/index.scss'

interface Props {
  cart: object,
}

export default class Checkout extends Component<Props> {
  public static getInitialProps(ctx): Props {
    const cart = JSON.parse(decodeURIComponent(ctx.req.session.cart))
    return {cart}
  }

  public render() {
    return <div className='grid-x'>
      <div className='cell small-12 medium-8'>
        <h1>Checkout</h1>
      </div>
      <div className='cell show-for-medium medium-4'>
        right
      </div>
    </div>
  }
}
