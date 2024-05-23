import { useParams } from 'react-router-dom'
import {
  Certificate,
  Location,
  Owner,
  Skeleton,
  Tooltip,
} from '@gaia-x-frontend/components-lib'
import { RenderStar, NoRecordDisplay } from '@wizard/components'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@wizard/contexts'
import { getServiceOfferingDetails } from '@wizard/api/serviceCreation.api'
import StyledServiceDetails from './ServiceOfferingDetails.module.scss'

const RenderLink = ({
  linkArray,
}: {
  linkArray: { name: string; credentialSubjectId: string }[]
}) => {
  return (
    <div className=" ">
      {linkArray.length == 0 ? 'N/A' : null}
      {linkArray.map((IndividualLink, index) => {
        return (
          <span key={IndividualLink.credentialSubjectId} className={''}>
            <a
              className={
                StyledServiceDetails.link + ' text-[1.8rem] font-[400]'
              }
              href={IndividualLink.credentialSubjectId}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              {IndividualLink.name}
            </a>

            {index < linkArray.length - 1 && ', '}
          </span>
        )
      })}
    </div>
  )
}

const ServiceOfferingDetails = () => {
  const { serviceId } = useParams()
  const auth = useAuth()

  function getServiceDetails() {
    return getServiceOfferingDetails(
      auth!.userConfig!.id,
      serviceId ?? ''
    ).then((res) => res.payload)
  }
  const {
    data: serviceDetails,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: getServiceDetails,
    queryKey: ['SoDetails', serviceId],
  })

  return isError ? (
    <NoRecordDisplay
      content={'Something went wrong.'}
      isError={isError}
      title={'Oops!'}
      link={''}
      onRetry={refetch}
    />
  ) : (
    <section
      className={
        StyledServiceDetails.container +
        ' flex py-[4rem] px-[6.3rem] gap-[15rem] rounded-[1rem]'
      }
    >
      <div className=" w-[calc(50%-7rem)] ">
        {isLoading ? (
          <>
            <Skeleton variant="text" width={'100%'} className="pb-[2rem] " />
            <Skeleton
              variant="text"
              width={'100%'}
              height={200}
              className="pb-[2rem] "
            />
            <Skeleton variant="text" width={'40%'} className="pb-[2rem] " />
          </>
        ) : (
          <div className=" border-b-[1px]">
            <h1
              className={
                StyledServiceDetails.title +
                ' mb-[1.6rem] capitalize text-[3rem] font-[600]'
              }
            >
              {serviceDetails?.name}
            </h1>
            <p
              className={
                StyledServiceDetails.textDetails +
                ' text-[1.6rem] font-[400] leading-[2.2rem] break-words '
              }
            >
              {serviceDetails?.description ?? 'N/A'}
            </p>
            <p className=" mt-[3rem] mb-[4rem] flex items-center gap-[1.3rem]">
              <RenderStar level={serviceDetails?.labelLevel ?? ''} />
              <span
                className={
                  StyledServiceDetails.levelText +
                  ' text-[2rem] font-[600] leading-[2.2rem] '
                }
              >
                {serviceDetails?.labelLevel}
              </span>
            </p>
          </div>
        )}
        {isLoading ? (
          <>
            <Skeleton variant="text" width={'30%'} className="pb-[2rem] " />
            <div className="flex gap-[1rem]">
              {Array.of(1, 2, 3).map((_, index) => (
                <div className="flex-1" key={index}>
                  <Skeleton
                    variant="circular"
                    width={'2rem'}
                    className="pb-[2rem] "
                  />
                  <Skeleton
                    variant="text"
                    width={'100%'}
                    className="pb-[2rem] "
                  />
                </div>
              ))}
            </div>
            <Skeleton variant="text" width={'100%'} className="pb-[10rem] " />
          </>
        ) : (
          <div className="">
            <h3
              className={
                StyledServiceDetails.subtitle + ' pt-[2.4rem] pb-[1.8rem]'
              }
            >
              Details
            </h3>
            <div className="flex gap-[3rem] pb-[5.5rem]  border-b-[1px]">
              <div className="flex-1">
                <Tooltip title="Owner">
                  <div className=" pb-[1rem] ">
                    <Owner />
                  </div>
                </Tooltip>
                <span
                  className={
                    StyledServiceDetails.textDetails +
                    ' text-[1.6rem] font-[400] leading-[2.2rem] break-words '
                  }
                >
                  {serviceDetails?.participant?.legalName}
                </span>
              </div>
              <div className="flex-1 ">
                <Tooltip title="CertiFicate">
                  <div className=" pb-[1rem] ">
                    <Certificate />
                  </div>
                </Tooltip>
                <span
                  className={
                    StyledServiceDetails.textDetails +
                    ' text-[1.6rem] font-[400] leading-[2.2rem] break-words '
                  }
                >
                  {serviceDetails?.protectionRegime
                    ?.map((item) => ` ${item}`)
                    .toString()}
                </span>
              </div>
              <div className="flex-1 mb-[1.8rem] gap-[1rem]">
                <Tooltip title="Location">
                  <div className=" pb-[1rem] ">
                    <Location />
                  </div>
                </Tooltip>
                <div className={''}>
                  {/* <Tooltip
                    title={serviceDetails?.locations
                      ?.map((item) => ` ${item}`)
                      .toString()}
                  > */}
                  <span
                    className={
                      StyledServiceDetails.textDetails +
                      ' text-[1.6rem] font-[400] leading-[2.2rem] break-words '
                    }
                  >
                    {serviceDetails?.locations?.length
                      ? serviceDetails?.locations
                          ?.map((item) => ` ${item}`)
                          .toString()
                      : 'N/A'}
                  </span>
                  {/* </Tooltip> */}
                </div>
              </div>
            </div>
          </div>
        )}
        {!isLoading && (
          <div className="">
            <h3
              className={
                StyledServiceDetails.subtitle + ' pt-[4.5rem] pb-[0.9rem]'
              }
            >
              T&C URL
            </h3>
            <a
              className={
                StyledServiceDetails.textDetails +
                '  text-[1.6rem] font-[400] leading-[2.2rem] break-words mt-[1rem] underline'
              }
              href={serviceDetails?.tnCUrl}
              target="_blank"
              // className="mt-[1rem]"
            >
              {serviceDetails?.tnCUrl}
            </a>
          </div>
        )}
      </div>
      <div className="grow">
        {isLoading ? (
          <>
            <Skeleton variant="text" width={'30%'} className="pb-[2rem] " />
            <Skeleton
              variant="text"
              width={'100%'}
              height={'5rem'}
              className="pb-[2rem] "
            />
            <Skeleton variant="text" width={'30%'} className="pb-[2rem] " />
            <Skeleton
              variant="text"
              width={'100%'}
              height={'5rem'}
              className="pb-[2rem] "
            />
            <div className="pt-[4rem]">
              <Skeleton variant="text" width={'30%'} className="pb-[1.4rem] " />
              <Skeleton
                variant="text"
                width={'100%'}
                className="pb-[1.4rem] "
              />
              <Skeleton variant="text" width={'30%'} className="pb-[1.4rem] " />
              <Skeleton
                variant="text"
                width={'100%'}
                className="pb-[1.4rem] "
              />
              <Skeleton variant="text" width={'30%'} className="pb-[1.4rem] " />
              <Skeleton
                variant="text"
                width={'100%'}
                className="pb-[1.4rem] "
              />
              <Skeleton variant="text" width={'30%'} className="pb-[1.4rem] " />
              <Skeleton variant="text" width={'100%'} className="pb-[10rem] " />
            </div>
          </>
        ) : (
          <>
            <div className=" pb-[4rem] border-b-[1px] ">
              <h2 className={StyledServiceDetails.subtitle + ' pb-[0.9rem]'}>
                Depends on
              </h2>
              <RenderLink linkArray={serviceDetails?.resources ?? []} />
              <h2
                className={
                  StyledServiceDetails.subtitle + '  pt-[4.5rem] pb-[0.9rem] '
                }
              >
                Aggregation of
              </h2>
              <RenderLink linkArray={serviceDetails?.dependedServices ?? []} />
            </div>
            <div className="">
              <h2 className={StyledServiceDetails.subtitle + ' pt-[2.4rem]'}>
                Trust score
              </h2>
              <p className=" pt-[0.9rem] text-[1.8rem] font-[400] leading-[2.2rem] ">
                {serviceDetails?.trustIndex
                  ? serviceDetails?.trustIndex
                  : 'N/A'}
              </p>
              <h2 className={StyledServiceDetails.subtitle + ' pt-[2.4rem]'}>
                Request type
              </h2>
              <p className="pt-[0.9rem] text-[1.8rem] font-[400] leading-[2.2rem]">
                {serviceDetails?.dataAccountExport?.requestType ?? 'N/A'}
              </p>
              <h2 className={StyledServiceDetails.subtitle + ' pt-[2.4rem]'}>
                Access type
              </h2>
              <p className="pt-[0.9rem] text-[1.8rem] font-[400] leading-[2.2rem]">
                {serviceDetails?.dataAccountExport?.accessType ?? 'N/A'}
              </p>
              <h2 className={StyledServiceDetails.subtitle + ' pt-[2.4rem]'}>
                Format type
              </h2>
              <p className="pt-[0.9rem] text-[1.8rem] font-[400] leading-[2.2rem]">
                {serviceDetails?.dataAccountExport?.formatType
                  ?.map((item) => ` ${item}`)
                  .toString() ?? 'N/A'}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ServiceOfferingDetails
