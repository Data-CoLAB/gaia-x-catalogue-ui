import ResourceCreationStyled from './Resource.module.scss'
import { DialogCustom, FormStepper } from '@gaia-x-frontend/components-lib'
import { getAlert } from '@wizard/hooks/useAlert.hooks'
import { KeyValueType } from '@wizard/models/base.model'
import { postCreatePublicResourceCreation } from '@wizard/api/resourceCreation.api'
import { removeEmptyFields } from '@wizard/utils/helpers'
import { ROUTES_CONST } from '@wizard/routes/routes'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  ResourceCreationStep,
  ESign,
  PostCreationConfirmationBody,
} from '@wizard/components'
import {
  ResourceCreationParamType,
  ResourceCreationResponseType,
} from '@wizard/models/resource-creation.model'

type StepProps = {
  label: string
  description?: string
}

const ResourcePage = () => {
  const navigate = useNavigate()
  const [resourceParams, setResourceParams] = useState<object>()

  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [createdResourceData, setCreatedResourceData] =
    useState<ResourceCreationResponseType>()
  const [isCreateResourceLoading, setIsCreateResourceLoading] = useState(false)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [resourceCreationForm, setResourceCreationForm] = useState<object>()
  const stepComponents = [ResourceCreationStep, ESign]
  const CurrentStepComponent = stepComponents[activeStep] || null

  const formStepper = [
    {
      label: 'Resource details',
      description: '',
    },
    {
      label: 'eSign form',
      description: '',
    },
  ]

  const onChangeEvent = (steps: StepProps) => {
    formStepper.forEach((stepItem, index) => {
      if (stepItem.label === steps.label) setActiveStep(index)
    })
  }
  const handleClickNext = () => {
    setActiveStep((step) => step + 1)
  }
  const handleClickPrev = () => {
    setActiveStep((step) => step - 1)
  }

  const handleSubmitForm = (value?: KeyValueType) => {
    if (isCreateResourceLoading) return
    setIsCreateResourceLoading(true)
    let params = {}
    params = {
      participantJsonUrl: value?.participantJson,
      verificationMethod: value?.verificationMethodId,
      privateKey: value?.signWithPrivateKey,
      ...resourceParams,
    }
    params = removeEmptyFields(params)

    postCreatePublicResourceCreation(params as ResourceCreationParamType)
      .then((response) => {
        setCreatedResourceData(response.payload)
        setOpenConfirmation(true)
        setActiveStep(0)
        setResourceCreationForm(undefined)
      })
      .catch((error) => {
        getAlert('error', error.message)
        setActiveStep(0)
      })
      .finally(() => {
        setIsCreateResourceLoading(false)
      })
  }

  const handleCloseDialogue = () => {
    navigate(`/${ROUTES_CONST.PUBLIC}/${ROUTES_CONST.PUBLIC_RESOURCE_CREATE}`)
    setOpenConfirmation(false)
  }

  return (
    <div className="bg-[#FAFAFF]">
      <div className="flex gap-[3rem] bg-white">
        <div
          className={
            ResourceCreationStyled.ResourceCreationStepper +
            ' w-[30rem] pt-[3rem] pl-[2.8rem] bg-white h-[calc(100vh-20rem)]'
          }
        >
          <FormStepper
            steps={formStepper}
            activeStep={activeStep}
            onClickLevel={(steps) => onChangeEvent(steps)}
          ></FormStepper>
        </div>

        <div
          className={
            ResourceCreationStyled.ResourceCreationStepperContent +
            ' h-[calc(100vh - 20.7rem)] w-[100%] overflow-auto h-[calc(100vh-12rem)]'
          }
        >
          {CurrentStepComponent && (
            <CurrentStepComponent
              onClickNext={handleClickNext}
              isSubmitLoading={isCreateResourceLoading}
              setCreateResourceLoading={setIsCreateResourceLoading}
              onClickPrev={handleClickPrev}
              setServiceCreationForm={setResourceCreationForm}
              setResourceParams={setResourceParams}
              resourceCreationForm={resourceCreationForm}
              onSubmitform={handleSubmitForm}
              isPrivate={false}
            />
          )}
        </div>
      </div>
      <DialogCustom
        open={openConfirmation}
        title="Resource Created Successfully"
        children={
          <PostCreationConfirmationBody
            url={createdResourceData?.vcUrl ? createdResourceData?.vcUrl : ''}
            title="Resource JSON"
          />
        }
        onClose={handleCloseDialogue}
        onSubmit={handleCloseDialogue}
        submitText="Proceed"
      />
    </div>
  )
}

export default ResourcePage
