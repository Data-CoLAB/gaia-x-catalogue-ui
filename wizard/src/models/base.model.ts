export interface KeyValueType {
  [key: string]: string
}

export interface ValuesType {
  [key: string]: ValuesMessageType[]
}

export interface ValuesMessageType {
  key: string
  msg: string
}

export interface Pagination {
  pageSize: number
  totalPages: number
  pageNumber: number
  numberOfElements: number
  totalElements: number
}

export interface SortingType {
  column: string
  sortType: string
}

export interface Criteria {
  column?: string
  operator?: string
  values?: string | any[]
}

export interface ListApiParamType {
  page: number
  size: number
  sort: SortingType
  criteriaOperator?: string
  criteria?: Criteria[]
}
