import { Link } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { StyledBreadcrumbs } from './BreadCrumb.styled'
export type BreadcrumbItem = {
  link: string
  key: string
  name: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  onItemClick: (selectedItem: BreadcrumbItem) => void
}

export const BreadCrumb = ({ items, onItemClick }: BreadcrumbProps) => {
  return (
    <StyledBreadcrumbs separator={<NavigateNextIcon fontSize="large" />}>
      {items.map((objItem: BreadcrumbItem, index) => {
        const isLastElement = items.length - 1 === index
        if (isLastElement) {
          return (
            <div key={objItem.key} className="activeNavigation">
              <div className="activeNavigation">{objItem.name}</div>
            </div>
          )
        } else {
          return (
            <Link
              underline="hover"
              className="previousNavigation"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onItemClick(objItem)
              }}
              key={objItem.key}
            >
              {objItem.name}
            </Link>
          )
        }
      })}
    </StyledBreadcrumbs>
  )
}
