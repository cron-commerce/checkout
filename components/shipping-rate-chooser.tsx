import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'

import {CheckoutContext} from '../pages/index'

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

export default class ShippingRateChooser extends Component<{}> {
  public state = {
    inputShippingRate: null,
  }

  public render() {
    return <CheckoutContext.Consumer>
      {({setShippingRate, shippingAddress, shopName}) => {
        if (!shippingAddress) { return <div>Enter your shipping address</div> }

        return <Query query={QUERY} variables={{shopName}}>
          {({data, loading, error}) => {
            if (loading) { return <div>loading...</div> }
            if (error) { return <div>error</div> }

            return <form>
              <fieldset>
                <legend className='h2'>Shipping Rate</legend>
                <div className='bordered'>
                  {data.shippingRates.map((shippingRate: ShippingRate) => <div className='flex-container' key={shippingRate.code}>
                    <div className='flex-child-shrink'>
                      <input id={shippingRate.code} name='shippingRate' onChange={this.handleShippingRateChange(setShippingRate)(shippingRate)} type='radio' />
                      <label htmlFor={shippingRate.code}>{shippingRate.title}</label>
                    </div>
                    {shippingRate.title}
                  </div>)}
                </div>
              </fieldset>
            </form>
          }}
        </Query>
      }}
    </CheckoutContext.Consumer>
  }

  private handleShippingRateChange = (setShippingRate) => (shippingRate) => () => {
    setShippingRate(shippingRate)
  }
}
