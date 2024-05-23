import { CheckConfigResponse } from '@wizard/models/check-config.model'

export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
  PutMultipart = 'putMultiPart',
  PostMultipart = 'postMultiPart',
}

export enum ApiStatus {
  Pending = 'pending',
  InProgress = 'in progress',
  Success = 'success',
  Failure = 'failure',
}

export const STANDARD_LIMIT_FOR_PAGINATION = 20

export const DASHBOARD_CONTAINER_ID = 'contentContainerId'

export const configSuccessConstants = {
  STARTED: 1,
  DOMAIN_CREATED: 2,
  CERTIFICATE_CREATED: 4,
  INGRESS_CREATED: 6,
  DID_JSON_CREATED: 8,
  PARTICIPANT_JSON_CREATED: 10,
}

export const configFailureConstants = {
  DOMAIN_CREATION_FAILED: 3, //SUBDOMAIN
  CERTIFICATE_CREATION_FAILED: 5,
  INGRESS_CREATION_FAILED: 7,
  DID_JSON_CREATION_FAILED: 9,
  PARTICIPANT_JSON_CREATION_FAILED: 11,
}

export const inProgressConstants = {
  CERTIFICATE_CREATION_IN_PROCESS: 12,
}

export const certProgress = {
  STARTED: 1,
  DOMAIN_CREATED: 2,
  DOMAIN_CREATION_FAILED: 3, //SUBDOMAIN
  CERTIFICATE_CREATED: 4,
  CERTIFICATE_CREATION_FAILED: 5,
  INGRESS_CREATED: 6,
  INGRESS_CREATION_FAILED: 7,
  DID_JSON_CREATED: 8,
  DID_JSON_CREATION_FAILED: 9,
  PARTICIPANT_JSON_CREATED: 10,
  PARTICIPANT_JSON_CREATION_FAILED: 11,
  CERTIFICATE_CREATION_IN_PROCESS: 12,
}

export const steps = [
  {
    label: 'Creating your domain',
  },
  {
    label: 'Creating your certificate',
  },
  {
    label: 'Setting up your domain name',
  },
  {
    label: 'Creating your unique identity',
  },
  {
    label: 'On-boarding you on Gaia-X',
  },
]

export enum MasterType {
  SubDivision = 'subdivision',
  RegistrationType = 'registration',
  Standard = 'standard',
  EntityType = 'entity',
  RequestType = 'request',
  AccessType = 'access',
  FormateType = 'format',
}

export const RegistrationTypeVCKey: { [key: string]: string } = {
  EORI: 'gx:EORI',
  'VAT ID': 'gx:vatID',
  'LEI CODE': 'gx:leiCode',
}

export enum RouteType {
  Public,
  NonParticipant,
  Participant,
}

export enum ParticipantCreationSteps {
  Started,
  SubdomainCreated,
  CertificateCreated,
  IngressCreated,
  DidCreated,
  JsonCreated,
}

export enum ResourceType {
  PHYSICAL = 'PhysicalResource',
  VIRTUAL = 'VirtualResource',
}

export const RESOURCE_TYPE_MAP = {
  [ResourceType.PHYSICAL]: {
    label: 'Physical',
    value: ResourceType.PHYSICAL,
  },
  [ResourceType.VIRTUAL]: {
    label: 'Virtual',
    value: ResourceType.VIRTUAL,
  },
}

export const ResourceTypeList = Object.values(RESOURCE_TYPE_MAP)

export enum ResourceSubType {
  SOFTWARE = 'VirtualSoftwareResource',
  DATA = 'VirtualDataResource',
}

export const RESOURCE_SUB_TYPE_MAP = {
  [ResourceSubType.SOFTWARE]: {
    label: 'Software',
    value: ResourceSubType.SOFTWARE,
  },
  [ResourceSubType.DATA]: {
    label: 'Data',
    value: ResourceSubType.DATA,
  },
}

export const ResourceSubTypeList = Object.values(RESOURCE_SUB_TYPE_MAP)
export const LABEL_LEVEL_RULE: any = {
  BC: [
    'gx:P1.1.1',
    'gx:P1.1.3',
    'gx:P1.1.4',
    'gx:P1.2.1',
    'gx:P1.2.2',
    'gx:P1.2.3',
    'gx:P1.2.4',
    'gx:P1.2.5',
    'gx:P1.2.6',
    'gx:P1.2.7',
    'gx:P1.2.8',
    'gx:P1.2.9',
    'gx:P1.2.10',
    'gx:P1.3.1',
    'gx:P1.3.2',
    'gx:P1.3.3',
    'gx:P1.3.4',
    'gx:P1.3.5',
    'gx:P2.1.2',
    'gx:P2.1.3',
    'gx:P2.2.1',
    'gx:P2.2.2',
    'gx:P2.2.3',
    'gx:P2.2.5',
    'gx:P2.2.6',
    'gx:P2.2.7',
    'gx:P2.3.2',
    'gx:P2.3.3',
    'gx:P3.1.1',
    'gx:P3.1.2',
    'gx:P3.1.3',
    'gx:P3.1.4',
    'gx:P3.1.5',
    'gx:P3.1.6',
    'gx:P3.1.7',
    'gx:P3.1.8',
    'gx:P3.1.9',
    'gx:P3.1.10',
    'gx:P3.1.11',
    'gx:P3.1.12',
    'gx:P3.1.13',
    'gx:P3.1.14',
    'gx:P3.1.15',
    'gx:P3.1.16',
    'gx:P3.1.17',
    'gx:P3.1.18',
    'gx:P3.1.19',
    'gx:P3.1.20',
    'gx:P4.1.1',
    'gx:P4.1.2',
    'gx:P5.2.1',
  ],
}

export const DATE_TIME_FORMATE = 'YYYY-MM-DD HH:mm:ss.000'

export const RECALL_API = 15000
export const MAX_RETRY = 5

export enum InputChipsAddOnOption {
  TAB = 'Tab',
  COMMA = ',',
  ENTER = 'Enter',
}

export enum AllResourceTypeFilter {
  PHYSICAL = 'gx:PhysicalResource',
  VIRTUAL_SOFTWARE = 'gx:VirtualSoftwareResource',
  VIRTUAL_DATA = 'gx:VirtualDataResource',
}

export const ALL_RESOURCE_TYPE_FILTER_MAP = {
  [AllResourceTypeFilter.PHYSICAL]: {
    text: 'Physical',
    value: AllResourceTypeFilter.PHYSICAL,
  },
  [AllResourceTypeFilter.VIRTUAL_SOFTWARE]: {
    text: 'Virtual (Software)',
    value: AllResourceTypeFilter.VIRTUAL_SOFTWARE,
  },
  [AllResourceTypeFilter.VIRTUAL_DATA]: {
    text: 'Virtual (Data)',
    value: AllResourceTypeFilter.VIRTUAL_DATA,
  },
}

export const AllResourceTypeFilterList = Object.values(
  ALL_RESOURCE_TYPE_FILTER_MAP
)
export const INITIAL_USER_CONFIG: CheckConfigResponse = {
  id: '',
  email: '',
  did: '',
  legalName: '',
  participantType: '',
  privateKeyRequired: false,
  ownDidSolution: false,
  keyStored: false,
  legalParticipantUrl: '',
  status: 0,
}

export const FILE_SIZE_1MB = 1000000
