import {Component} from 'react'

import {handleInputChangeToStateUpdate} from '../lib/update-state'
import {SetCustomerEmail} from '../pages/index'

interface Props {
  setCustomerEmail: SetCustomerEmail,
}

export default class EmailForm extends Component<Props> {
  public state = {
    inputEmail: '',
  }

  private handleInputChangeToStateUpdate = handleInputChangeToStateUpdate.bind(this)

  public render() {
    return (
      <form>
        <fieldset>
          <legend className='h2'>Customer Information</legend>
          <label>
            Email
            <input type='email' value={this.state.inputEmail} onChange={this.handleInputChangeToStateUpdate('inputEmail')} required />
          </label>
        </fieldset>
      </form>
    )
  }
}
