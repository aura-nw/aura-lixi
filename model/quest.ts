export type Quest = {
  id: string
  code: string
  title: string
  description: string
  campaign_social_actions: {
    id: string
    target: string
    social_action: {
      id: string,
      name: string,
      social: 'twitter'
    }
  }[]
}