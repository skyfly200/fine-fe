import { toast } from 'react-toastify'
import { FaInfo, FaCheck, FaExclamationTriangle, FaBug, FaExclamationCircle } from 'react-icons/fa'
import React from 'react'
import { ToastType } from '../../types'

export const displayIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <FaCheck />
    case 'info':
      return <FaInfo />
    case 'error':
      return <FaExclamationCircle />
    case 'warning':
      return <FaExclamationTriangle />
    default:
      return <FaBug />
  }
}

interface ToastMessageProps {
  type: ToastType
  message: string
}

const ToastMessage = ({ type, message }: ToastMessageProps) =>
  toast[type](
    <div>
      <div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>{message}</div>
    </div>
  )

ToastMessage.dismiss = toast.dismiss

export default ToastMessage
