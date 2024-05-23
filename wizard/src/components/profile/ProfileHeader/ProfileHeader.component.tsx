import { useEffect, useState } from 'react'
import ProfileHeaderStyled from './ProfileHeader.module.scss'
import { FILE_SIZE_1MB } from '@wizard/utils/constants'
import { getAlert } from '@wizard/hooks/useAlert.hooks'
import {
  DialogCustom,
  DownloadIcon,
  ProfileImage,
  Skeleton,
  ViewIcon,
} from '@gaia-x-frontend/components-lib'
import {
  ParticipantProfileResponse,
  deleteProfileImage,
  participantProfileJSON,
  uploadProfileImage,
} from '@wizard/api/profile.api'

const ProfileHeader = ({
  response,
  participantId,
  isLoading,
}: {
  response: ParticipantProfileResponse | undefined
  participantId: string | undefined
  isLoading: boolean
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)

  useEffect(() => {
    setImageUrl(response?.profileImage)
  }, [response])

  const deleteImageHandler = () => {
    if (participantId) {
      deleteProfileImage(participantId)
        .then(() => {
          setImageUrl('')
          setOpenConfirmation(false)
        })
        .catch((err) => {
          getAlert('error', err.message)
        })
        .finally(() => {
          // setIsLoading(false)
        })
    }
  }

  const uploadImageHandler = (event: File) => {
    var formData = new FormData()
    formData.append('file', event)
    const size = event.size <= FILE_SIZE_1MB
    if (participantId && size) {
      uploadProfileImage(participantId, formData)
        .then((res) => {
          setImageUrl(res.payload.imageUrl)
        })
        .catch((err) => {
          getAlert('error', err.message)
        })
        .finally(() => {
          // setIsLoading(false)
        })
    } else {
      getAlert('error', 'File size should be less than or equal to 1 MB')
    }
  }

  const onActionHandler = (type: string) => {
    if (type === 'view') {
      window.open(response?.credential.vcUrl, '_blank')
    } else {
      if (response?.credential.vcUrl) {
        const data = response?.credential.vcUrl.split('.com/')
        participantProfileJSON(data[1])
          .then((res) => {
            saveFile(JSON.stringify(res), 'text/json', 'participant.json')
          })
          .catch(() => {})
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
    <>
      <div className="flex gap-[1rem]">
        <div className="w-[10.3rem]">
          <ProfileImage
            url={imageUrl}
            size={1000000}
            onDeleteImage={() => setOpenConfirmation(true)}
            onUploadImage={uploadImageHandler}
          />
        </div>

        <div
          className={
            ProfileHeaderStyled.ProfileDetails +
            ' rounded-[1.25rem] bg-white p-[2rem] w-[calc(100%-10.3rem)] flex justify-between'
          }
        >
          {isLoading ? (
            <Skeleton width={'100%'} />
          ) : (
            <>
              <div>
                <h2 className={`text-[2rem] font-[600] text-[#000094]`}>
                  {response?.legalName}
                </h2>
                <p
                  className={`mt-[1rem] text-[1.6rem] font-[600] text-[#565655]`}
                >
                  {response?.shortName}
                </p>
              </div>

              <div className="w-[200px] flex flex-col items-end">
                <h2 className={`text-[1.6rem] font-[600] text-[#000094]`}>
                  Legal Participant Credential
                </h2>
                <div className="flex gap-[2rem] mt-[2rem]">
                  <button
                    onClick={() => onActionHandler('download')}
                    className="text-[#565655]"
                  >
                    <DownloadIcon /> Download
                  </button>
                  <button
                    onClick={() => onActionHandler('view')}
                    className="text-[#565655]"
                  >
                    <ViewIcon /> View
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <DialogCustom
        open={openConfirmation}
        title="Delete image"
        children={
          <h1 className="text-[2rem] h-[10rem] flex justify-center items-center">
            Are you sure you want to delete the image?
          </h1>
        }
        onClose={() => setOpenConfirmation(false)}
        onSubmit={deleteImageHandler}
        submitText="Delete"
        isConfirmation={true}
      />
    </>
  )
}

export { ProfileHeader }
