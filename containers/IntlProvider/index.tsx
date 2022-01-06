import { IntlProvider as Provider, FormattedMessage, FormattedNumber } from 'react-intl'

const IntlProvider: React.FC = ({ children }) => {
  return (
    <Provider locale="en" defaultLocale="en">
      {children}
    </Provider>
  )
}
export default IntlProvider
