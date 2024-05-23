import { getAPI, postAPI } from '@catalogue/utility/ApiManager'
import {
  BasicSearchOptions,
  BasicSearchQuery,
  SelectorResponse,
} from '@catalogue/models/Search.model'
import { API } from '@catalogue/utility/constant'

export const basicSearchOptionsAPI = (
  options: string,
  property: string,
  query: BasicSearchQuery
): Promise<BasicSearchOptions> =>
  postAPI(
    API.getSearchOptions.URL.replace(':option', options).replace(
      ':property',
      property
    ),
    query,
    {},
    false,
    false,
    false,
    false
  )

export const SelectorAPI = (): Promise<SelectorResponse[]> =>
  getAPI(API.getSelector.URL, {}, false, false, true, true)

export const GrammerAPI = (): Promise<string> =>
  getAPI(API.getGrammer.URL, {}, false, false, true, true)
