import { Link } from 'react-router-dom'
import { CopyIcon } from '@gaia-x-frontend/components-lib'
import { RenderStar } from '@wizard/components'
import { ServiceOffering } from '@wizard/models/service-management.model'
import { handleCopy } from '@wizard/utils/helpers'

export const renderServiceName = ({
  renderedCellValue,
  row,
}: {
  renderedCellValue: React.ReactNode
  row: { original: ServiceOffering }
}) => (
  <Link
    to={row?.original?.id}
    className="hover:underline capitalize font-[600]"
    style={{ color: 'inherit' }}
  >
    {renderedCellValue}
  </Link>
)

export const renderLabelLevel = ({
  renderedCellValue,
  row,
}: {
  renderedCellValue: React.ReactNode
  row: { original: ServiceOffering }
}) => (
  <div className="flex items-center gap-[1.2rem]">
    <RenderStar level={row?.original?.labelLevel} />
    {renderedCellValue}
  </div>
)

export const renderSelfDescription = ({
  renderedCellValue,
  row,
}: {
  renderedCellValue: React.ReactNode
  row: { original: ServiceOffering }
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'spaceBetween',
      maxWidth: '42rem',
    }}
  >
    <span
      style={{
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textDecoration: 'underline',
        maxWidth: '38rem',
        cursor: 'pointer',
      }}
    >
      <Link
        to={row?.original?.credential?.vcUrl}
        rel="noopener"
        target="_blank"
        style={{ color: 'inherit' }}
      >
        {renderedCellValue}
      </Link>
    </span>
    <button
      className="pl-[1rem] cursor-pointer"
      type="button"
      onClick={() => handleCopy(row?.original?.credential?.vcUrl)}
    >
      <CopyIcon />
    </button>
  </div>
)
