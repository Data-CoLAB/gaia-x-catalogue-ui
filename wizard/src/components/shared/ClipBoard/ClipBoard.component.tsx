/* eslint-disable @typescript-eslint/no-misused-promises */
import { ContentCopyIcon } from '@gaia-x-frontend/components-lib'
import { getAlert } from '@wizard/hooks/useAlert.hooks'
import ClipBoardStyle from './ClipBoard.module.scss'
interface ClipBoardProps {
  heading: string
  text: string
}
const ClipBoard = ({ heading, text }: ClipBoardProps) => {
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text)
      getAlert('success', `${heading} copied`)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
  return (
    <div className={ClipBoardStyle.board + ' mt-[3rem]'}>
      <div
        className={
          ClipBoardStyle.board__Heading +
          ' flex place-content-between mb-[1.6rem] '
        }
      >
        <p
          className={
            ClipBoardStyle.board__Heading__Text + ' text-[2.2rem] font-[600]'
          }
        >
          {heading}
        </p>
        <div onClick={copyContent}>
          <ContentCopyIcon fontSize="large" className="hover:cursor-pointer" />
        </div>
      </div>
      <p
        className={
          ClipBoardStyle.board__Content +
          ' break-words overflow-x-auto pb-[0.9rem] text-[1.8rem] font-[400]'
        }
      >
        {text}
      </p>
    </div>
  )
}

export { ClipBoard }
