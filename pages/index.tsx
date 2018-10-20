import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'

import '../styles/index.scss'

interface Props {
  cart: object,
  shopName: string,
}

const query = gql`
  query {
    hello
  }
`

export default class Checkout extends Component<Props> {
  public static getInitialProps({req}): Props {
    return {
      cart: JSON.parse(decodeURIComponent(req.session.cart || 'null')),
      shopName: req.session.shopName,
    }
  }

  public render() {
    return <Query query={query}>
      {({data}) => {
        console.log(data)
        return <div className='grid-x'>
          <div className='cell small-12 medium-8'>
            <h1>{this.props.shopName}</h1>
          </div>
          <div className='cell show-for-medium medium-4'>
            right
          </div>
        </div>
      }}
    </Query>
  }
}
