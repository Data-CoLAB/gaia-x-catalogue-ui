import { Pagination } from './base.model'

export interface RegistrationType {
  id: string
  type: string
  active: boolean
}

export interface RegistrationTypesResponsePayload {
  content: RegistrationType[]
  pageable: Pagination
}

export type RegistrationTypesResponse = RegistrationTypesResponsePayload

export interface SubDivision {
  id: string
  countryCode: string
  subdivisionCode: string
  name: string
  active: boolean
  type: string
}

export interface SubDivisionsResponsePayload {
  content: SubDivision[]
  pageable: Pagination
}

export type SubDivisionsResponse = SubDivisionsResponsePayload

export interface EntityType {
  id: string
  type: string
  active: boolean
}

export interface EntityTypesResponsePayload {
  content: EntityType[]
  pageable: Pagination
}

export type EntityTypesResponse = EntityTypesResponsePayload
