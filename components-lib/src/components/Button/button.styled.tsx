import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'

const StyledButtonComp = styled(Button)`
  &.MuiButton-root {
    border-radius: 0.8rem;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4rem;
    text-transform: inherit;
    padding: 1.4rem 5.6rem;
    line-height: initial;
    cursor: pointer;

    &.MuiButton-sizeMedium {
      padding: 1rem 5.6rem;
    }

    &.MuiButton-sizeSmall {
      padding: 0.8rem 5.6rem;
    }

    &.MuiButton {
      &-containedPrimary {
        border: 1px solid ${({ theme }) => theme.palette.primary.mediumGreen};
        background: ${({ theme }) => theme.palette.primary.mediumGreen};
        color: ${({ theme }) => theme.palette.primary.contrastText};
      }
      &-outlinedPrimary {
        border: 1px solid ${({ theme }) => theme.palette.primary.mediumGreen};
        color: ${({ theme }) => theme.palette.primary.mediumGreen};
      }
    }
    &.Mui-disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`

export { StyledButtonComp }
export type { ButtonProps }
