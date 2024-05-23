import TextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const StyledTextArea = styled(TextField)`
  &.MuiFormControl-root {
    min-height: 7.8rem;

    .MuiFormLabel-root {
      color: ${({ theme }) => theme.palette.secondary.gray1};
      font-size: 1.8rem;
      font-weight: 400;
      line-height: normal;
      top: -3px;
    }

    .MuiInputBase-input {
      color: ${({ theme }) => theme.palette.secondary.black};
      font-size: 1.8rem;
      line-height: normal;
    }

    .Mui-focused {
      color: ${({ theme }) => theme.palette.primary.purple};

      &::after {
        border-bottom: 2px solid ${({ theme }) => theme.palette.primary.purple};
      }
    }

    .MuiInputBase-root.MuiInput-root:hover:not(
        .Mui-disabled,
        .Mui-error
      ):before {
      border-bottom: 2px solid ${({ theme }) => theme.palette.primary.purple};
    }
  }

  .MuiFormHelperText-root {
    font-size: 1.4rem;
  }
`

export { StyledTextArea }
export type { TextFieldProps as TextAreaProps }
