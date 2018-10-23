import {Component} from 'react'

import {handleInputChangeToStateUpdate} from '../lib/update-state'
import {CheckoutContext, SetCustomerEmail} from '../pages/index'

export default class EmailForm extends Component<{}> {
  public state = {
    inputEmail: '',
  }

  private handleInputChangeToStateUpdate = handleInputChangeToStateUpdate.bind(this)

  public render() {
    return <CheckoutContext.Consumer>
      {({customerEmail, setCustomerEmail}) => {
        if (customerEmail) { return <div>Customer email: {customerEmail}</div> }

        return <form onSubmit={this.handleSubmit(setCustomerEmail)}>
        <fieldset>
          <legend className='h2'>Customer Information</legend>
          <label>
            Email
            <input type='email' value={this.state.inputEmail} onChange={this.handleInputChangeToStateUpdate('inputEmail')} required />
          </label>
        </fieldset>
        <button className='button' type='submit'>Submit</button>
      </form>}}
    </CheckoutContext.Consumer>
  }

  private handleSubmit = (setCustomerEmail: SetCustomerEmail) => (e: React.FormEvent) => {
    e.preventDefault()
    setCustomerEmail(this.state.inputEmail)
  }
}
