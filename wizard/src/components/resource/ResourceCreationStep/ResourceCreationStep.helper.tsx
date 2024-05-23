import { AsyncReqParam } from '@wizard/utils/helpers'
import { STANDARD_LIMIT_FOR_PAGINATION } from '@wizard/utils/constants'
import {
  getResourceFilter,
  getSpdxLicenseFilter,
} from '@wizard/api/resourceCreation.api'

const defaultLicenseParams: AsyncReqParam = {
  page: -1,
  size: 20,
  sort: {
    column: 'name',
    sortType: 'ASC',
  },
}

export const onLoadLicenseOption = async (
  searchString: string
): Promise<unknown> => {
  try {
    if (searchString) {
      defaultLicenseParams['criteria'] = [
        {
          column: 'name',
          operator: 'CONTAIN',
          values: [searchString],
        },
        {
          column: 'active',
          operator: 'TRUE',
        },
      ]
      defaultLicenseParams['page'] = 0
      const response = await getSpdxLicenseFilter(defaultLicenseParams)
      const prepareData = {
        options: response.payload.content.map((item) => {
          return {
            label: item.name,
            value: item.reference,
          }
        }),
      }
      return prepareData
    } else {
      defaultLicenseParams['criteria'] = [
        {
          column: 'name',
          operator: 'CONTAIN',
          values: [''],
        },
        {
          column: 'active',
          operator: 'TRUE',
        },
      ]
      defaultLicenseParams['page'] = defaultLicenseParams['page'] + 1
      defaultLicenseParams['size'] = STANDARD_LIMIT_FOR_PAGINATION
      const response = await getSpdxLicenseFilter(defaultLicenseParams)
      const prepareData = {
        options: response.payload.content.map((item) => {
          return {
            label: item.name,
            value: item.reference,
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

const defaultVcParams: AsyncReqParam = {
  page: -1,
  size: 20,
  criteriaOperator: 'OR',
}
export const onLoadVcOption = async (
  searchString: string
  // prevItems: Item[]
): Promise<unknown> => {
  try {
    if (searchString) {
      defaultVcParams['criteria'] = [
        {
          column: 'credential.vcUrl',
          operator: 'CONTAIN',
          values: [searchString],
        },
        {
          column: 'name',
          operator: 'CONTAIN',
          values: [searchString],
        },
      ]
      defaultVcParams['page'] = 0
      const response = await getResourceFilter(defaultVcParams)
      const prepareData = {
        options: response.payload.content.map((item) => {
          return {
            label: `${item.name} - ${item.typeLabel}`,
            value: item.selfDescription,
          }
        }),
      }
      return prepareData
    } else {
      defaultVcParams['criteria'] = [
        {
          column: 'name',
          operator: 'CONTAIN',
          values: [''],
        },
      ]
      defaultVcParams['page'] = defaultVcParams['page'] + 1
      defaultVcParams['size'] = STANDARD_LIMIT_FOR_PAGINATION
      const response = await getResourceFilter(defaultVcParams)
      const prepareData = {
        options: response.payload.content.map((item) => {
          return {
            label: `${item.name} - ${item.typeLabel}`,
            value: item.selfDescription,
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
