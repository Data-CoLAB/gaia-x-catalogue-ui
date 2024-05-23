import { KeyValueType, Pagination } from './base.model'

export interface AggregationOfvc {
  id: string
  name: string
  typeLabel: string
  credential: {
    id: string
    vcUrl: string
  }
  selfDescription: string
  createdAt: string | number
}

export interface AggregationOfvcOption {
  type: string
  selfDescription: string
  label: string
  value: string
}

export interface AggregationOfvcPayload {
  content: AggregationOfvc[]
  pageable: Pagination
}

interface Criterion {
  column?: string
  operator?: string
  values?: string[]
}

export interface GetMasterParams {
  page: number
  size: number
  criteriaOperator?: string
  criteria?: Criterion[]
}
export interface Object {
  label: string
  value: string
}

export interface ServiceFormValues {
  serviceName: string
  othersPolicy: string[]
  termsUrl: string
  description: string
  dependsOn: Object[]
  supportedStandards: Object[]
  locationOfService: Object[]
  vcUrl: Object[]
  requestType: Object
  accessType: Object
  formateType: Object[]
}

export interface ServiceCreationThirdStep {
  participantJson: string
  verificationMethodId: string
  signWithPrivateKey: string
  storeForFuture: boolean
}

export interface ServiceOfferingFinalFormPrototype
  extends ServiceFormValues,
    ServiceCreationThirdStep {
  labelLevelCs: object
}

export interface CreateResourcesFinalFormPrototype
  extends ServiceCreationThirdStep {}
export interface ServiceofferValidateParams {
  name: string
  description: string
  credentialSubject: object
}

export interface ServiceCreationComponentProps {
  onClickNext: () => void
  setServiceCreationForm?: React.Dispatch<React.SetStateAction<any>>
  serviceCreationForm?: ServiceOfferingFinalFormPrototype | any
  onClickPrev: () => void
  isSubmitLoading: boolean
  onSubmitform: (value?: KeyValueType) => void
  isPrivate?: boolean
}

export interface FormOptionInterface {
  RequestType: {
    label: string
    value: string
  }[]
  AccessType: {
    label: string
    value: string
  }[]
}

export interface CreateServiceOfferParamType {
  name: string
  verificationMethod?: string | null
  description?: string | undefined
  participantJsonUrl?: string | undefined
  privateKey?: string | null
  credentialSubject: object | null
}
export interface CreatedServiceResponseType {
  description: string
  name: string
  vcJson: object
  vcUrl: string
}
