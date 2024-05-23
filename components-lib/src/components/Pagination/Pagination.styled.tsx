import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import TablePagination, {
  TablePaginationProps,
} from '@mui/material/TablePagination'

type StyledPaginationComponentProps<C extends React.ElementType> =
  TablePaginationProps<C, { component?: C }>

const StyledPagination = styled(TablePagination)`
  justify-content: flex-start;
  flex-grow: 1;
`

const StyledPaginationContainer = styled(Box)`
  position: relative;
  z-index: 11;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.default};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0;

  .MuiToolbar-root {
    display: flex;
    align-items: baseline;
    gap: 2rem;
    padding-left: 0.8rem;
    min-height: 4rem;
  }

  .MuiTablePagination-spacer {
    display: none;
  }

  .MuiTablePagination-selectLabel,
  .MuiInputBase-root,
  .MuiTablePagination-displayedRows {
    color: ${({ theme }) => theme.palette.secondary.black};
    font-family: 'Titillium Web';
    font-size: 1.8rem;
    font-weight: 400;
    line-height: normal;
    margin: 0;
  }

  .MuiTablePagination-actions {
    margin-left: 0 !important;
    position: relative;
    top: -0.3rem;
  }

  .MuiSvgIcon-root {
    /* top: calc(50% - 0.7em); */
  }
`

const StyledPaginationAction = styled(Box)`
  padding-right: 2.4rem;
  padding-block: 1rem;
`

export { StyledPagination, StyledPaginationContainer, StyledPaginationAction }
export type { StyledPaginationComponentProps }
