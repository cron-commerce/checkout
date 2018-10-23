import gql from 'graphql-tag'
import {Component} from 'react'
import {Mutation} from 'react-apollo'

import transformCartForCheckout from '../lib/transform-cart-for-checkout'
import {CheckoutContext} from '../pages/index'

const CREATE_CHECKOUT = gql`
  mutation createCheckout($shopName: String!, $input: CheckoutInput!) {
    createCheckout(shopName: $shopName, input: $input) {
      id
    }
  }
`

export default class Confirm extends Component<{}> {
  public render() {
    return <CheckoutContext.Consumer>
      {({cart, customerEmail, shopName}) => {
        return <Mutation mutation={CREATE_CHECKOUT}>
          {(createCheckout, {data, loading, error}) => {
            if (loading) { return <div>loading...</div> }
            if (error) { return <div>error</div> }

            const mutationVariables = {shopName, input: {cart: transformCartForCheckout(cart), customerEmail}}

            return <form onSubmit={this.handleSubmit(createCheckout)(mutationVariables)}>
              <fieldset>
                <legend className='h2'>Confirm</legend>
              </fieldset>
              <button className='button' type='submit'>Submit</button>
            </form>
          }}
        </Mutation>
      }}
    </CheckoutContext.Consumer>
  }

  private handleSubmit = (createCheckout) => (variables) => (e: React.FormEvent) => {
    e.preventDefault()
    createCheckout({variables})
  }
}
