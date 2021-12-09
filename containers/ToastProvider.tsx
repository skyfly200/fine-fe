import { createContext, useCallback } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import toast from '../components/Toast'
import { ToastType } from '../types'

export const ToastContext = createContext({
  notify: (type: ToastType, message: string) => {},
  dismiss: () => {}
})

const ToastProvider: React.FC = ({ children }) => {
  const notify = useCallback((type, message) => {
    toast({ type, message })
  }, [])

  const dismiss = useCallback(() => {
    toast.dismiss()
  }, [])

  return (
    <ToastContext.Provider value={{ notify, dismiss }}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ToastContext.Provider>
  )
}

export default ToastProvider
