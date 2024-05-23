import { Tooltip } from '../Tooltip'
import {
  StyledFormControl,
  StyledHelperText,
  StyledInputLabel,
  StyledMenuItem,
  StyledSelect,
  SelectProps,
  StyledPlaceHolderMenuItem,
} from './Select.styled'

interface ItemType {
  label: string
  value: string | number
}

type CustomSelectProps = SelectProps & {
  placeholder?: string
  items: ItemType[]
  helperText?: string
  tooltip?: string
}

const defaulRenderValue = (selectedValue: unknown, items: ItemType[]) => {
  const value = selectedValue as string | string[]

  // check and return placeholder
  // if (value.length === 0) {
  //   return (
  //     <StyledPlaceholderTypography>{placeholder}</StyledPlaceholderTypography>
  //   )
  // }

  // check and return label for selected value
  if (typeof value === 'string' || typeof value === 'number') {
    const selectedLabel = items.find((item) => item.value === value)
    return selectedLabel?.label
  }

  // check and return label for selected value if multiple true
  const selectedValues = items.filter((item) =>
    value.includes(item.value.toString())
  )
  return selectedValues.map(({ label }) => label).join(',')
}

const Select = (props: CustomSelectProps) => {
  const {
    items,
    placeholder,
    helperText,
    label = '',
    required = false,
    error = false,
    variant = 'standard',
    value,
    defaultValue = '',
    ...others
  } = props

  return (
    <Tooltip
      title={props?.tooltip}
      arrow={true}
      placement="top"
      disableInteractive
    >
      <StyledFormControl variant="standard" error={error}>
        <StyledInputLabel required={required}>{label}</StyledInputLabel>
        <StyledSelect
          variant={variant}
          displayEmpty
          defaultValue={defaultValue}
          value={value}
          label={label}
          renderValue={(selected) => defaulRenderValue(selected, items)}
          MenuProps={{
            PaperProps: {
              elevation: 3,
            },
          }}
          {...others}
        >
          {placeholder && (
            <StyledPlaceHolderMenuItem disabled value="">
              {placeholder}
            </StyledPlaceHolderMenuItem>
          )}

          {items.map(({ value, label }) => (
            <StyledMenuItem key={value} value={value}>
              {label}
            </StyledMenuItem>
          ))}
        </StyledSelect>
        {helperText && (
          <StyledHelperText error={error}>{helperText}</StyledHelperText>
        )}
      </StyledFormControl>
    </Tooltip>
  )
}

export { Select }
