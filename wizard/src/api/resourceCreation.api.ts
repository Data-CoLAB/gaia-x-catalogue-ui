import { AggregationOfvcPayload } from '@wizard/models/service-creation.model'
import { API } from '@wizard/utils/constants'
import { ApiResponse } from '@wizard/models/api.model'
import { AsyncReqParam, parseAPI } from '@wizard/utils/helpers'
import { ListApiParamType } from '@wizard/models/base.model'
import { postAPI } from '@wizard/utils/ApiManager'
import {
  ResourceCreationParamType,
  ResourceCreationResponseType,
  ResourceListResponseModel,
  SpdxLicenseResponsePayload,
} from '@wizard/models/resource-creation.model'

export const getResourceFilter = (
  params: AsyncReqParam
): Promise<ApiResponse<AggregationOfvcPayload>> => {
  return postAPI(
    API.PUBLIC.RESOURCE.LIST.URL,
    params,
    {},
    false,
    false,
    false,
    false
  )
}

export const postCreateResourceCreation = (
  participantId: string,
  param: ResourceCreationParamType
): Promise<ApiResponse<ResourceCreationResponseType>> => {
  return postAPI(parseAPI(API.RESOURCE.CREATE.URL, { participantId }), param)
}

export const postCreatePublicResourceCreation = (
  param: ResourceCreationParamType
): Promise<ApiResponse<ResourceCreationResponseType>> =>
  postAPI(API.PUBLIC.RESOURCE.CREATE.URL, param)

export const postResourceList = (
  param: ListApiParamType,
  participantId: string
): Promise<ApiResponse<ResourceListResponseModel>> =>
  postAPI(parseAPI(API.RESOURCE.LIST.URL, { participantId }), param)

export const getSpdxLicenseFilter = (
  params: AsyncReqParam
): Promise<ApiResponse<SpdxLicenseResponsePayload>> => {
  return postAPI(
    API.PUBLIC.SPDX_LICENSE_LIST.URL,
    params,
    {},
    false,
    false,
    false,
    false
  )
}

export const postValidateResourceCreation = (
  params: ResourceCreationParamType
): Promise<ApiResponse<unknown>> =>
  postAPI(
    API.PUBLIC.RESOURCE.VALIDATE.URL,
    params,
    {},
    true,
    false,
    true,
    false
  )
