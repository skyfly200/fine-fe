import React from 'react'
import dynamic from 'next/dynamic'
const FineVerse = dynamic(() => import('../../components/FineVerse'), {
  ssr: false
})
const FineVersePage = () => <FineVerse />

export default FineVersePage
