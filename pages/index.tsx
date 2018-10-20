import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'

import '../styles/index.scss'

import Item from '../components/item'

interface Props {
  cart: Cart,
  shopName: string,
}

const query = gql`
  query {
    hello
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
    customer: {
      address1: '',
      address2: '',
      city: '',
      country: '',
      email: '',
      firstName: '',
      lastName: '',
      province: '',
      zip: '',
    },
  }

  public render() {
    return <Query query={query}>
      {({data}) => {
        return <div className='grid-x'>
          <div className='cell small-12 medium-7'>
            <h1>{this.props.shopName}</h1>

            <fieldset>
              <legend>Customer Information</legend>
              <label>
                Email
                <input type='email' value={this.state.customer.email} onChange={this.handleCustomerStateChange('email')} />
              </label>
            </fieldset>

            <fieldset>
              <legend>Shipping Address</legend>
              <label>
                First Name
                <input type='text' value={this.state.customer.firstName} onChange={this.handleCustomerStateChange('firstName')} />
              </label>
              <label>
                Last Name
                <input type='text' value={this.state.customer.lastName} onChange={this.handleCustomerStateChange('lastName')} />
              </label>
              <label>
                Address
                <input type='text' value={this.state.customer.address1} onChange={this.handleCustomerStateChange('address1')} />
              </label>
              <label>
                Apt, Suite, etc.
                <input type='text' value={this.state.customer.address2} onChange={this.handleCustomerStateChange('address2')} />
              </label>
              <label>
                City
                <input type='text' value={this.state.customer.city} onChange={this.handleCustomerStateChange('city')} />
              </label>
              <label>
                Country
                <input type='text' value={this.state.customer.country} onChange={this.handleCustomerStateChange('country')} />
              </label>
              <label>
                State/Province
                <input type='text' value={this.state.customer.province} onChange={this.handleCustomerStateChange('province')} />
              </label>
              <label>
                Zip code
                <input type='number' value={this.state.customer.zip} onChange={this.handleCustomerStateChange('zip')} />
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
              {this.props.cart.items.map(item => (
                <Item key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      }}
    </Query>
  }

  private handleCustomerStateChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = this.state
    state.customer[key] = e.target.value
    this.setState(state)
  }
}
