import TextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const StyledSearchInput = styled(TextField)`
  .MuiInputBase-root {
    border-radius: 29px;
    background-color: ${({ theme }) => theme.palette.background.default};
    border: 1px solid ${({ theme }) => theme.palette.secondary.gray1};

    :hover {
      border: 1px solid ${({ theme }) => theme.palette.secondary.gray1};
      .MuiOutlinedInput-notchedOutline {
        border: 0px solid ${({ theme }) => theme.palette.secondary.gray1};
      }
    }

    &.Mui-focused {
      .MuiOutlinedInput-notchedOutline {
        border: 0px solid ${({ theme }) => theme.palette.secondary.gray1};
      }
    }

    .MuiOutlinedInput-notchedOutline {
      border: 0px solid ${({ theme }) => theme.palette.secondary.gray1};
    }

    .MuiInputBase-input {
      margin-left: 1.2rem;
      font-size: 1.8rem;
      font-weight: 500;
      padding-block: 0.75rem;
    }
  }
`

export { StyledSearchInput }
export type { TextFieldProps }
