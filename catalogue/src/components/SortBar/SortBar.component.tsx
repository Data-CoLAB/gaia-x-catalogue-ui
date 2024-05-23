import { DropDown, SelectChangeEvent } from '@gaia-x-frontend/components-lib'
import SortBarStyle from './SortBar.module.scss'
import { SORT_DROP_DOWN_OPTIONS } from '@catalogue/utility/constant'

type SortBarProps = {
  totalRecords?: number
  onSortChange: (sortOrder: number) => void
}
const SortBar = ({ totalRecords, onSortChange }: SortBarProps) => {
  return (
    <div className={' flex justify-between px-[1.6rem] py-[1.3rem] w-[100%]'}>
      <div
        className={SortBarStyle.sortBar__Title + ' text-[1.6rem] font-[600]'}
      >
        Services
        {totalRecords ? (
          <span
            className={
              SortBarStyle.sortBar__SubTitle + ' text-[1.6rem] font-[600]'
            }
          >
            {' '}
            ({totalRecords})
          </span>
        ) : null}
      </div>
      <div
        className={
          SortBarStyle.sortBar__SubTitle +
          ' flex flex-row text-[1.6rem] font-[600]'
        }
      >
        <div className="flex items-center ml-[1.6rem]">
          <DropDown
            items={SORT_DROP_DOWN_OPTIONS}
            onChange={(e: SelectChangeEvent<unknown>) => {
              onSortChange(e.target.value as number)
            }}
            defaultValue={0}
          />
        </div>
      </div>
    </div>
  )
}
export { SortBar }
