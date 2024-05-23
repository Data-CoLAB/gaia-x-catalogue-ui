import { Pagination } from './base.model'
import { ResourceSubType, ResourceType } from '@wizard/utils/constants'

export interface ResourceCreationParamType {
  verificationMethod?: string
  participantJsonUrl?: string
  privateKey?: string
  credentialSubject: {
    type: ResourceType
    subType?: ResourceSubType
    'gx:name': string
    'gx:description': string
    'gx:aggregationOf'?: { id: string }[]
    'gx:maintainedBy'?: { id: string }[]
    'gx:copyrightOwnedBy'?: { id: string }[]
    'gx:ownedBy'?: { id: string }[]
    'gx:manufacturedBy'?: { id: string }[]
    'gx:license'?: string[]
    'gx:policy'?: { id: string }[]
    'gx:locationAddress'?: { 'gx:countryCode': string }[]
    'gx:location'?: { 'gx:gps': string }[]
    'gx:producedBy'?: { id: string }
    'gx:exposedThrough'?: string[]
    'gx:containsPII'?: boolean
    'gx:legalBasis'?: string
    'gx:obsoleteDateTime'?: string
    'gx:expirationDateTime'?: string
    'gx:email'?: string
    'gx:url'?: string
    publishToKafka?: boolean
  }
}

export type ResourceCreationResponseType = {
  id: string
  createdAt: string
  credentialId: string
  credential: CredentialTypeModel
  name: string
  description: string
  type: string
  participantId: string
  participant: ParticipantTypeModel
  publishToKafka: boolean
  obsoleteDate: string
  expiryDate: string
  typeLabel: string
  vcUrl: string
}

export type CredentialTypeModel = {
  id: string
  vcUrl: string
  vcJson: string
  credentialType: string
  participantId: string
  metadata: string
  participant: ParticipantTypeModel
}

export type ParticipantTypeModel = {
  id: string
  email: string
  did: string
  legalName: string
  shortName: string
  entityTypeId: string
  entityType: EntityTypeModel
  domain: string
  privateKeyId: string
  participantType: string
  status: number
  credentialRequest: string
  ownDidSolution: boolean
  keyStored: boolean
}

export type EntityTypeModel = {
  id: string
  type: string
  active: boolean
}

export type ResourceListTypeModel = {
  id: string
  name: string
  typeLabel: string
  type: string
  selfDescription: string
  createdAt: number
  credential: {
    id: string
    vcUrl: string
  }
}

export interface ResourceListResponseModel {
  content: ResourceListTypeModel[]
  pageable: Pagination
}

export interface SpdxLicenseResponsePayload {
  content: SpdxLicenseListResponseModel[]
  pageable: Pagination
}

export interface SpdxLicenseListResponseModel {
  active: boolean
  id: string
  licenseId: string
  name: string
  reference: string
}
