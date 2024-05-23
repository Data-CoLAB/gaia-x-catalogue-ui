export interface ServiceListRequest {
  page: number
  size: number
  sort?: Sort[]
  query?: Query
  prompt?: string
}

export interface Sort {
  column: string
  sortType: string
}
export interface Query {
  or?: Or[]
  and?: And2[]
}

export interface Or {
  value: string[] | string
  edge?: string | undefined
  node: string | undefined
  key?: string | undefined
  operator: string
}

export interface And {
  node: string
  verb: string
  value: string
  key: string
}

export interface And2 {
  value: string[] | string
  edge?: string | undefined
  node: string | undefined
  key?: string | undefined
  operator: string
}

export interface ServiceListResponse {
  currentPage: number
  numberOfElement: number
  size: number
  totalPages: number
  totalElements: number
  content: Content[]
}

export interface Content {
  id: string
  credentialSubjectId: string
  name: string
  dataAccountExport: DataAccountExport
  protectionRegime: ProtectionRegime[]
  providedBy: string
  locations: Location[]
  veracity: number
  transparency: number
  trustIndex: number
  labelLevel: string
}

export interface DataAccountExport {
  id: string
  createdDate: number
  accessType: string
  requestType: string
  formatType: string[]
}

export interface ProtectionRegime {
  id: string
  name: string
  createdDate: number
}

export interface Location {
  id: string
  name: string
  createdDate: number
}

export interface ServiceDetail {
  id: string
  description?: string
  credentialSubjectId: string
  name: string
  labelLevel: string
  protectionRegime: ProtectionRegime[]
  locations: Location[]
  dependedServices: DependsOn[]
  resources: Resource[]
  veracity: number
  transparency: number
  trustIndex: number
  dataAccountExport: DataAccountExport
  tnCUrl: string
  participant: Participant
}

export interface Resource {
  id: string
  name: string
  credentialSubjectId: string
}

export interface Participant {
  id: string
  name: string
  credentialSubjectId: string
}
export interface DependsOn {
  id: string
  name: string
  credentialSubjectId: string
}

export interface DataAccountExport {
  id: string
  createdDate: number
  accessType: string
  requestType: string
  formatType: string[]
}
