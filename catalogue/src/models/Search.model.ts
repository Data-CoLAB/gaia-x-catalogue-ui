import { Sort } from './Catalogue.model'

export interface BasicSearchQuery {
  page: number
  size: number
  criteriaOperator?: string
  criteria?: Criterum[]
  sort?: Sort[]
}
export interface Criterum {
  column: string
  operator: string
  values: string[]
}

export interface BasicSearchOptions {
  currentPage: number
  numberOfElement: number
  size: number
  totalPages: number
  totalElements: number
  content: string[]
}

export type SelectorResponse = {
  edge?: string
  field: string
  property: string
}
