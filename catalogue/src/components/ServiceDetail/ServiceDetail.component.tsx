import {
  Certificate,
  Owner,
  Location as LocationSvg,
  Tooltip,
  StarMUIIcon,
  StarBorderOutlinedIcon,
  VisibilityOutlinedIcon,
  DownloadIcon,
} from '@gaia-x-frontend/components-lib'
import { getAlert } from '@catalogue/hooks/useAlert.hooks'
import { serviceOfferingJSON } from '@catalogue/api/catalogue.api'
import {
  Location,
  ServiceDetail as ServiceDetailType,
} from '@catalogue/models/Catalogue.model'
import ServiceDetailStyle from './ServiceDetail.module.scss'
type ServiceDetailProps = {
  serviceDetail: ServiceDetailType
}
const ServiceDetail = ({ serviceDetail }: ServiceDetailProps) => {
  const level = parseInt(serviceDetail.labelLevel?.charAt(1)) || 0
  const maxLevel = 3
  const Stars = Array.from({ length: maxLevel }, (_, index) => (
    <div key={index} className={ServiceDetailStyle.icon}>
      {level >= index + 1 ? <StarMUIIcon /> : <StarBorderOutlinedIcon />}
    </div>
  ))
  let otherLocation: Location[] = []
  if (serviceDetail.locations.length > 2) {
    const OL = serviceDetail.locations.slice(2)
    otherLocation = OL
  }
  const formatScore = (val: number | null) => {
    return val == null || isNaN(val) ? 'N/A' : val.toFixed(2)
  }
  const onActionHandler = (type: string, url: string) => {
    if (type === 'view') {
      window.open(url, '_blank')
    } else {
      if (url) {
        serviceOfferingJSON(url)
          .then((res) => {
            saveFile(JSON.stringify(res), 'text/json', 'participant.json')
          })
          .catch(() => {
            getAlert('error', 'Error in downloading JSON')
          })
      }
    }
  }
  const saveFile = (file: any, fileType: string, fileName: string) => {
    const data = new Blob([file], { type: fileType })
    const csvURL = window.URL.createObjectURL(data)
    const tempLink = document.createElement('a')
    tempLink.href = csvURL
    tempLink.setAttribute('download', fileName)
    tempLink.click()
  }
  return (
    <div className={'px-[3.2rem] py-[2.4rem]'}>
      <div className="relative flex w-[100%]">
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__Title +
            ' mb-[1.8rem] w-[80%] flex flex-wrap text-[2.2rem] font-[600]'
          }
        >
          {serviceDetail.name}
        </div>
        <div className=" absolute right-0 w-[15%] flex justify-between gap-[1rem]">
          <div
            onClick={() => {
              onActionHandler('view', serviceDetail.credentialSubjectId)
            }}
          >
            <VisibilityOutlinedIcon
              className="cursor-pointer"
              fontSize="large"
            />
          </div>
          <div
            onClick={() => {
              onActionHandler('download', serviceDetail.credentialSubjectId)
            }}
          >
            <DownloadIcon className="cursor-pointer" fontSize="large" />
          </div>
        </div>
      </div>
      <div
        className={
          ServiceDetailStyle.serviceDetailCard__Label +
          ' flex  mb-[1.8rem] text-[1.8rem] font-[600]'
        }
      >
        {Stars}
        <div className="pl-[1rem]">Level {level}</div>
      </div>
      <div
        className={
          ServiceDetailStyle.serviceDetailCard__Description +
          ' mb-[2.4rem] text-[1.6rem] font-[400]'
        }
      >
        {serviceDetail.description}
      </div>
      <hr className={ServiceDetailStyle.dividerLine} />
      <div className="my-[2.4rem]">
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__SubLabel + ' mb-[1.2rem]'
          }
        >
          Details
        </div>
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex gap-[1rem]">
            <Owner />
            <div className={ServiceDetailStyle.serviceDetailCard__Value}>
              {serviceDetail.participant?.name}
            </div>
          </div>
          <div className="flex gap-[1rem]">
            <div>
              <Certificate />
            </div>
            <div className="">
              {serviceDetail.protectionRegime.length == 0 ? (
                <span
                  className={
                    ServiceDetailStyle.serviceDetailCard__Value + ' break-words'
                  }
                >
                  N/A
                </span>
              ) : null}
              {serviceDetail.protectionRegime.map((cert, index) => {
                return (
                  <span
                    className={
                      ServiceDetailStyle.serviceDetailCard__Value +
                      ' break-words'
                    }
                    key={index}
                  >
                    {cert.name}
                    {index + 1 != serviceDetail.protectionRegime.length
                      ? `, `
                      : ` `}
                  </span>
                )
              })}
            </div>
          </div>
          <div className="flex gap-[1rem]">
            <LocationSvg />
            <div
              className={
                ServiceDetailStyle.serviceDetailCard__Value__Location +
                ' flex gap-[1rem] text-[1.8rem] font-[400]'
              }
            >
              {serviceDetail.locations.length == 0 ? 'N/A' : null}
              {serviceDetail.locations.map((loc, index) => {
                if (index < 2) {
                  return (
                    <div>
                      <span key={index}>
                        {loc.name +
                          (index == 0 && serviceDetail.locations.length > 1
                            ? ' , '
                            : ' ')}
                      </span>
                    </div>
                  )
                } else if (index == 2) {
                  return (
                    <div>
                      <Tooltip
                        title={otherLocation.map((oL, index) => {
                          if (index == otherLocation.length - 1) return oL.name
                          else return oL.name + ', '
                        })}
                      >
                        <div
                          className={
                            ServiceDetailStyle.serviceDetailCard__Circle +
                            ' flex items-center justify-center text-center rounded-[50%] w-[2.4rem] h-[2.4rem] text-[1.4rem] font-[400]'
                          }
                        >
                          {`+` + `${serviceDetail.locations.length - 2}`}
                        </div>
                      </Tooltip>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <hr className={ServiceDetailStyle.dividerLine} />
      <div className="my-[2.4rem]">
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__SubLabel + ' mb-[1.2rem]'
          }
        >
          Depends On
        </div>
        <div className="mb-[2rem]">
          {serviceDetail.dependedServices.length == 0 ? 'N/A' : null}
          {serviceDetail.dependedServices.map((dependsOn, index) => {
            return (
              <span
                key={dependsOn.id}
                className={ServiceDetailStyle.serviceDetailCard__Hyperlink}
              >
                <a href={dependsOn.credentialSubjectId} target="_blank">
                  {dependsOn.name}
                </a>

                {index < serviceDetail.dependedServices.length - 1 && ', '}
              </span>
            )
          })}
        </div>
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__SubLabel + ' mb-[1.2rem]'
          }
        >
          Aggregation of
        </div>
        <div className="mb-[2rem]">
          {serviceDetail.resources.length == 0 ? 'N/A' : null}
          {serviceDetail.resources.map((resource, index) => {
            return (
              <span
                key={resource.id}
                className={ServiceDetailStyle.serviceDetailCard__Hyperlink}
              >
                <a href={resource.credentialSubjectId} target="_blank">
                  {resource.name}
                </a>
                {index < serviceDetail.resources.length - 1 && ', '}
              </span>
            )
          })}
        </div>
      </div>
      <hr className={ServiceDetailStyle.dividerLine} />
      <div className="mt-[2.4rem]">
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__SubLabel + ' mb-[1.2rem]'
          }
        >
          Trust Score
        </div>
        <div
          className={ServiceDetailStyle.serviceDetailCard__Value + ' mb-[2rem]'}
        >
          {formatScore(serviceDetail.trustIndex)}
        </div>
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__SubLabel + ' mb-[1.2rem]'
          }
        >
          Veracity
        </div>
        <div
          className={ServiceDetailStyle.serviceDetailCard__Value + ' mb-[2rem]'}
        >
          {formatScore(serviceDetail.veracity)}
        </div>
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__SubLabel + ' mb-[1.2rem]'
          }
        >
          Transparency
        </div>
        <div
          className={ServiceDetailStyle.serviceDetailCard__Value + ' mb-[2rem]'}
        >
          {formatScore(serviceDetail.transparency)}
        </div>
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__SubLabel + ' mb-[1.2rem]'
          }
        >
          Request type
        </div>
        <div
          className={ServiceDetailStyle.serviceDetailCard__Value + ' mb-[2rem]'}
        >
          {serviceDetail.dataAccountExport.requestType}
        </div>
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__SubLabel + ' mb-[1.2rem]'
          }
        >
          Access Type
        </div>
        <div
          className={ServiceDetailStyle.serviceDetailCard__Value + ' mb-[2rem]'}
        >
          {serviceDetail.dataAccountExport.accessType}
        </div>
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__SubLabel + ' mb-[1.2rem]'
          }
        >
          Format Type
        </div>
        <div
          className={ServiceDetailStyle.serviceDetailCard__Value + ' mb-[2rem]'}
        >
          {serviceDetail.dataAccountExport.formatType.map((format, index) => {
            return (
              <span key={index}>
                {format}
                {index <
                  serviceDetail.dataAccountExport.formatType.length - 1 && ', '}
              </span>
            )
          })}
        </div>
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__SubLabel + ' mb-[1.2rem]'
          }
        >
          T&C URL
        </div>
        <div
          className={
            ServiceDetailStyle.serviceDetailCard__Hyperlink + ' break-words '
          }
        >
          <a href={serviceDetail.tnCUrl} target="_blank">
            {serviceDetail.tnCUrl}
          </a>
        </div>
      </div>
    </div>
  )
}

export { ServiceDetail }
