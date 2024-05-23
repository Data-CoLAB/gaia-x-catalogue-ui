/* eslint-disable @typescript-eslint/restrict-template-expressions */
import MaterialReactTable, {
  MaterialReactTableProps,
  type MRT_ColumnDef,
} from 'material-react-table'
import { theme } from '../../theme/theme.config'

const DataGrid = <TData extends Record<string, any>>(
  props: MaterialReactTableProps<TData>
) => {
  return (
    <MaterialReactTable<TData>
      {...props}
      muiTableBodyCellSkeletonProps={({}) => ({
        width: '15rem',
        height: '3rem',
        sx: {
          borderRadius: '4px',
          backgroundColor:
            'linear-gradient(90deg, #D9D9D9 0%, rgba(217, 217, 217, 0.00) 104.23%)',
        },
      })}
      muiTablePaperProps={{
        sx: {
          '&': {
            boxShadow: '0 0 0 0 transparent',
            borderRadius: '1rem',
            border: `0 solid ${theme.palette.secondary.gray3}`,
            background: theme.palette.primary.contrastText,
            overflow: 'hidden',
            margin: '1rem',
            fontFamily: 'Titillium Web',
          },
          '& > .MuiToolbar-root:first-child': {
            background: '#fafaff',
            marginBottom: '0 !important',
            minHeight: '5rem !important',
          },
          ' .MuiTableContainer-root': {
            borderRadius: '1rem 1rem 0rem 0rem',
            border: `1px solid ${theme.palette.secondary.gray3}`,
          },
          ' .MuiTableContainer-root tbody tr:last-child td': {
            borderBottom: 0,
          },
          ' .MuiTableContainer-root + .MuiToolbar-root': {
            border: `1px solid ${
              props.enablePagination
                ? theme.palette.secondary.gray3
                : 'transparent'
            }`,
            borderRadius: '0rem 0rem 1rem 1rem',
            borderTop: 0,
            background: theme.palette.primary.contrastText,
            marginBottom: 0,
          },
          ' .MuiToolbar-root .MuiBox-root .MuiSvgIcon-root': {
            width: '1.8rem',
            height: '1.8rem',
          },
          ' .MuiInput-root': {
            fontSize: '1.6rem',
            fontFamily: 'Titillium Web',
          },
          ' tr th': {
            color: theme.palette.primary.green,
            fontFamily: 'Titillium Web',
            fontSize: '1.8rem',
            fontWeight: 400,
            padding: '2rem',
          },
          ' tr th .Mui-TableHeadCell-Content .Mui-TableHeadCell-Content-Actions':
            {
              marginInlineStart: '1rem',
            },
          ' tr th .Mui-active svg.MuiTableSortLabel-icon': {
            color: theme.palette.primary.green,
          },
          ' .MuiBox-root': {
            left: 0,
            right: 'auto',
          },
          ' .MuiToolbar-root': {
            fontSize: '1.6rem',
            marginBottom: '1rem',
            paddingLeft: '1.1rem',
            minHeight: '6.5rem',
          },
          ' .MuiTablePagination-selectLabel': {
            fontSize: '1.8rem',
          },
          ' .MuiTablePagination-displayedRows': {
            fontSize: '1.8rem',
          },
        },
      }}
      muiTableBodyProps={{
        sx: {
          '& tr td': {
            color: theme.palette.secondary.black,
            fontFamily: 'Titillium Web',
            fontSize: '1.8rem',
            fontWeight: 400,
            padding: '1rem 2rem',
          },
        },
      }}
    />
  )
}

export { DataGrid, type MRT_ColumnDef }
