import {Component} from 'react'

import handleInputChange from '../lib/handle-input-change'
import {setAddress} from '../pages/index'

interface Props {
  setAddress: setAddress,
}

export default class Address extends Component<Props> {
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
    return <fieldset>
      <legend>Shipping Address</legend>
      <label>
        First Name
        <input type='text' value={this.state.inputs.firstName} onChange={this.handleInputChange('firstName')} />
      </label>
      <label>
        Last Name
        <input type='text' value={this.state.inputs.lastName} onChange={this.handleInputChange('lastName')} />
      </label>
      <label>
        Address
        <input type='text' value={this.state.inputs.address1} onChange={this.handleInputChange('address1')} />
      </label>
      <label>
        Apt, Suite, etc.
        <input type='text' value={this.state.inputs.address2} onChange={this.handleInputChange('address2')} />
      </label>
      <label>
        City
        <input type='text' value={this.state.inputs.city} onChange={this.handleInputChange('city')} />
      </label>
      <label>
        Country
        <input type='text' value={this.state.inputs.country} onChange={this.handleInputChange('country')} />
      </label>
      <label>
        State/Province
        <input type='text' value={this.state.inputs.province} onChange={this.handleInputChange('province')} />
      </label>
      <label>
        Zip code
        <input type='number' value={this.state.inputs.zip} onChange={this.handleInputChange('zip')} />
      </label>
    </fieldset>
  }
}
