import { API } from '@wizard/utils/constants'
import { ApiResponse } from '@wizard/models/api.model'
import { AsyncReqParam, parseAPI } from '@wizard/utils/helpers'
import { getAPI, postAPI } from '@wizard/utils/ApiManager'
import { ListApiParamType } from '@wizard/models/base.model'
import {
  AggregationOfvcPayload,
  CreateServiceOfferParamType,
  CreatedServiceResponseType,
  ServiceofferValidateParams,
} from '@wizard/models/service-creation.model'
import {
  ServiceOfferingDetailsResponse,
  ServicesOfferingResponse,
} from '@wizard/models/service-management.model'

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
export const getDependsVCOptions = (
  params: AsyncReqParam
): Promise<ApiResponse<AggregationOfvcPayload>> =>
  postAPI(
    API.PUBLIC.SERVICE_OFFER.LIST.URL,
    params,
    {},
    false,
    false,
    false,
    false
  )

export const postValidateServiceOffer = (
  params: ServiceofferValidateParams
): Promise<ApiResponse<unknown>> =>
  postAPI(
    API.PUBLIC.SERVICE_OFFER.VALIDATE.URL,
    params,
    {},
    false,
    false,
    false,
    false
  )

export const postCreateServiceOffer = (
  param: CreateServiceOfferParamType
): Promise<ApiResponse<CreatedServiceResponseType>> =>
  postAPI(API.SERVICE_OFFER.CREATE.URL, param, {}, false, false, false, false)
export const postCreatePublicServiceOffer = (
  param: CreateServiceOfferParamType
): Promise<ApiResponse<CreatedServiceResponseType>> =>
  postAPI(
    API.PUBLIC.SERVICE_OFFER.CREATE.URL,
    param,
    {},
    false,
    false,
    false,
    false
  )

export const postServiceOfferingList = (
  param: ListApiParamType,
  participantId: string
): Promise<ApiResponse<ServicesOfferingResponse>> =>
  postAPI(
    parseAPI(API.SERVICE_OFFER.LIST.URL, { participantId }),
    param,
    {},
    false,
    false,
    false,
    false
  )

export const getServiceOfferingDetails = (
  participantId: string,
  serviceOfferId: string
): Promise<ApiResponse<ServiceOfferingDetailsResponse>> =>
  getAPI(
    parseAPI(API.SERVICE_OFFER.GET_DETAILS.URL, {
      participantId,
      serviceOfferId,
    }),
    {},
    false,
    false,
    false,
    false
  )
