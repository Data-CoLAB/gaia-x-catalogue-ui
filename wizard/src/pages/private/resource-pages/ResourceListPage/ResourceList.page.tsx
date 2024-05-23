import { AllResourceTypeFilterList } from '@wizard/utils/constants'
import { formatDate, getMillisecondToDate } from '@wizard/utils/helpers'
import { getAlert } from '@wizard/hooks/useAlert.hooks'
import { Link, useNavigate } from 'react-router-dom'
import { NoRecordDisplay } from '@wizard/components'
import { postResourceList } from '@wizard/api/resourceCreation.api'
import { ResourceListTypeModel } from '@wizard/models/resource-creation.model'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelectedEntity } from '@wizard/hooks'
import {
  CopyIcon,
  DataGrid,
  FabButton,
  type MRT_ColumnDef,
} from '@gaia-x-frontend/components-lib'

interface ColumnFilter {
  id: string
  value: string | unknown
}

interface ColumnSort {
  id: string
  desc: boolean
}

const ResourceListPage = () => {
  const navigation = useNavigate()
  const { id: participantId } = useSelectedEntity()
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])
  const [columnSorting, setColumnSorting] = useState<ColumnSort[]>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  const resourceTypeFilterList = AllResourceTypeFilterList

  function callPostResourceList() {
    const param = {
      page: pagination.pageIndex,
      size: pagination.pageSize,
      sort: {
        column: columnSorting.length ? columnSorting[0].id : 'createdAt',
        sortType: columnSorting.length
          ? columnSorting[0].desc
            ? 'DESC'
            : 'ASC'
          : 'DESC',
      },
      criteriaOperator: 'AND',
      criteria: columnFilters?.map((item) => ({
        column: item?.id,
        operator: 'CONTAIN',
        values: Array.isArray(item.value) ? item.value : [item?.value],
      })),
    }

    return postResourceList(param, participantId ?? '').then((res) => {
      setPagination({
        pageIndex: res.payload?.pageable?.pageNumber,
        pageSize: res.payload?.pageable?.pageSize,
      })
      return res.payload
    })
  }

  const {
    data: listValue,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [
      'resourceList',
      participantId,
      columnFilters,
      columnSorting,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: callPostResourceList,
    keepPreviousData: false,
  })

  const columns = useMemo<MRT_ColumnDef<ResourceListTypeModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Resource Name',
        size: 230,
        Cell: ({ renderedCellValue }) => (
          <span className="capitalize font-[600] ">{renderedCellValue}</span>
        ),
      },
      {
        accessorKey: 'type',
        accessorFn: (origin) => origin.typeLabel,
        header: 'Resource Type',
        filterVariant: 'multi-select',
        enableColumnFilterModes: true,
        filterSelectOptions: resourceTypeFilterList,
        minSize: 100,
      },
      {
        accessorKey: 'credential.vcUrl',
        header: 'Self description',
        size: 100,
        enableSorting: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ renderedCellValue, row }) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'spaceBetween',
              maxWidth: '42rem',
            }}
          >
            <span
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                textDecoration: 'underline',
                maxWidth: '38rem',
                cursor: 'pointer',
              }}
            >
              <Link
                to={row?.original?.selfDescription}
                rel="noopener"
                target="_blank"
                style={{ color: 'inherit' }}
              >
                {renderedCellValue}
              </Link>
            </span>
            <button
              className="pl-[1rem] cursor-pointer"
              type="button"
              onClick={() => handleCopy(row?.original?.selfDescription)}
            >
              <CopyIcon />
            </button>
          </div>
        ),
      },
      {
        accessorFn: (row) =>
          `${formatDate(
            getMillisecondToDate(row.createdAt),
            'DD MMM YYYY HH:mm:ss'
          )}`,
        accessorKey: 'createdAt',
        enableColumnFilter: false,
        header: 'Created on',
        size: 200,
      },
    ],
    []
  )

  const handleCopy = (url: string) => {
    if (url) {
      navigator.clipboard.writeText(url)
      getAlert('success', 'URL copied successfully')
    }
  }

  return (
    <div className="relative">
      <DataGrid
        data={listValue?.content ?? []}
        columns={columns}
        enableGlobalFilter={false}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        manualFiltering
        manualSorting
        manualPagination
        onColumnFiltersChange={setColumnFilters}
        onSortingChange={setColumnSorting}
        onPaginationChange={setPagination}
        rowCount={listValue?.pageable?.totalElements}
        enablePagination={
          listValue?.pageable?.totalElements
            ? listValue?.pageable?.totalElements > 5
            : false
        }
        enableHiding={false}
        state={{
          columnFilters,
          showSkeletons: isLoading,
          pagination,
          sorting: columnSorting,
          showAlertBanner: isError,
        }}
        renderEmptyRowsFallback={() => (
          <NoRecordDisplay
            isError={isError}
            title={isError ? 'Oops!' : 'Welcome!'}
            onRetry={refetch}
            content={
              isError
                ? 'Something went wrong.'
                : 'Currently, there are no Resources created by you. Create a new Resource'
            }
            link="/private/resources/create"
          />
        )}
      />

      {listValue?.pageable?.totalElements ? (
        <div className="fixed right-[4.6rem] bottom-[4.6rem] z-[9]">
          <FabButton
            color={'primary'}
            onClick={() => navigation('/private/resources/create')}
          ></FabButton>
        </div>
      ) : null}
    </div>
  )
}

export default ResourceListPage
