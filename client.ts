import sanityClient from '@sanity/client'

export default sanityClient({
  projectId:
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      : process.env.SANITY_PROJECT_ID, // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2021-08-31'
})
