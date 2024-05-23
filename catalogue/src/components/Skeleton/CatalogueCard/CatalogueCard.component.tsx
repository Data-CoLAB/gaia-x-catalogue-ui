import { Skeleton } from '@gaia-x-frontend/components-lib'
import CatalogueCardStyle from './CatalogueCard.module.scss'
const CatalogueList = () => {
  const CatalogueCard = () => {
    return (
      <div
        className={
          CatalogueCardStyle.card +
          ' rounded-[1rem] w-[100%] h-[11rem] flex items-center place-content-around mb-[0.8rem] '
        }
      >
        <Skeleton width={`27.1rem`} height={`6.9rem`} variant="rounded" />
        <div>
          <Skeleton
            width={`25.3rem`}
            height={`3rem`}
            variant="rounded"
            className="mb-[0.8rem]"
          />
          <Skeleton width={`25.3rem`} height={`3.8rem`} variant="rounded" />
        </div>
        <Skeleton width={`13.4rem`} height={`3rem`} variant="rounded" />
        <Skeleton width={`13.4rem`} height={`3rem`} variant="rounded" />
      </div>
    )
  }
  return (
    <div className="overflow-y-hidden">
      <CatalogueCard />
      <CatalogueCard />
      <CatalogueCard />
      <CatalogueCard />
      <CatalogueCard />
      <CatalogueCard />
    </div>
  )
}

export { CatalogueList }
