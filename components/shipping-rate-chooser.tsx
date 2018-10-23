import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'

import {SetShippingRate} from '../pages/index'

interface Props {
  setShippingRate: SetShippingRate,
  shippingAddress: Address,
  shopName: string,
}

const QUERY = gql`
  query shippingRates($shopName: String!) {
    shippingRates(shopName: $shopName) {
      title
      code
      price
      description
      currency
    }
  }
`

export default class ShippingRateChooser extends Component<Props> {
  public state = {
    inputs: {
      shippingRate: null,
    },
  }

  public render() {
    return <Query query={QUERY} variables={{shopName: this.props.shopName}}>
      {({data, loading, error}) => {
        if (loading) { return <div>loading...</div> }
        if (error) { return <div>error</div> }

        return <form onSubmit={this.handleFormSubmit}>
          <h2>Shipping Method</h2>
          <div className='bordered'>
            {data.shippingRates.map((shippingRate: ShippingRate) => <div className='flex-container' key={shippingRate.code}>
              <div className='flex-child-shrink'>
                <input id={shippingRate.code} name='shippingRate' onChange={this.handleShippingRateChange(shippingRate)} type='radio' />
                <label htmlFor={shippingRate.code}>{shippingRate.title}</label>
              </div>
              {shippingRate.title}
            </div>)}
          </div>
          <div>
            <button className='button' disabled={!this.state.inputs.shippingRate} type='submit'>Next</button>
          </div>
        </form>
      }}
    </Query>
  }

  private handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.setShippingRate(this.state.inputs.shippingRate)
  }

  private handleShippingRateChange = (shippingRate: ShippingRate) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = this.state
    state.inputs.shippingRate = shippingRate
    this.setState(state)
  }
}
