import { API } from '@wizard/utils/constants'
import { ApiResponse } from '@wizard/models/api.model'
import { CheckConfigResponse } from '@wizard/models/check-config.model'
import { getAPI, postAPI } from '@wizard/utils/ApiManager'
import { parseAPI } from '@wizard/utils/helpers'
import {
  ExportDetailsType,
  OnBoardParticipant,
  OnBoardParticipantResponse,
} from '@wizard/models/onBoard.model'

export const onBoardParticipantAPI = (
  onBoardParticipantReq: OnBoardParticipant,
  participantId: string
): Promise<ApiResponse<OnBoardParticipantResponse>> =>
  postAPI(
    parseAPI(API.PARTICIPANT.ONBOARD.URL, { participantId }),
    onBoardParticipantReq,
    {},
    false,
    true,
    true
  )

export const getConfigAPI = (): Promise<ApiResponse<CheckConfigResponse>> =>
  getAPI(API.CONFIG.GET.URL, {}, false, false, false, false, {})

// TODO: not in use
// export const resumeOnboardingAPI = (
//   participantId: string
// ): Promise<ApiResponse<CheckConfigResponse>> =>
//   getAPI(
//     parseAPI(API_CONSTANTS.CheckConfig.URL, { participantId }),
//     {},
//     false,
//     false,
//     false,
//     false,
//     {}
//   )

//todo : change response from any

// export const resumeSubDomainAPI = (
//   participantId: string
// ): Promise<ApiResponse<OnBoardParticipantResponse>> =>
//   getAPI(
//     parseAPI(API_CONSTANTS.ResumeSubDomain.URL, { participantId }),
//     {},
//     false,
//     false,
//     false,
//     false,
//     {}
//   )

// export const resumeCertificateAPI = (
//   participantId: string
// ): Promise<ApiResponse<OnBoardParticipantResponse>> =>
//   getAPI(
//     parseAPI(API_CONSTANTS.ResumeCertificate.URL, { participantId }),
//     {},
//     false,
//     false,
//     false,
//     false,
//     {}
//   )

// export const resumeIngressAPI = (
//   participantId: string
// ): Promise<ApiResponse<OnBoardParticipantResponse>> =>
//   getAPI(
//     parseAPI(API_CONSTANTS.ResumeIngress.URL, { participantId }),
//     {},
//     false,
//     false,
//     false,
//     false,
//     {}
//   )

export const resumeDidAPI = (
  participantId: string
): Promise<ApiResponse<OnBoardParticipantResponse>> =>
  getAPI(
    parseAPI(API.PARTICIPANT.RESUME_DID.URL, { participantId }),
    {},
    false,
    false,
    false,
    false,
    {}
  )

export const resumeParticipantAPI = (
  participantId: string
): Promise<ApiResponse<OnBoardParticipantResponse>> =>
  getAPI(
    parseAPI(API.PARTICIPANT.RESUME_PARTICIPANT.URL, {
      participantId,
    }),
    {},
    false,
    false,
    false,
    false,
    {}
  )

export const exportDetailsAPI = (
  participantId: string
): Promise<ApiResponse<ExportDetailsType>> =>
  getAPI(
    parseAPI(API.PARTICIPANT.EXPORT_DETAILS.URL, { participantId }),
    {},
    false,
    false,
    false,
    false,
    {}
  )
