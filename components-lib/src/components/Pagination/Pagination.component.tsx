import {
  StyledPagination,
  StyledPaginationComponentProps,
  StyledPaginationContainer,
  StyledPaginationAction,
} from './Pagination.styled'

interface CustomPaginationProp {
  ActionComponent?: React.ReactNode
}

const Pagination = <C extends React.ElementType>({
  ActionComponent,
  ...props
}: StyledPaginationComponentProps<C> & CustomPaginationProp) => {
  return (
    <StyledPaginationContainer>
      <StyledPagination {...props} />
      <StyledPaginationAction>{ActionComponent}</StyledPaginationAction>
    </StyledPaginationContainer>
  )
}

export { Pagination }
