import {Component} from 'react'

import handleInputChange from '../lib/handle-input-change'
import {SetAddress} from '../pages/index'

interface Props {
  setShippingAddress: SetAddress,
}

export default class ShippingAddressForm extends Component<Props> {
  public state = {
    inputs: {
      address1: '',
      address2: '',
      city: '',
      country: '',
      firstName: '',
      lastName: '',
      province: '',
      zip: '',
    },
  }

  private handleInputChange = handleInputChange.bind(this)

  public render() {
    return <form onSubmit={this.handleFormSubmit}>
      <fieldset>
        <legend className='h2'>Shipping Address</legend>
        <label>
          First Name
          <input type='text' value={this.state.inputs.firstName} onChange={this.handleInputChange('firstName')} required />
        </label>
        <label>
          Last Name
          <input type='text' value={this.state.inputs.lastName} onChange={this.handleInputChange('lastName')} required />
        </label>
        <label>
          Address
          <input type='text' value={this.state.inputs.address1} onChange={this.handleInputChange('address1')} required />
        </label>
        <label>
          Apt, Suite, etc.
          <input type='text' value={this.state.inputs.address2} onChange={this.handleInputChange('address2')} />
        </label>
        <label>
          City
          <input type='text' value={this.state.inputs.city} onChange={this.handleInputChange('city')} required />
        </label>
        <label>
          Country
          <input type='text' value={this.state.inputs.country} onChange={this.handleInputChange('country')} required />
        </label>
        <label>
          State/Province
          <input type='text' value={this.state.inputs.province} onChange={this.handleInputChange('province')} required />
        </label>
        <label>
          Zip code
          <input type='text' value={this.state.inputs.zip} onChange={this.handleInputChange('zip')} required />
        </label>
      </fieldset>
    </form>
  }

  private handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.setShippingAddress(this.state.inputs)
  }
}
