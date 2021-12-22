import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'

const Intl: React.FC = ({ children }) => {
  return (
    <IntlProvider locale="en" defaultLocale="en">
      {children}
    </IntlProvider>
  )
}
export default Intl
