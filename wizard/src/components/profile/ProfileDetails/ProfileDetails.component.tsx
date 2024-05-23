import { Skeleton } from '@gaia-x-frontend/components-lib'
import ProfileDetailsStyled from './ProfileDetails.module.scss'
import { ParticipantProfileResponse } from '@wizard/api/profile.api'

const ProfileDetails = ({
  response,
  isLoading,
}: {
  response: ParticipantProfileResponse | undefined
  isLoading: boolean
}) => {
  return (
    <div className={ProfileDetailsStyled.MainContainer + ' mt-[1rem]'}>
      <div
        className={
          ProfileDetailsStyled.ProfileDetailSection +
          ' rounded-[1.25rem] bg-white pt-[1.88rem] pb-[1.88rem] pl-[3.13rem] pr-[3.13rem]'
        }
      >
        <h2 className={`text-[1.6rem] font-[600] text-[#000094]`}>
          Profile Details
        </h2>

        <div className={ProfileDetailsStyled.ProfileDetails + ' mt-[2rem]'}>
          <div className="flex mb-[1.5rem]">
            <label className="w-[20rem] inline-block">
              Head Quarter Address :
            </label>
            <span className="w-[calc(100%-20rem)] inline-block">
              {isLoading ? (
                <Skeleton width={'100%'} className="p-[0.5rem]" />
              ) : (
                response?.headquarterAddress || '-'
              )}
            </span>
          </div>

          <div className="flex mb-[1.5rem]">
            <label className="w-[20rem] inline-block">Legal Address :</label>
            <span className="w-[calc(100%-20rem)] inline-block">
              {isLoading ? (
                <Skeleton width={'100%'} className="p-[0.5rem]" />
              ) : (
                response?.legalAddress || '-'
              )}
            </span>
          </div>

          <div className="flex mb-[1.5rem]">
            <label className="w-[20rem] inline-block">
              Registration Type/Number :
            </label>
            <span className="w-[calc(100%-20rem)] inline-block">
              {isLoading ? (
                <Skeleton width={'100%'} className="p-[0.5rem]" />
              ) : (
                <div>
                  {response?.legalRegistrationNumber['gx:vatID']
                    ? 'VAT ID -' + response?.legalRegistrationNumber['gx:vatID']
                    : ''}
                </div>
              )}

              {isLoading ? (
                <Skeleton width={'100%'} className="p-[0.5rem]" />
              ) : (
                <div>
                  {response?.legalRegistrationNumber['gx:EORI']
                    ? 'EORI -' + response?.legalRegistrationNumber['gx:EORI']
                    : ''}
                </div>
              )}

              {isLoading ? (
                <Skeleton width={'100%'} className="p-[0.5rem]" />
              ) : (
                <div>
                  {response?.legalRegistrationNumber['gx:leiCode']
                    ? 'LEI CODE -' +
                      response?.legalRegistrationNumber['gx:leiCode']
                    : ''}
                </div>
              )}
            </span>
          </div>

          <div className="flex mb-[1.5rem]">
            <label className="w-[20rem] inline-block">Email :</label>
            <span className="w-[calc(100%-20rem)] inline-block">
              {isLoading ? (
                <Skeleton width={'100%'} className="p-[0.5rem]" />
              ) : (
                response?.email || '-'
              )}
            </span>
          </div>

          <div className="flex mb-[1.5rem]">
            <label className="w-[20rem] inline-block">Type of entity :</label>
            <span className="w-[calc(100%-20rem)] inline-block">
              {isLoading ? (
                <Skeleton width={'100%'} className="p-[0.5rem]" />
              ) : (
                response?.entityType?.type || '-'
              )}
            </span>
          </div>

          <div className="flex mb-[1.5rem]">
            <label className="w-[20rem] inline-block">
              Parent Organization :
            </label>
            <span className="w-[calc(100%-20rem)] inline-block">
              {isLoading ? (
                <>
                  <Skeleton width={'100%'} className="p-[0.5rem]" />
                  <Skeleton width={'100%'} className="p-[0.5rem]" />
                </>
              ) : response?.parentOrganization &&
                response?.parentOrganization.length > 0 ? (
                response?.parentOrganization.map((item, index) => (
                  <div key={index}>
                    <a
                      href={item}
                      target="_blank"
                      className="bg-[#ECECEC] text-[#565655] hover:text-[#000094] inline-block mb-[0.4rem] pt-[0.1rem] pb-[0.3rem] pl-[0.7rem] pr-[0.7rem] rounded-[0.8rem]"
                    >
                      {item}
                    </a>
                    <br />
                  </div>
                ))
              ) : (
                '-'
              )}
            </span>
          </div>

          <div className="flex mb-[1.5rem]">
            <label className="w-[20rem] inline-block">Sub Organization :</label>
            <span className="w-[calc(100%-20rem)] inline-block">
              {isLoading ? (
                <>
                  <Skeleton width={'100%'} className="p-[0.5rem]" />
                  <Skeleton width={'100%'} className="p-[0.5rem]" />
                </>
              ) : response?.subOrganization &&
                response?.subOrganization.length > 0 ? (
                response?.subOrganization.map((item, index) => (
                  <div key={index}>
                    <a
                      href={item}
                      target="_blank"
                      className="bg-[#ECECEC] text-[#565655] hover:text-[#000094] inline-block mb-[0.4rem] pt-[0.1rem] pb-[0.3rem] pl-[0.7rem] pr-[0.7rem] rounded-[0.8rem]"
                    >
                      {item}
                    </a>
                    <br />
                  </div>
                ))
              ) : (
                '-'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProfileDetails }
