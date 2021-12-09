declare module '@mailchimp/mailchimp_marketing' {
  type Config = {
    apiKey?: string
    accessToken?: string
    server?: string
  }

  type SetListMemberOptions = {
    skipMergeValidation: boolean
  }

  export type SetListMemberBody = {
    email_address: string
    status_if_new: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending' | 'transactional'
    merge_fields?: { [key: string]: any }
  }
  export type AddListMembeBody = {
    email_address: string
    status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending' | 'transactional'
  }

  /* eslint-disable */
  export default {
    setConfig: (config: Config) => {},
    lists: {
      setListMember: (
        listId: string,
        subscriberHash: string,
        body: SetListMemberBody,
        opts?: SetListMemberOptions
      ): Promise<void> => {},
      addListMember: (audienceID: string, body: AddListMembeBody): Promise<void> => {}
    }
  }
}
