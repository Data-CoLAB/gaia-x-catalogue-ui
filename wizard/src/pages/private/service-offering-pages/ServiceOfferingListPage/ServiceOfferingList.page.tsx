import { formatDate, getMillisecondToDate } from '@wizard/utils/helpers'
import { getMaster } from '@wizard/api/auth.api'
import { MasterType } from '@wizard/utils/constants'
import { NoRecordDisplay } from '@wizard/components'
import { postServiceOfferingList } from '@wizard/api/serviceCreation.api'
import { ServiceOffering } from '@wizard/models/service-management.model'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelectedEntity } from '@wizard/hooks'
import {
  renderLabelLevel,
  renderSelfDescription,
  renderServiceName,
} from './ServiceOfferingColumn.helper'
import {
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

const ServiceOfferingListPage = () => {
  const navigation = useNavigate()
  const { id: participantId } = useSelectedEntity()
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])
  const [columnSorting, setColumnSorting] = useState<ColumnSort[]>([])

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })
  function callPostServiceOfferingList() {
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
        column:
          item?.id === 'serviceOfferStandardType'
            ? 'serviceOfferStandardType.type'
            : item?.id,
        operator: 'CONTAIN',
        values: Array.isArray(item.value) ? item.value : [item?.value],
      })),
    }
    return postServiceOfferingList(param, participantId ?? '').then((res) => {
      return res.payload
    })
  }
  function supportedStandard() {
    return getMaster(MasterType.Standard, {
      page: 0,
      size: 500,
    }).then((res) => {
      return res.payload?.content?.map((item) => item.type)
    })
  }

  const { data: standardFilterOption, isLoading: isFilterLoading } = useQuery({
    queryKey: ['filterStandard'],
    queryFn: supportedStandard,
  })

  const {
    data: listValue,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [
      'serviceOfferList',
      participantId,
      columnFilters,
      columnSorting,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: callPostServiceOfferingList,
    keepPreviousData: false,
  })

  const columns = useMemo<MRT_ColumnDef<ServiceOffering>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Service Name',
        size: 200,
        Cell: renderServiceName,
      },
      {
        accessorKey: 'labelLevel',
        header: 'Label level',
        Cell: renderLabelLevel,
        filterVariant: 'multi-select',
        enableColumnFilterModes: true,
        filterSelectOptions: ['BC', 'L1', 'L2', 'L3'],
        size: 100,
      },
      {
        accessorKey: 'serviceOfferStandardType',
        accessorFn: (row) =>
          row?.serviceOfferStandardType
            ?.map((item) => ` ${item.type}`)
            .toString(),
        header: 'Supported standards',
        filterVariant: 'multi-select',
        enableColumnFilterModes: true,
        filterSelectOptions: standardFilterOption,
        size: 300,
        enableSorting: false,
      },
      {
        accessorKey: 'credential',
        accessorFn: (row) => row?.credential?.vcUrl,
        header: 'Self description',
        minSize: 350,
        enableColumnFilter: false,
        enableSorting: false,
        enableColumnActions: false,
        Cell: renderSelfDescription,
      },
      {
        accessorFn: (row) =>
          row.createdAt
            ? formatDate(
                getMillisecondToDate(row.createdAt),
                'DD MMM YYYY HH:mm:ss'
              )
            : '-',
        accessorKey: 'createdAt',
        enableColumnFilter: false,
        header: 'Created on',
        size: 150,
      },
    ],
    [isFilterLoading]
  )

  return (
    <div className="relative">
      <DataGrid
        data={listValue?.content ?? []}
        columns={columns}
        enableGlobalFilter={false}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enablePagination={
          listValue?.pageable?.totalElements
            ? listValue?.pageable?.totalElements > 5
            : false
        }
        manualFiltering
        manualSorting
        enableHiding={false}
        manualPagination
        onColumnFiltersChange={setColumnFilters}
        onSortingChange={setColumnSorting}
        onPaginationChange={setPagination}
        rowCount={listValue?.pageable?.totalElements}
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
                : 'Currently, there are no Services created by you. Create a new Service Offering'
            }
            link="/private/services/create"
          />
        )}
      />

      {listValue?.pageable?.totalElements ? (
        <div className="fixed right-[4.6rem] bottom-[4.6rem] z-[9]">
          <FabButton
            color={'primary'}
            onClick={() => navigation('/private/services/create')}
          />
        </div>
      ) : null}
    </div>
  )
}

export default ServiceOfferingListPage
