import { ProgressBar } from '@gaia-x-frontend/components-lib'

interface ApiLoaderProps {
  type?: 'circular' | 'linear'
}

const ApiLoader = ({ type = 'linear' }: ApiLoaderProps) => {
  return (
    <div className={'apiLoader hidden'}>
      <div className={'absolute w-[100%] z-[9]'}>
        <ProgressBar type={type} />
      </div>
    </div>
  )
}

export { ApiLoader }
