import { styled } from '@mui/material/styles'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
  DateTimePicker,
  DateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker'

const LocalizationProviderStyled = styled(LocalizationProvider)``

const DemoContainerStyled = styled(DemoContainer)`` as typeof DemoContainer

const DatePickerStyled = styled(DateTimePicker)`
  &.MuiFormControl-root {
    min-height: 7.8rem;

    &.MuiTextField-root {
      min-width: calc(100% - 1.2rem);
    }

    .MuiFormLabel-root {
      color: ${({ theme }) => theme.palette.secondary.gray1};
      font-size: 1.8rem;
      font-weight: 400;
      line-height: normal;
      top: -3px;

      &.Mui-focused {
        color: ${({ theme }) => theme.palette.primary.purple};
      }
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

export { LocalizationProviderStyled, DemoContainerStyled, DatePickerStyled }
export type { DateTimePickerProps }
