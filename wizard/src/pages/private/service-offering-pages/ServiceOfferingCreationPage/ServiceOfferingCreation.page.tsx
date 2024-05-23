import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DialogCustom, FormStepper } from '@gaia-x-frontend/components-lib'
import { PRIVATE, ROUTES_CONST } from '@wizard/routes/routes'
import {
  RequestLabel,
  ServiceCreate,
  ESign,
  PostCreationConfirmationBody,
} from '@wizard/components'
import { useAuth } from '@wizard/contexts'
import { postCreateServiceOffer } from '@wizard/api/serviceCreation.api'
import { getAlert } from '@wizard/hooks/useAlert.hooks'
import { KeyValueType } from '@wizard/models/base.model'
import {
  CreatedServiceResponseType,
  ServiceOfferingFinalFormPrototype,
} from '@wizard/models/service-creation.model'
import { getConfigAPI } from '@wizard/api/onboard.api'

type StepProps = {
  label: string
  description?: string
}

const ServiceOfferingCreation = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [createdServiceData, setCreatedServiceData] =
    useState<CreatedServiceResponseType>()
  const [isCreateServiceLoading, setIsCreateServiceLoading] = useState(false)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [serviceCreationForm, setServiceCreationForm] =
    useState<ServiceOfferingFinalFormPrototype>()
  const stepComponents = [ServiceCreate, RequestLabel, ESign]
  const CurrentStepComponent = stepComponents[activeStep] || null

  const formStepper = auth?.userConfig?.keyStored
    ? [
        {
          label: 'Service details',
          description: '',
        },
        {
          label: 'Request label',
          description: '',
        },
      ]
    : [
        {
          label: 'Service details',
          description: '',
        },
        {
          label: 'Request label',
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
    if (isCreateServiceLoading) return
    setIsCreateServiceLoading(true)
    const param = {
      name: serviceCreationForm!.serviceName,
      verificationMethod: value?.verificationMethodId
        ? value?.verificationMethodId
        : null,
      ...(serviceCreationForm?.description
        ? { description: serviceCreationForm?.description }
        : null),
      ...(value?.storeForFuture ? { storeVault: value?.storeForFuture } : null),
      privateKey: value?.signWithPrivateKey ?? null,

      credentialSubject: {
        'gx:termsAndConditions': {
          'gx:URL': serviceCreationForm?.termsUrl,
        },
        'gx:policy': {
          'gx:location': serviceCreationForm?.locationOfService?.map(
            (item) => item.value
          ),
          ...(serviceCreationForm?.othersPolicy &&
          serviceCreationForm?.othersPolicy.length
            ? {
                'gx:customAttribute': JSON.stringify(
                  serviceCreationForm?.othersPolicy
                ),
              }
            : null),
        },
        'gx:dataAccountExport': {
          'gx:requestType': serviceCreationForm?.requestType,
          'gx:accessType': serviceCreationForm?.accessType,
          'gx:formatType': serviceCreationForm?.formateType?.map(
            (item) => item.label
          ),
        },
        'gx:aggregationOf': serviceCreationForm?.vcUrl?.map((item) => ({
          id: item.value,
        })),
        ...(serviceCreationForm?.dependsOn?.length
          ? {
              'gx:dependsOn': serviceCreationForm?.dependsOn?.map((item) => ({
                id: item?.value,
              })),
            }
          : null),
        ...(serviceCreationForm?.supportedStandards?.length
          ? {
              'gx:dataProtectionRegime':
                serviceCreationForm?.supportedStandards.map(
                  (item) => item.value
                ),
            }
          : null),
        'gx:criteria': serviceCreationForm?.labelLevelCs,
        type: 'gx:ServiceOffering',
      },
    }
    postCreateServiceOffer(param)
      .then((res) => {
        setCreatedServiceData(res.payload)
        setOpenConfirmation(true)
        if (value?.storeForFuture) {
          getConfigAPI()
            .then((res) => {
              auth?.setConfig(res.payload)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        getAlert('error', err?.message)
        // setActiveStep(0)
      })
      .finally(() => {
        setIsCreateServiceLoading(false)
      })
  }
  const handleCloseDialogue = () => {
    navigate(`/${PRIVATE}/${ROUTES_CONST.SERVICE_MANAGEMENT}`)
    setOpenConfirmation(false)
  }

  return (
    <div className="flex">
      <div className={' w-[30rem] pt-[3rem] pl-[2.8rem] border-[1px] bg-white'}>
        <FormStepper
          steps={formStepper}
          activeStep={activeStep}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          onClickLevel={(steps) => onChangeEvent(steps)}
        />
      </div>

      <div
        className={
          ' pt-[3rem] flex-1 px-[4rem] bg-white border-[1px] border-l-0 h-[calc(100vh-20.6rem)] overflow-auto'
        }
      >
        {CurrentStepComponent && (
          <CurrentStepComponent
            onClickNext={handleClickNext}
            onClickPrev={handleClickPrev}
            setServiceCreationForm={setServiceCreationForm}
            serviceCreationForm={serviceCreationForm}
            onSubmitform={handleSubmitForm}
            isSubmitLoading={isCreateServiceLoading}
            isPrivate={true}
          />
        )}
      </div>
      <DialogCustom
        open={openConfirmation}
        title="Important information"
        children={
          <PostCreationConfirmationBody url={createdServiceData?.vcUrl ?? ''} />
        }
        onClose={handleCloseDialogue}
        onSubmit={handleCloseDialogue}
        submitText="Proceed"
      />
    </div>
  )
}

export default ServiceOfferingCreation
