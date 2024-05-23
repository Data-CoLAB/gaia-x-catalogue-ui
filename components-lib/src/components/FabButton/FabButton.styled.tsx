import { styled } from '@mui/material/styles'
import Fab, { FabProps } from '@mui/material/Fab'

const StyledFabButtonComp = styled(Fab)`
  &.MuiButtonBase-root {
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 2.4rem;
    cursor: pointer;

    &.MuiFab-primary {
      background-color: ${({ theme }) => theme.palette.primary.mediumGreen};
    }

    &.MuiFab-secondary {
      border: 2px solid ${({ theme }) => theme.palette.primary.mediumGreen};
      background-color: ${({ theme }) => theme.palette.primary.contrastText};
    }

    &.Mui-disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`

export { StyledFabButtonComp }
export type { FabProps }
