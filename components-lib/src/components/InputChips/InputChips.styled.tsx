import { styled } from '@mui/material/styles'
import { MuiChipsInput, MuiChipsInputProps } from 'mui-chips-input'

const StyledMuiChipsInput = styled(MuiChipsInput)`
  &.MuiFormControl-root {
    .MuiFormLabel-root {
      color: ${({ theme }) => theme.palette.secondary.gray1};
      font-size: 1.8rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      top: 0.5rem;

      &.MuiInputLabel-shrink {
        color: ${({ theme }) => theme.palette.secondary.gray1};
      }

      &.Mui-focused {
        &.MuiInputLabel-shrink {
          color: ${({ theme }) => theme.palette.primary.purple};
          font-size: 1.8rem;
          top: 0.5rem;
        }
      }
    }
    .MuiInputBase-root {
      padding-top: 5px;
      padding-right: 0px;
      padding-bottom: 5px;
      padding-left: 0;

      input {
        font-size: 1.6rem;
      }

      .MuiChip-root {
        border-radius: 0.4rem;
        background: ${({ theme }) => theme.palette.secondary.gray4};
        max-width: 9rem;

        .MuiChip-label {
          color: ${({ theme }) => theme.palette.secondary.gray1};
          font-size: 1.4rem;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }

    .MuiInputBase-root.MuiInput-root:hover:not(
        .Mui-disabled,
        .Mui-error
      ):before,
    .Mui-focused:after {
      border-bottom: 2px solid ${({ theme }) => theme.palette.primary.purple};
    }

    .MuiFormHelperText-root {
      font-size: 1.4rem;
    }
  }
`

export { StyledMuiChipsInput }
export type { MuiChipsInputProps }
