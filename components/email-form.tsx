import {Component} from 'react'

import handleInputChange from '../lib/handle-input-change'
import {SetCustomerEmail} from '../pages/index'

interface Props {
  setCustomerEmail: SetCustomerEmail,
}

export default class EmailForm extends Component<Props> {
  public state = {
    inputs: {
      email: '',
    },
  }

  private handleInputChange = handleInputChange.bind(this)

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend className='h2'>Customer Information</legend>
          <label>
            Email
            <input type='email' value={this.state.inputs.email} onChange={this.handleInputChange('email')} required />
          </label>
        </fieldset>
      </form>
    )
  }

  private handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    this.props.setCustomerEmail(this.state.inputs.email)
  }
}
