import { basicSearchOptionsAPI } from '@catalogue/api/search.api'
import { STANDARD_LIMIT_FOR_PAGINATION } from './constant'
import { BasicSearchQuery } from '@catalogue/models/Search.model'

// Create a dictionary to store page numbers for each property
const pageNumbersByProperty: Record<string, number> = {}

export const loadOptions = async (
  option: string,
  property: string,
  searchString?: string
) => {
  const options = option + property
  if (searchString) {
    pageNumbersByProperty[options] = 0
    const criteria = {
      column: option,
      operator: 'CONTAIN',
      values: [searchString],
    }
    const defaultParams: BasicSearchQuery = {
      page: pageNumbersByProperty[options],
      size: STANDARD_LIMIT_FOR_PAGINATION,
      criteria: [criteria],
      // criteriaOperator: 'AND',
      // Use the updated page number
    }
    const response = await basicSearchOptionsAPI(
      option,
      property,
      defaultParams
    )
    const prepareData = {
      options: response.content.map((item: string) => {
        return {
          label: item,
          value: item,
        }
      }),
      hasMore:
        response.totalElements >=
        STANDARD_LIMIT_FOR_PAGINATION * (defaultParams.page + 1),
    }

    return prepareData
  } else {
    // Initialize page number if it doesn't exist for the property
    if (
      !pageNumbersByProperty[options] &&
      pageNumbersByProperty[options] != 0
    ) {
      pageNumbersByProperty[options] = -1
    }
    // Update the page number for the property
    pageNumbersByProperty[options] += 1

    const defaultParams: BasicSearchQuery = {
      page: pageNumbersByProperty[options], // Use the updated page number
      size: STANDARD_LIMIT_FOR_PAGINATION,
    }

    const response = await basicSearchOptionsAPI(
      option,
      property,
      defaultParams
    )
    const prepareData = {
      options: response.content.map((item: string) => {
        return {
          label: item,
          value: item,
        }
      }),
      hasMore:
        response.totalElements >=
        STANDARD_LIMIT_FOR_PAGINATION * (defaultParams.page + 1),
    }

    return prepareData
  }
}
