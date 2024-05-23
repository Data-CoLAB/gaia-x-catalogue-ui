import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'

const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: ${({ theme }) => theme.palette.secondary.gray1};
    background: ${({ theme }) => theme.palette.secondary.gray4};
  }
`

export { StyledBadge }

export type { BadgeProps }
