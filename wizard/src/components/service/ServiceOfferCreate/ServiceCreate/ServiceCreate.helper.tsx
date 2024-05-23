import { getMaster } from '@wizard/api/auth.api'
import {
  getDependsVCOptions,
  getResourceFilter,
} from '@wizard/api/serviceCreation.api'
import { AsyncReqParam } from '@wizard/utils/helpers'
import {
  MasterType,
  STANDARD_LIMIT_FOR_PAGINATION,
} from '@wizard/utils/constants'

export const onLoadVcOption = async (
  searchString: string,
  defaultVcParams: AsyncReqParam
): Promise<unknown> => {
  try {
    if (searchString) {
      defaultVcParams['criteria'] = [
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
          return { label: item.name, value: item.selfDescription }
        }),
      }
      return prepareData
    } else {
      defaultVcParams['criteria'] = [
        {
          column: 'type',
          operator: 'CONTAIN',
          values: [''],
        },
      ]
      defaultVcParams['page'] = defaultVcParams['page'] + 1
      defaultVcParams['size'] = STANDARD_LIMIT_FOR_PAGINATION
      const response = await getResourceFilter(defaultVcParams)
      const prepareData = {
        options: response.payload.content.map((item) => {
          return { label: item.name, value: item.selfDescription }
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

export const onLoadStandardOption = async (
  searchString: string,
  defaultStandardParams: AsyncReqParam
): Promise<unknown> => {
  try {
    if (searchString) {
      defaultStandardParams['criteria'] = [
        {
          column: 'type',
          operator: 'CONTAIN',
          values: [searchString],
        },
      ]
      defaultStandardParams['page'] = 0
      const response = await getMaster(
        MasterType.Standard,
        defaultStandardParams
      )
      const prepareData = {
        options: response.payload.content.map((item) => {
          return {
            label: item.type,
            value: item.type,
          }
        }),
      }
      return prepareData
    } else {
      defaultStandardParams['criteria'] = [
        {
          column: 'type',
          operator: 'CONTAIN',
          values: [''],
        },
      ]
      defaultStandardParams['page'] = defaultStandardParams['page'] + 1
      defaultStandardParams['size'] = STANDARD_LIMIT_FOR_PAGINATION
      const response = await getMaster(
        MasterType.Standard,
        defaultStandardParams
      )
      const prepareData = {
        options: response.payload.content.map((item) => {
          return {
            label: item.type,
            value: item.type,
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

export const onLoadFormateType = async (
  searchString: string,
  defaultFormateParams: AsyncReqParam
): Promise<unknown> => {
  try {
    if (searchString) {
      defaultFormateParams['criteria'] = [
        {
          column: 'type',
          operator: 'CONTAIN',
          values: [searchString],
        },
      ]
      defaultFormateParams['page'] = 0
      const response = await getMaster(
        MasterType.FormateType,
        defaultFormateParams
      )
      const prepareData = {
        options: response.payload.content.map((item) => {
          return { label: item.type, value: item.id }
        }),
      }
      return prepareData
    } else {
      defaultFormateParams['criteria'] = [
        {
          column: 'type',
          operator: 'CONTAIN',
          values: [''],
        },
      ]
      defaultFormateParams['page'] = defaultFormateParams['page'] + 1
      defaultFormateParams['size'] = STANDARD_LIMIT_FOR_PAGINATION
      const response = await getMaster(
        MasterType.FormateType,
        defaultFormateParams
      )
      const prepareData = {
        options: response.payload.content.map((item) => {
          return { label: item.type, value: item.id }
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

export const onLoadDependsVcOption = async (
  searchString: string,
  defaultDependsVcParams: AsyncReqParam
): Promise<unknown> => {
  try {
    if (searchString) {
      defaultDependsVcParams['criteria'] = [
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
      defaultDependsVcParams['page'] = 0
      const response = await getDependsVCOptions(defaultDependsVcParams)
      const prepareData = {
        options: response.payload.content.map((item) => {
          return { label: item.name, value: item?.credential?.vcUrl }
        }),
      }
      return prepareData
    } else {
      defaultDependsVcParams['criteria'] = [
        {
          column: 'name',
          operator: 'CONTAIN',
          values: [''],
        },
      ]
      defaultDependsVcParams['page'] = defaultDependsVcParams['page'] + 1
      defaultDependsVcParams['size'] = STANDARD_LIMIT_FOR_PAGINATION
      const response = await getDependsVCOptions(defaultDependsVcParams)
      const prepareData = {
        options: response.payload.content.map((item) => {
          return { label: item.name, value: item?.credential?.vcUrl }
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
