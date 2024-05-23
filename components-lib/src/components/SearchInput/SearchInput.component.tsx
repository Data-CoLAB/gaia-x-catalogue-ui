import { Button } from '../Button'
import { StyledSearchInput, TextFieldProps } from './SearchInput.styled'

interface CustomSearchTextFieldProp {
  onClearClick: () => void
}

const SearchInput = (props: TextFieldProps & CustomSearchTextFieldProp) => {
  return (
    <StyledSearchInput
      variant="outlined"
      margin="dense"
      size="small"
      InputProps={{
        startAdornment: 'Search Icon',
        ...((props?.value as string).length > 0 && {
          endAdornment: (
            <Button size="small" onClick={props.onClearClick}>
              Clear icon
            </Button>
          ),
        }),
      }}
      {...props}
    />
  )
}

export { SearchInput }
