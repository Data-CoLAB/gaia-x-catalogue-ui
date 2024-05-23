import { Skeleton } from '@gaia-x-frontend/components-lib'

const Search = () => {
  return (
    <div
      className={
        ' flex  flex-col justify-between px-[1.6rem] py-[1.3rem] w-[100%] gap-[3rem]'
      }
    >
      <div>
        <Skeleton height={`3rem`} width={`25.4rem`} variant="rounded" />
      </div>
      <div>
        <Skeleton height={`17rem`} width={`100%`} variant="rounded"></Skeleton>
      </div>
      <div className="flex justify-center gap-[2rem]">
        <Skeleton height={`4rem`} width={`7%`} variant="rounded"></Skeleton>
        <Skeleton height={`4rem`} width={`7%`} variant="rounded"></Skeleton>
      </div>
    </div>
  )
}

export { Search }
