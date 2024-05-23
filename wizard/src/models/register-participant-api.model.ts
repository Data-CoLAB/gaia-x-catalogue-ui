/* eslint-disable @typescript-eslint/no-empty-interface */
export interface RegisterParticipantRequestBody {
  email: string
  onboardRequest: {
    legalName: string
    shortName: string
    entityType: string
    ownDid: boolean
    acceptedTnC: boolean
    credential: {
      legalParticipant: {
        credentialSubject: {
          'gx:legalName': string
          'gx:headquarterAddress': {
            'gx:countrySubdivisionCode': string
          }
          'gx:legalAddress': {
            'gx:countrySubdivisionCode': string
          }
          'gx:parentOrganization'?: {
            id: string
          }[]
          'gx:subOrganization'?: {
            id: string
          }[]
        }
      }
      legalRegistrationNumber: {
        [key: string]: string
      }
    }
  }
}
export interface RegisterParticipantResponsePayload {}
