import {Component} from 'react'

import handleInputChange from '../lib/handle-input-change'
import {setAccount} from '../pages/index'

interface Props {
  setAccount: setAccount,
}

export default class Account extends Component<Props> {
  public state = {
    inputs: {
      email: '',
    },
  }

  private handleInputChange = handleInputChange.bind(this)

  public render() {
    return <fieldset>
      <legend>Customer Information</legend>
      <label>
        Email
        <input type='email' value={this.state.inputs.email} onChange={this.handleInputChange('email')} required />
      </label>
    </fieldset>
  }
}
