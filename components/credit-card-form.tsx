import {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

import {SetStripeToken} from '../pages/index'

interface Props {
  setStripeToken: SetStripeToken,
  stripe: any,
}

class CreditCardForm extends Component<Props> {
  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend className='h2'>Credit Card</legend>
          <CardElement />
        </fieldset>
      </form>
    );
  }

  private handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await this.props.stripe.createToken()
    this.props.setStripeToken(res.token.id)
  }
}

export default injectStripe(CreditCardForm)
