import {Component} from 'react'

import {setShippingRate} from '../pages/index'

interface Props {
  setShippingRate: setShippingRate,
  shippingAddress: Address,
}

export default class ShippingRateChooser extends Component<Props> {
  public render() {
    return <div>shipping rate chooser</div>
  }
}
