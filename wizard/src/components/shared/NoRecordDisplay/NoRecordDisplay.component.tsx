import { useNavigate } from 'react-router-dom'
import { Button, FabButton } from '@gaia-x-frontend/components-lib'
import NoRecordStyled from './NoRecordDisplay.module.scss'

interface NoRecordDisplayProps {
  title: string
  isError: boolean
  onRetry?: () => void
  content: string
  link: string
}

const NoRecordDisplay = ({
  title,
  isError,
  onRetry,
  content,
  link,
}: NoRecordDisplayProps) => {
  const navigation = useNavigate()

  return (
    <div
      className={
        NoRecordStyled.MainContainer +
        ' flex flex-col h-[calc(100vh-40rem)] justify-center text-center'
      }
    >
      <h4 className="text-[2rem] font-[600]">{title}</h4>
      <p className="text-[2rem] font-[600]">{content}</p>

      <div className="mt-[4.5rem]">
        {isError ? (
          <Button variant="contained" onClick={onRetry}>
            Retry
          </Button>
        ) : (
          <FabButton color={'primary'} onClick={() => navigation(link)} />
        )}
      </div>
    </div>
  )
}

export { NoRecordDisplay }
