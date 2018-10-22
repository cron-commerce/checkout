import {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class CreditCardForm extends Component<{}> {
  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button className='button' type='submit'>Confirm order</button>
      </form>
    );
  }

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(this.props)
    // create token to pass to server
  }
}

export default injectStripe(CreditCardForm)
