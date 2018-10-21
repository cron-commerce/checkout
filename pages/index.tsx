import gql from 'graphql-tag'
import {Component} from 'react'
import {Mutation, Query} from 'react-apollo'

import '../styles/index.scss'

import Item from '../components/item'

interface Props {
  cart: Cart,
  shopName: string,
}

enum AccountFormState {Create, Login, Logout}

const query = gql`
  query {
    hello
  }
`

const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      email
      id
      token
    }
  }
`

export default class Checkout extends Component<Props> {
  public static getInitialProps({req}): Props {
    return {
      cart: JSON.parse(decodeURIComponent(req.session.cart || 'null')),
      shopName: req.session.shopName,
    }
  }

  public state = {
    accountFormState: AccountFormState.Create,
    inputs: {
      address1: '',
      address2: '',
      city: '',
      country: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      province: '',
      zip: '',
    },
  }

  public render() {
    return <Query query={query}>
      {() => {
        return <div className='grid-x'>
          <div className='cell small-12 medium-7'>
            <h1>{this.props.shopName}</h1>

            <Mutation mutation={CREATE_USER}>
              {(createUser) => <form onSubmit={this.submitAccountForm(createUser)}>
                <fieldset>
                  <legend>Customer Information</legend>
                  <div>Create account</div>
                  <label>
                    Email
                    <input type='email' value={this.state.inputs.email} onChange={this.handleInputChange('email')} required />
                  </label>
                  <label>
                    Password
                    <input type='password' onChange={this.handleInputChange('password')} required />
                  </label>
                  <button className='button' type='submit'>Create</button>
                  <span>Have an account?</span>
                  <a href='#'>Login</a>
                </fieldset>
              </form>}
            </Mutation>

            <fieldset>
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

            <div className='grid-x'>
              <div className='cell small-6'>
                <a className='button' href='#'>Return to cart</a>
              </div>
              <div className='cell small-6 text-right'>
                <a className='button' href='#'>Next</a>
              </div>
            </div>
          </div>

          <div className='cell show-for-medium medium-5'>
            <h2>Order Summary</h2>
            <div>
              {this.props.cart.items.map(item => <Item key={item.id} item={item} />)}
            </div>
          </div>
        </div>
      }}
    </Query>
  }

  private handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = this.state
    state.inputs[key] = e.target.value
    this.setState(state)
  }

  private submitAccountForm = (createUser) => async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await createUser({variables: {
      email: this.state.inputs.email,
      password: this.state.inputs.password,
    }})
    console.log(res)
  }
}
