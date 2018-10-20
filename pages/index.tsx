import {Component} from 'react'

import '../styles/index.scss'

interface Props {
  cart: object,
  shopName: string,
}

export default class Checkout extends Component<Props> {
  public static getInitialProps({req}): Props {
    return {
      cart: JSON.parse(decodeURIComponent(req.session.cart)),
      shopName: req.session.shopName,
    }
  }

  public render() {
    return <div className='grid-x'>
      <div className='cell small-12 medium-8'>
        <h1>{this.props.shopName}</h1>
      </div>
      <div className='cell show-for-medium medium-4'>
        right
      </div>
    </div>
  }
}
