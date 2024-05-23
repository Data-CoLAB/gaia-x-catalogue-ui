import { EntityType, RegistrationType } from './master-data.model'

export interface OnBoardingFormProps {
  registrationTypes: RegistrationType[]
  entityTypes: EntityType[]
}
export interface Registration {
  legalRegistrationType: string
  legalRegistrationNumber: string
}
export interface RegistrationWithUndefined {
  legalRegistrationType?: string | undefined
  legalRegistrationNumber?: string | undefined
}

export interface RegisterForm {
  email: string
  legalName: string
  shortName: string
  registrations: Registration[]
  entityType: string
  parentOrganization: string[]
  subOrganization: string[]
  headquartersAddress: AsyncSelectDataType | null
  legalAddress: AsyncSelectDataType | null
  sameAddress: boolean
  ownDid: boolean
  accept: boolean
}

export type OnBoardParticipant = {
  issuer?: string
  verificationMethod?: string
  privateKey?: string
  store?: boolean
  ownDid: boolean
}

export interface OnBoardParticipantResponse {
  id: string
  email: string
  legalName: string
  shortName: string
  entityTypeId: string
  entityType: EntityTypes
  domain: string
  participantType: string
  status: number
  credential: string
  ownDidSolution: boolean
}

export interface EntityTypes {
  id: string
  type: string
  active: boolean
  hibernateLazyInitializer: HibernateLazyInitializer
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HibernateLazyInitializer {}

export interface AsyncSelectDataType {
  value: string
  label: string
  color?: string
  isFixed?: boolean
  isDisabled?: boolean
}

export interface ExportDetailsType {
  participantJson: string
  privateKey: string
}
