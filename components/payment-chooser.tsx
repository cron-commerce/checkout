import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'
import {Elements, StripeProvider} from 'react-stripe-elements'

import {CheckoutContext} from '../pages/index'
import CreditCardForm from './credit-card-form'

const QUERY = gql`
  query shop($name: String!) {
    shop(name: $name) {
      stripePublishableKey
    }
  }
`

export default class PaymentChooser extends Component<{}> {
  public state = {
    shouldRenderStripe: false,
  }

  public componentDidMount() {
    this.setState({shouldRenderStripe: true})
  }

  public render() {
    // stripe cannot do SSR
    if (!this.state.shouldRenderStripe) { return null }

    return <CheckoutContext.Consumer>
      {({shippingRate, shopName, stripeToken}) => {
        if (!shippingRate) { return <div>Select shipping rate</div> }
        if (stripeToken) { return <div>Using stripe token {stripeToken}</div> }

        return <Query query={QUERY} variables={{name: shopName}}>
          {({data, loading, error}) => {
            if (loading) { return <div>loading...</div> }
            if (error) { return <div>error</div> }

            return <StripeProvider apiKey={data.shop.stripePublishableKey}>
              <Elements>
                <CreditCardForm />
              </Elements>
            </StripeProvider>
          }}
        </Query>
      }}
    </CheckoutContext.Consumer>
  }
}
