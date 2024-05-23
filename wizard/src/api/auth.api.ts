import { API, MasterType } from '@wizard/utils/constants'
import { ApiResponse } from '@wizard/models/api.model'
import { AsyncReqParam, parseAPI } from '@wizard/utils/helpers'
import { getAPI, postAPI } from '@wizard/utils/ApiManager'
import { SubDivisionsResponse } from '@wizard/models/master-data.model'
import {
  CheckRegistrationRequestParams,
  CheckRegistrationResponsePayload,
} from '@wizard/models/check-registration.model'
import {
  RegisterParticipantRequestBody,
  RegisterParticipantResponsePayload,
} from '@wizard/models/register-participant-api.model'
import {
  ResendEmailRequestBody,
  ResendEmailResponsePayload,
} from '@wizard/models/resend-emai-api.model'

export const checkRegistrationAPI = (
  requestParams: CheckRegistrationRequestParams
): Promise<ApiResponse<CheckRegistrationResponsePayload>> =>
  getAPI(
    API.PUBLIC.CHECK_REGISTRATION.URL,
    {},
    true,
    false,
    true,
    true,
    requestParams
  )

//suggestion combine this Three API Function into one

export const getMaster = (
  dataType: MasterType,
  params?: AsyncReqParam
): Promise<ApiResponse<SubDivisionsResponse>> =>
  postAPI(
    parseAPI(API.PUBLIC.SUBDIVISION_MASTER.URL, {
      dataType: dataType,
    }),
    params,
    {},
    false,
    false,
    false,
    false
  )

export const registerParticipant = (
  requestBody?: RegisterParticipantRequestBody
): Promise<ApiResponse<RegisterParticipantResponsePayload>> =>
  postAPI(API.PUBLIC.REGISTER.URL, requestBody)

export const resendEmail = (
  requestBody?: ResendEmailRequestBody,
  showLoader = true,
  showSuccessAlert = true
): Promise<ApiResponse<ResendEmailResponsePayload>> =>
  postAPI(
    API.PUBLIC.RESEND_EMAIL.URL,
    requestBody,
    {},
    showLoader,
    showSuccessAlert
  )
