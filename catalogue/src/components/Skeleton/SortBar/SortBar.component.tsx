import { Skeleton } from '@gaia-x-frontend/components-lib'

const SortBar = () => {
  return (
    <div className={' flex justify-between px-[1.6rem] py-[1.3rem] w-[100%]'}>
      <div>
        <Skeleton height={`3rem`} width={`25.4rem`} variant="rounded" />
      </div>
      <div className={'flex flex-row'}>
        <div>
          <Skeleton height={`3rem`} width={`25.4rem`} variant="rounded" />
        </div>
      </div>
    </div>
  )
}
export { SortBar }
