import { useEffect, useState } from 'react'
import { useAuth } from '@wizard/contexts'
import { ExportDetailsType } from '@wizard/models/onBoard.model'
import { exportDetailsAPI } from '@wizard/api/onboard.api'
import {
  ExportParticipantInformation,
  ParticipantCreationStepper,
  ProvideDIDInformation,
} from '@wizard/components'

const ParticipantCreationPage = () => {
  const auth = useAuth()

  const lp = auth?.userConfig?.legalParticipantUrl
  const ownDid = auth?.userConfig?.ownDidSolution
  const [apiResponse, setApiResponse] = useState<
    ExportDetailsType | undefined
  >()
  useEffect(() => {
    if (lp) {
      exportDetailsAPI(auth?.userConfig?.id || '')
        .then((res) => {
          setApiResponse(res.payload)
        })
        .catch(() => {
          // console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])

  return (
    <div>
      {lp ? (
        <ExportParticipantInformation apiResponse={apiResponse} />
      ) : ownDid ? (
        <ProvideDIDInformation />
      ) : (
        <ParticipantCreationStepper />
      )}
    </div>
  )
}

export default ParticipantCreationPage
