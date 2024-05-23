import { Pagination } from './base.model'
export interface ServiceOfferStandardType {
  id: string
  type: string
}
export interface ServiceOffering {
  id: string
  name: string
  labelLevel: string
  credential: {
    id: string
    vcUrl: string
  }
  serviceOfferStandardType: {
    id: string
    type: string
  }[]
  createdAt: number
}
export interface ServicesOfferingResponse {
  content: ServiceOffering[]
  pageable: Pagination
}

export interface ServiceOfferingDetailsResponse {
  id: string
  trustIndex: number
  credential: {
    id: string
    vcUrl: string
  }
  name: string
  description: string
  labelLevel: string
  protectionRegime: string[]
  locations: []
  dependedServices: {
    name: string
    credentialSubjectId: string
  }[]
  resources: {
    name: string
    credentialSubjectId: string
  }[]
  dataAccountExport: {
    accessType: string
    requestType: string
    formatType: string[]
  }
  tnCUrl: string
  participant: {
    id: string
    legalName: string
  }
}
