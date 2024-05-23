import { useEffect, useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {
  ProfileImageContainerStyled,
  ProfileImageTitleStyled,
} from './ProfileImage.styled'
import { Tooltip } from '../Tooltip'

interface ProfileImagePros {
  url?: string | undefined
  size: number
  onDeleteImage: () => void
  onUploadImage: (param: File) => void
}

const ProfileImage = ({
  url,
  size = 1000000,
  onUploadImage,
  onDeleteImage,
}: ProfileImagePros) => {
  const [profileImage, setProfileImage] = useState<string | undefined>('')

  useEffect(() => {
    setProfileImage(url)
  }, [url])

  const onChangeImage = (event: any) => {
    const file = event.target.files[0]
    if (file.size <= size) {
      var reader = new FileReader()
      reader.onload = function () {
        const imgBase64 = reader.result
        setProfileImage(imgBase64 as string | undefined)
      }
      reader.readAsDataURL(file)
      onUploadImage(file)
    } else {
      onUploadImage(file)
    }
  }

  const onBrawoseImage = () => {
    document.getElementById('fileUploaderInput')?.click()
  }

  return (
    <ProfileImageContainerStyled>
      <ProfileImageTitleStyled>
        {profileImage ? (
          <>
            <div className="placeholder-icon">
              <img src={profileImage} alt="" />
            </div>

            <div className="action-button">
              <Tooltip title={'Delete'}>
                <button onClick={onDeleteImage}>
                  <DeleteOutlineOutlinedIcon />
                </button>
              </Tooltip>

              <Tooltip title={'Update'}>
                <button onClick={onBrawoseImage}>
                  <EditOutlinedIcon />
                </button>
              </Tooltip>
            </div>
          </>
        ) : (
          <>
            <div className="placeholder-icon">
              <AddPhotoAlternateOutlinedIcon />
            </div>
            <div className="action-button">
              <Tooltip title={'Add'}>
                <button onClick={onBrawoseImage}>
                  <AddOutlinedIcon /> Add image
                </button>
              </Tooltip>
            </div>
          </>
        )}
        <input
          type="file"
          hidden
          id="fileUploaderInput"
          onChange={onChangeImage}
        />
      </ProfileImageTitleStyled>
    </ProfileImageContainerStyled>
  )
}

export { ProfileImage }
export type { ProfileImagePros }
