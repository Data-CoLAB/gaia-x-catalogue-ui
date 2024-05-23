import { getAPI, postAPI } from '@catalogue/utility/ApiManager'
import {
  ServiceDetail,
  ServiceListRequest,
  ServiceListResponse,
  Tags,
} from '@catalogue/models/Catalogue.model'
import { ApiResponse } from '@catalogue/models/api.model'
import { API } from '@catalogue/utility/constant'

export const getServiceListAPI = (
  requestBody: ServiceListRequest
): Promise<ServiceListResponse> =>
  postAPI(API.getServiceList.URL, requestBody, {}, false, false)

export const getTagsListAPI = (): Promise<Tags[]> =>
  getAPI(API.getTagsList.URL, {}, false, false)

export const getServiceDetailAPI = (
  id: string
): Promise<ApiResponse<ServiceDetail>> =>
  getAPI(API.getServiceDetail.URL(id), {}, false, false, false, false)

export const serviceOfferingJSON = (url: string): Promise<ApiResponse<any>> =>
  getAPI(url, {}, true, false, false, true, {})
