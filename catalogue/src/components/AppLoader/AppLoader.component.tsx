import { ProgressBar } from '@gaia-x-frontend/components-lib'

interface AppLoaderProps {
  type?: 'circular' | 'linear'
}

const AppLoader = ({ type = 'circular' }: AppLoaderProps) => {
  return (
    <div>
      {type === 'circular' ? (
        <div className={' flex w-[100%] h-[100vh] justify-center items-center'}>
          <ProgressBar type={type} />
        </div>
      ) : (
        <div className={'absolute w-[100%] z-[9]'}>
          <ProgressBar type={type} />
        </div>
      )}
    </div>
  )
}

export { AppLoader }
