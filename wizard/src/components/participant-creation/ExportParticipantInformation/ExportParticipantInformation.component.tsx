import { Button } from '@gaia-x-frontend/components-lib'
import { ExportDetailsType } from '@wizard/models/onBoard.model'
import { ParticipantCreationContainerTwo } from '../ParticipantCreationContainerTwo'
import { ClipBoard, ContainerCard } from '@wizard/components'
import { useNavigate } from 'react-router-dom'
import { ROUTES_CONST } from '@wizard/routes/routes'

type ParticipantInformationProps = {
  apiResponse?: ExportDetailsType
}
const ExportParticipantInformation = ({
  apiResponse,
}: ParticipantInformationProps) => {
  const clipBoardInformation = []
  const navigate = useNavigate()
  if (apiResponse?.participantJson) {
    clipBoardInformation.push({
      heading: 'Participant json',
      text: apiResponse.participantJson,
    })
  }

  if (apiResponse?.privateKey) {
    clipBoardInformation.push({
      heading: 'Private key',
      text: apiResponse.privateKey,
    })
  }

  return (
    <div>
      <ParticipantCreationContainerTwo
        title={`Please wait\nwhile we set things up for you`}
      >
        <ContainerCard headerTitle={'Important Information'}>
          <div className="p-[5rem]">
            <p className="text-black text-[2.2rem] leading-auto">
              Although we store these details on the platform, we suggest that
              you copy these and have a backup of your personal information
            </p>
            <div>
              {clipBoardInformation.map((clip) => {
                return (
                  <ClipBoard
                    key={clip.heading}
                    heading={clip.heading}
                    text={clip.text}
                  />
                )
              })}
            </div>
            <div className={'mt-[5rem] flex w-[100%] justify-center'}>
              {apiResponse ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(ROUTES_CONST.ROOT)
                  }}
                >
                  Proceed
                </Button>
              ) : null}
            </div>
          </div>
        </ContainerCard>
      </ParticipantCreationContainerTwo>
    </div>
  )
}

export { ExportParticipantInformation }
