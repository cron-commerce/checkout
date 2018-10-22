import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'

interface Props {
  shopName: string,
}

const QUERY = gql`
  query shop($name: String!) {
    shop(name: $name) {
      stripePublishableKey
    }
  }
`

export default class CreditCardForm extends Component<Props> {
  public render() {
    return <Query query={QUERY} variables={{name: this.props.shopName}}>
      {({data, loading, error}) => {
        if (loading) { return <div>loading...</div> }
        if (error) { return <div>error</div> }

        return <div>{JSON.stringify(data)}</div>
      }}
    </Query>
  }
}
