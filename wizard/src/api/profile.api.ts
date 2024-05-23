import { ApiResponse } from '@wizard/models/api.model'
import { deleteAPI, getAPI, putAPI } from '@wizard/utils/ApiManager'
import { API } from '@wizard/utils/constants'
import { parseAPI } from '@wizard/utils/helpers'

export interface ParticipantProfileResponse {
  id: string
  legalName: string
  shortName: string
  email: string
  credential: {
    id: string
    vcUrl: string
  }
  headquarterAddress: string
  legalAddress: string
  legalRegistrationNumber: {
    'gx:EORI': string
    'gx:leiCode': string
    'gx:vatID': string
  }
  profileImage: string
  parentOrganization: string[]
  subOrganization: string[]
  entityType: {
    id: string
    type: string
  }
}

export const participantProfile = (
  participantId: string
): Promise<ApiResponse<ParticipantProfileResponse>> =>
  getAPI(
    parseAPI(API.PROFILE.GET_DETAILS.URL, { participantId }),
    {},
    false,
    false,
    false,
    true,
    {}
  )

export const uploadProfileImage = (
  participantId: string,
  formData: FormData
): Promise<ApiResponse<{ imageUrl: string }>> =>
  putAPI(
    parseAPI(API.PROFILE.UPLOAD_IMAGE.URL, { participantId }),
    formData,
    { 'Content-Type': 'multipart/form-data' },
    true,
    true
  )

export const deleteProfileImage = (
  participantId: string
): Promise<ApiResponse<{ imageUrl: string }>> =>
  deleteAPI(
    parseAPI(API.PROFILE.DELETE_IMAGE.URL, { participantId }),
    {},
    {},
    true,
    true
  )

export const participantProfileJSON = (
  url: string
): Promise<ApiResponse<ParticipantProfileResponse>> =>
  getAPI(url, {}, true, false, false, true, {})
