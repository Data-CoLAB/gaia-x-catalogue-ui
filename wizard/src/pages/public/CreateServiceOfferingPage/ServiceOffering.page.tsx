import { useState } from 'react'
import { DialogCustom, FormStepper } from '@gaia-x-frontend/components-lib'
import {
  RequestLabel,
  ServiceCreate,
  ESign,
  PostCreationConfirmationBody,
} from '@wizard/components'
import {
  CreatedServiceResponseType,
  ServiceOfferingFinalFormPrototype,
} from '@wizard/models/service-creation.model'
import { postCreatePublicServiceOffer } from '@wizard/api/serviceCreation.api'
import { getAlert } from '@wizard/hooks/useAlert.hooks'
import { KeyValueType } from '@wizard/models/base.model'
import ServiceCreationStyled from './ServiceOffering.module.scss'

const ServiceOfferingPage = () => {
  const [isCreateServiceLoading, setIsCreateServiceLoading] = useState(false)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [createdServiceData, setCreatedServiceData] =
    useState<CreatedServiceResponseType>()
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [serviceCreationForm, setServiceCreationForm] = useState<
    ServiceOfferingFinalFormPrototype | undefined
  >()
  const stepComponents = [ServiceCreate, RequestLabel, ESign]
  const CurrentStepComponent = stepComponents[activeStep] || null

  const formStepper = [
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

  const onChangeEvent = (steps: {
    id?: string | number
    label: string
    description?: string
  }) => {
    formStepper.forEach((stepItem, index) => {
      if (stepItem.label === steps.label) {
        setActiveStep(index)
      }
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
      participantJsonUrl: value?.participantJson,
      ...(serviceCreationForm?.description
        ? { description: serviceCreationForm?.description }
        : null),
      // ...(value?.storeForFuture ? { storeVault: value?.storeForFuture } : null),
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
    postCreatePublicServiceOffer(param)
      .then((res) => {
        setCreatedServiceData(res.payload)
        setOpenConfirmation(true)
        setActiveStep(0)
        setServiceCreationForm(undefined)
      })
      .catch((err) => {
        getAlert('error', err.message)
        // setActiveStep(0)
      })
      .finally(() => {
        setIsCreateServiceLoading(false)
      })
  }

  return (
    <div className={ServiceCreationStyled.container}>
      <div className={ServiceCreationStyled.formContainer + ' flex'}>
        <div
          className={
            ServiceCreationStyled.ResourceCreationStepper +
            ' w-[30rem] pt-[3rem] pl-[2.8rem] border-[1px]'
          }
        >
          <FormStepper
            steps={formStepper}
            activeStep={activeStep}
            onClickLevel={(steps) => onChangeEvent(steps)}
          />
        </div>

        <div
          className={
            ServiceCreationStyled.ResourceCreationStepperContent +
            ' flex-1 pt-[3rem] px-[4rem] h-[calc(100vh-11.4rem)] overflow-auto'
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
              isPrivate={false}
            />
          )}
        </div>
      </div>
      <DialogCustom
        open={openConfirmation}
        title="Service Created Successfully"
        children={
          <PostCreationConfirmationBody
            url={createdServiceData?.vcUrl ? createdServiceData?.vcUrl : ''}
            msg="Save this VC for your personal information as we do not store this detail."
          />
        }
        onClose={() => setOpenConfirmation(false)}
        onSubmit={() => setOpenConfirmation(false)}
        submitText="Proceed"
      />
    </div>
  )
}

export default ServiceOfferingPage
