import NextApp, {Container} from 'next/app'
import {ApolloProvider} from 'react-apollo'

import withApollo from '../lib/with-apollo'

interface Props {
  apolloClient: any,
}

class App extends NextApp<Props> {
  public render() {
    const {Component, pageProps, apolloClient} = this.props

    return <Container>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Container>
  }
}

export default withApollo(App)
