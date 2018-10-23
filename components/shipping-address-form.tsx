import {Component} from 'react'

import {handleInputChangeToStateUpdate} from '../lib/update-state'
import {SetAddress} from '../pages/index'

interface Props {
  setShippingAddress: SetAddress,
}

export default class ShippingAddressForm extends Component<Props> {
  public state = {
    inputAddress1: '',
    inputAddress2: '',
    inputCity: '',
    inputCountry: '',
    inputFirstName: '',
    inputLastName: '',
    inputProvince: '',
    inputZip: '',
  }

  private handleInputChangeToStateUpdate = handleInputChangeToStateUpdate.bind(this)

  public render() {
    return <form>
      <fieldset>
        <legend className='h2'>Shipping Address</legend>
        <label>
          First Name
          <input type='text' value={this.state.inputFirstName} onChange={this.handleInputChangeToStateUpdate('inputFirstName')} required />
        </label>
        <label>
          Last Name
          <input type='text' value={this.state.inputLastName} onChange={this.handleInputChangeToStateUpdate('inputLastName')} required />
        </label>
        <label>
          Address
          <input type='text' value={this.state.inputAddress1} onChange={this.handleInputChangeToStateUpdate('inputAddress1')} required />
        </label>
        <label>
          Apt, Suite, etc.
          <input type='text' value={this.state.inputAddress2} onChange={this.handleInputChangeToStateUpdate('inputAddress2')} />
        </label>
        <label>
          City
          <input type='text' value={this.state.inputCity} onChange={this.handleInputChangeToStateUpdate('inputCity')} required />
        </label>
        <label>
          Country
          <input type='text' value={this.state.inputCountry} onChange={this.handleInputChangeToStateUpdate('inputCountry')} required />
        </label>
        <label>
          State/Province
          <input type='text' value={this.state.inputProvince} onChange={this.handleInputChangeToStateUpdate('inputProvince')} required />
        </label>
        <label>
          Zip code
          <input type='text' value={this.state.inputZip} onChange={this.handleInputChangeToStateUpdate('inputZip')} required />
        </label>
      </fieldset>
    </form>
  }
}
