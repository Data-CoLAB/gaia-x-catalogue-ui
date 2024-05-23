export interface ServiceOffering {
  id: string
  labels: string[]
  properties: {
    backend_stack: string
    high_availabity: boolean
    logo: string
    name: string
    security: string
    tenancy: string
    type: string
    website: string
  }
}
