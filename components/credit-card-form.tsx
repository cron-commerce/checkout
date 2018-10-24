import {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

import {CheckoutContext, SetStripeToken} from '../pages/index'

interface Props {
  stripe: any,
}

class CreditCardForm extends Component<Props> {
  public render() {
    return <CheckoutContext.Consumer>
      {({setStripeToken}) => {
        return <form onSubmit={this.handleSubmit(setStripeToken)}>
          <fieldset>
            <legend className='h2'>Credit Card</legend>
            {process.env.NODE_ENV === 'development' && <div>Test Visa: 4242424242424242</div>}
            <CardElement />
          </fieldset>
          <button className='button' type='submit'>Submit</button>
        </form>
      }}
    </CheckoutContext.Consumer>
  }

  private handleSubmit = (setStripeToken: SetStripeToken) => async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await this.props.stripe.createToken()
      setStripeToken(res.token.id)
    } catch (err) {
      alert('There was an error')
    }
  }
}

export default injectStripe(CreditCardForm)
