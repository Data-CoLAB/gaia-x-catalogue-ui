import { HttpMethod } from './common.constants'

export const API_BASE_URL = import.meta.env.VITE_WIZARD_API_BASE_URL
export const CATALOGUE_URL = import.meta.env.VITE_CATALOGUE_HOST

export const API = {
  PUBLIC: {
    CHECK_REGISTRATION: {
      Method: HttpMethod.Get,
      URL: `/public/check-registration`,
    },
    SUBDIVISION_MASTER: {
      Method: HttpMethod.Post,
      URL: `/public/master-data/{dataType}/filter`,
    },
    REGISTER: {
      Method: HttpMethod.Post,
      URL: `/public/register`,
    },
    RESEND_EMAIL: {
      Method: HttpMethod.Post,
      URL: `/public/registration/send-email`,
    },
    SPDX_LICENSE_LIST: {
      Method: HttpMethod.Post,
      URL: `/public/master-data/spdxLicense/filter`,
    },

    SERVICE_OFFER: {
      CREATE: {
        Method: HttpMethod.Post,
        URL: `/public/service-offer`,
      },
      VALIDATE: {
        Method: HttpMethod.Post,
        URL: `/public/service-offer/validate`,
      },
      LIST: {
        Method: HttpMethod.Post,
        URL: `/public/service-offer/filter`,
      },
    },

    RESOURCE: {
      CREATE: {
        Method: HttpMethod.Post,
        URL: `/public/resource`,
      },
      VALIDATE: {
        Method: HttpMethod.Post,
        URL: `/public/resource/validation`,
      },
      LIST: {
        Method: HttpMethod.Post,
        URL: `/public/resource/filter`,
      },
    },
  },

  CONFIG: {
    GET: {
      Method: HttpMethod.Get,
      URL: `/participant/config`,
    },
  },

  PARTICIPANT: {
    ONBOARD: {
      Method: HttpMethod.Post,
      URL: `/onboard/participant/{participantId}`,
    },
    RESUME_DID: {
      Method: HttpMethod.Get,
      URL: `/did/{participantId}`,
    },
    RESUME_PARTICIPANT: {
      Method: HttpMethod.Get,
      URL: `/participant/{participantId}`,
    },
    EXPORT_DETAILS: {
      Method: HttpMethod.Post,
      URL: `/participant/{participantId}/export`,
    },
    // ResumeSubDomain: {
    //   Method: HttpMethod.GET,
    //   URL: `/subdomain/{participantId}`,
    // },
    // ResumeIngress: {
    //   Method: HttpMethod.GET,
    //   URL: `/ingress/{participantId}`,
    // },
    // ResumeCertificate: {
    //   Method: HttpMethod.GET,
    //   URL: `/certificate/{participantId}`,
    // },
  },

  SERVICE_OFFER: {
    CREATE: {
      Method: HttpMethod.Post,
      URL: `/service-offer`,
    },
    LIST: {
      Method: HttpMethod.Post,
      URL: `/participant/{participantId}/service-offer/filter`,
    },
    GET_DETAILS: {
      Method: HttpMethod.Post,
      URL: `/participant/{participantId}/service-offer/{serviceOfferId}`,
    },
  },

  RESOURCE: {
    CREATE: {
      Method: HttpMethod.Post,
      URL: `/participant/{participantId}/resource`,
    },
    LIST: {
      Method: HttpMethod.Post,
      URL: `/participant/{participantId}/resource/filter`,
    },
  },

  PROFILE: {
    GET_DETAILS: {
      Method: HttpMethod.Get,
      URL: `/participant/{participantId}/profile`,
    },
    UPLOAD_IMAGE: {
      Method: HttpMethod.Put,
      URL: `/participant/{participantId}/profile-image`,
    },
    DELETE_IMAGE: {
      Method: HttpMethod.Delete,
      URL: `/participant/{participantId}/profile-image`,
    },
  },
}
