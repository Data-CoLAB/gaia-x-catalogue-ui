import { styled } from '@mui/material/styles'
import Select, { SelectProps } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import { FormHelperText, InputLabel, Typography } from '@mui/material'

const StyledFormControl = styled(FormControl)`
  margin-bottom: 1rem;
  width: 100%;

  .MuiInputBase-root {
    font-size: 1.8rem;
    font-weight: 500;

    ::after {
      border-bottom: 2px solid ${({ theme }) => theme.palette.primary.purple};
    }

    ::before {
      border-color: ${({ theme }) => theme.palette.secondary.gray1};
    }

    :hover {
      &:not(.Mui-disabled, .Mui-error):before {
        border-color: ${({ theme }) => theme.palette.primary.purple};
        border-width: 1px;
      }
    }

    &:hover:not(.Mui-disabled, .Mui-error)::before {
      border-color: ${({ theme }) => theme.palette.primary.contrastText};
      border-width: 1px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.87);
    }
  }

  .MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before {
    border-bottom: 2px solid ${({ theme }) => theme.palette.primary.purple};
  }
`

const StyledSelect = styled(Select)`
  & .MuiSelect-select {
    color: ${({ theme }) => theme.palette.secondary.black};
    font-size: 1.7rem;
    line-height: normal;
    font-weight: 400;
    font-family: 'Titillium Web';
    &:focus {
      background-color: transparent;
    }
  }
`

const StyledMenuItem = styled(MenuItem)`
  :hover {
    background-color: transparent;
  }

  &.MuiButtonBase-root {
    font-weight: 500;
    font-size: 1.6rem;
  }

  &.Mui-selected {
    background-color: inherit;
    color: ${({ theme }) => theme.palette.text.secondary};

    :hover {
      background-color: inherit;
    }
  }
`

const StyledInputLabel = styled(InputLabel)`
  font-size: 1.8rem;
  font-weight: 500;

  &.Mui-error {
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  &.Mui-focused {
    color: ${({ theme }) => theme.palette.primary.purple};
  }
`

const StyledHelperText = styled(FormHelperText)`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.palette.text.secondary};

  .Mui-error {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

const StyledPlaceHolderMenuItem = styled(MenuItem)`
  background-color: transparent;
  text-transform: capitalize;

  &.Mui-selected {
    background-color: transparent;
  }
`

const StyledPlaceholderTypography = styled(Typography)`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.secondary.black};
`

export {
  StyledFormControl,
  StyledSelect,
  StyledMenuItem,
  StyledInputLabel,
  StyledHelperText,
  StyledPlaceHolderMenuItem,
  StyledPlaceholderTypography,
}

export type { SelectProps }
