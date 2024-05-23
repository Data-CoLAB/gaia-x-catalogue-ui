import { Checkbox, TextField } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { StyledAutoComplete, StyledText } from './SearchSelect.styled'

export type AutoCompleteOptionType = {
  label: string
  id: string
}

type AutoCompleteProps = {
  loading: boolean
  options: AutoCompleteOptionType[]
  placeholder: string
  label?: string
  multiple?: boolean
  value?: string
  onChange?: (
    newValue: unknown | string | { label?: string | undefined }
  ) => void
  onBlur?: (newValue: unknown | string | { label?: string | undefined }) => void
  onOpen?: (event: any) => void
  onClose?: (event: any) => void
  popupIcon?: React.ReactNode
  clearIcon?: React.ReactNode
  disableCheckBox?: boolean
  error?: boolean
  helperText?: string
}
const SearchSelect = ({ disableCheckBox, ...props }: AutoCompleteProps) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="large" color="primary" />
  const checkedIcon = <CheckBoxIcon fontSize="large" color="primary" />

  return (
    <StyledAutoComplete
      disablePortal={true}
      multiple={props.multiple ? props.multiple : false}
      options={props.options}
      getOptionLabel={(option) => (option as { label: string }).label}
      isOptionEqualToValue={(option, value) => {
        return (option as { id: string }).id === (value as { id: string }).id
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={props.label}
          placeholder={props.placeholder}
          error={props.error}
          helperText={props.helperText}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <>
          <li {...props}>
            {!disableCheckBox ? (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 3 }}
                checked={selected}
              />
            ) : null}
            <StyledText>
              {typeof option === 'string'
                ? option
                : (option as { label: string }).label}
            </StyledText>
          </li>
        </>
      )}
      filterSelectedOptions={disableCheckBox || false}
      disableCloseOnSelect={!disableCheckBox && true}
      value={props.value}
      autoHighlight
      onChange={(event, newValue) => {
        event.stopPropagation()
        if (props.onChange) props.onChange(newValue)
      }}
      onBlur={props.onBlur}
      onOpen={props.onOpen}
      onClose={props.onClose}
      popupIcon={props.popupIcon}
      clearIcon={props.clearIcon}
      loading={props.loading}
    />
  )
}

export { SearchSelect }
