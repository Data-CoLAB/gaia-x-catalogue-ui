import { ContainerCard } from '@wizard/components'
import { DidForm } from '../DidForm'
import { ParticipantCreationContainerTwo } from '../ParticipantCreationContainerTwo'

const ProvideDIDInformation = () => {
  return (
    <div>
      <ParticipantCreationContainerTwo
        title={`As you mentioned that you would like to use your existing DID solution, please provide the following details, that we can use to create your unique identity / Participant Json`}
        titleClassName={'text-[2.4rem]'}
        contentClassName={' mt-[5rem]'}
      >
        <ContainerCard headerTitle={'Important information'}>
          <div className="p-[5rem]">
            <DidForm />
          </div>
        </ContainerCard>
      </ParticipantCreationContainerTwo>
    </div>
  )
}

export { ProvideDIDInformation }
