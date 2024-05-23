export type CheckConfigResponse = {
  id: string
  email: string
  legalName: string
  did: string
  participantType: string
  ownDidSolution: boolean
  privateKeyRequired: boolean
  legalParticipantUrl: string
  status: number
  keyStored: boolean
}
