import { CopyIcon } from '@gaia-x-frontend/components-lib'
import { handleCopy } from '@wizard/utils/helpers'
import ServiceCreationStyled from './PostCreationConfirmationBody.module.scss'

const PostCreationConfirmationBody = ({
  url,
  title = 'Service Offering JSON',
  msg = 'Save this VC for your personal information. For your convenience, we also store this detail in the Platform',
}: {
  url: string
  title?: string
  msg?: string
}) => {
  return (
    <>
      <div className="mb-[3rem] ">
        <div className="pt-[5rem] flex justify-between">
          <h3
            className={ServiceCreationStyled.dialogSubtitle + ' text-[2.2rem]'}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={() => handleCopy(url)}
            style={{ cursor: 'pointer' }}
          >
            <CopyIcon />
          </button>
        </div>
        <p className=" text-[1.8rem] pt-[1.6rem]  w-[100%] border-b-[1px]">
          {url ?? null}
        </p>
      </div>
      <p className=" mb-[3rem]  text-[2.2rem]">{msg}</p>
    </>
  )
}
export { PostCreationConfirmationBody }
