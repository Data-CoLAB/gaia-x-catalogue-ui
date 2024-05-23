import { Autocomplete, Typography as Text } from '@mui/material'
import { styled } from '@mui/material/styles'
export const StyledAutoComplete = styled(Autocomplete)`
  * {
    font-size: 1.6rem;
  }

  .MuiFormControl-root {
    .MuiFormLabel-root {
      top: -0.5rem;

      &.MuiInputLabel-standard {
        font-size: 1.8rem;
      }

      &.Mui-focused {
        color: ${({ theme }) => theme.palette.primary.purple};
      }
    }

    .MuiInputBase-root {
      &.Mui-focused {
        &::after {
          border-bottom: 2px solid
            ${({ theme }) => theme.palette.primary.purple};
        }
      }
    }
  }

  && {
    .MuiAutocomplete-inputRoot {
      font-size: 1.6rem;
      border-radius: 1rem;
      margin: 2px 0 0 0;
      padding: 0px 6.5rem 0 0rem;

      input {
        padding: 1.2rem 1.3rem 0.7rem 0rem;
      }

      .MuiAutocomplete-endAdornment {
        right: 1rem;
        top: calc(50% - 7px);
      }
    }
    .MuiAutocomplete-listbox {
      font-size: 1.6rem;
    }
    .MuiChip-root,
    .MuiSvgIcon-root {
    }

    .MuiChip-label {
    }
    &:hover {
      .MuiOutlinedInput-notchedOutline {
      }
    }
  }

  .MuiFormHelperText-root {
    span {
      font-size: 1.4rem;
    }
  }
`
export const StyledText = styled(Text)`
  font-size: 1.6rem;
  width: 100%;
`
