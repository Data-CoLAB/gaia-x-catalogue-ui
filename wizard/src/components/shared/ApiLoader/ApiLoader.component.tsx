import { ProgressBar } from '@gaia-x-frontend/components-lib'

interface ApiLoaderProps {
  type?: 'circular' | 'linear'
}

const ApiLoader = ({ type = 'linear' }: ApiLoaderProps) => {
  return (
    <div className={' apiLoader hidden'}>
      <div className={'absolute z-[9] w-[100%]'}>
        <ProgressBar type={type} />
      </div>
    </div>
  )
}

export { ApiLoader }
