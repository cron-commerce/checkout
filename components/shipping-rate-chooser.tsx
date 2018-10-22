import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'

import {setShippingRate} from '../pages/index'

interface Props {
  setShippingRate: setShippingRate,
  shippingAddress: Address,
  shopName: string,
}

const QUERY = gql`
  query shippingZones($shopName: String!) {
    shippingZones(shopName: $shopName) {
      id
    }
  }
`

export default class ShippingRateChooser extends Component<Props> {
  public render() {
    return <Query query={QUERY} variables={{shopName: this.props.shopName}}>
      {({data}) => <div>
        {JSON.stringify(data)}
      </div>}
    </Query>
  }
}
