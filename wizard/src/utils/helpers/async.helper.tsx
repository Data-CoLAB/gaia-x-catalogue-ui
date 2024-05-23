import { getMaster } from '@wizard/api/auth.api'
import { MasterType, STANDARD_LIMIT_FOR_PAGINATION } from '../constants'
import { SortingType } from '@wizard/models/base.model'

export type Item = {
  label: string
  value: string
}
type IndustryOption = {
  options: Item[]
  hasMore?: boolean
}
export type SortOrderType = 'asc' | 'desc' | ''

export type AsyncReqParam = {
  page: number
  size: number
  criteriaOperator?: string
  criteria?: { column: string; operator: string; values?: number | string[] }[]
  sort?: SortingType
}

const defaultParams: AsyncReqParam = {
  page: -1,
  size: 20,
  criteriaOperator: 'OR',
}

export const onLoadSubDivisions = async (
  searchString: string
): Promise<IndustryOption> => {
  try {
    if (searchString) {
      defaultParams['criteria'] = [
        {
          column: 'subdivisionCode',
          operator: 'CONTAIN',
          values: [searchString],
        },
        {
          column: 'name',
          operator: 'CONTAIN',
          values: [searchString],
        },
      ]
      defaultParams['page'] = 0
      const response = await getMaster(MasterType.SubDivision, defaultParams)
      const prepareData = {
        options: response.payload.content.map((item) => {
          return {
            label: `${item.name} (${item.subdivisionCode})`,
            value: item.subdivisionCode,
          }
        }),
      }
      return prepareData
    } else {
      defaultParams['criteria'] = [
        {
          column: 'subdivisionCode',
          operator: 'CONTAIN',
          values: [''],
        },
        {
          column: 'name',
          operator: 'CONTAIN',
          values: [''],
        },
      ]
      defaultParams['page'] = defaultParams['page'] + 1
      defaultParams['size'] = STANDARD_LIMIT_FOR_PAGINATION
      const response = await getMaster(MasterType.SubDivision, defaultParams)
      const prepareData = {
        options: response.payload.content.map((item) => {
          return {
            label: `${item.name} (${item.subdivisionCode})`,
            value: item.subdivisionCode,
          }
        }),
        hasMore:
          response.payload.content.length >= STANDARD_LIMIT_FOR_PAGINATION,
      }

      return prepareData
    }
  } catch (e) {
    return { options: [], hasMore: false }
  }
}
