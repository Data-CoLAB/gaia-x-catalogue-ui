import { useMemo, useState } from 'react'
import { Field, Form } from 'react-final-form'
import {
  ModifiedAsyncSearchSelect,
  Button,
} from '@gaia-x-frontend/components-lib'
import { SelectorResponse } from '@catalogue/models/Search.model'
import { Query } from '@catalogue/models/Catalogue.model'
import { loadOptions } from '@catalogue/utility/aysnc.helper'
import { labelHelper } from '@catalogue/utility/helper'
import BasicSearchStyle from './BasicSearch.module.scss'

export interface KeyValueType {
  [key: string]: {
    label: string
    value: string
  }[]
}
interface BasicSearch {
  // parser: Parser | undefined
  selectors: SelectorResponse[]
  onQuerySubmit: (relation: Query) => void
  onResetQuery: () => void
  handleFilterChanges: (value: number) => void
  disableReset: boolean
}

const CATEGORIES = [
  'Address',
  'Participant',
  'DataProtectionRegime',
  'ServiceOffering',
  'Resource',
  'DataAccountExport',
]

const BasicSearch = ({
  selectors,
  onQuerySubmit,
  onResetQuery,
  handleFilterChanges,
  disableReset,
}: BasicSearch) => {
  const [filters, setFilters] = useState(0)

  const filteredSelectors: SelectorResponse[] = useMemo(
    () =>
      selectors.filter((selector: SelectorResponse) =>
        CATEGORIES.includes(selector.field)
      ),
    [selectors]
  )

  const handleReset = () => {
    setFilters(0)
    handleFilterChanges(0)
    onResetQuery()
  }

  const handleSubmit = (values: KeyValueType) => {
    let localFilter = 0
    const query: Query = {
      and: [],
    }
    const jsonObject = { ...values }
    for (const key in jsonObject) {
      const queryKey = key
      const queryValue = jsonObject[key].map((item) => item.value)
      const queryObj = queryGenerator(queryKey, queryValue)

      if (queryValue.length) {
        query.and?.push(queryObj)
        localFilter++
      }
    }
    if (query.and?.length) {
      onQuerySubmit(query)
      setFilters(localFilter)
      handleFilterChanges(localFilter)
    } else {
      onResetQuery()
      setFilters(0)
      handleFilterChanges(0)
    }
  }

  const queryGenerator = (key: string, value: string[]) => {
    const searchObject = selectors.find(
      (value) => value.field + value.property == key
    )

    if (key == 'DataAccountExportformatType') {
      return {
        value: value,
        edge: searchObject?.edge,
        node: searchObject?.field,
        key: searchObject?.property,
        operator: 'Any',
      }
    }
    return {
      value: value,
      edge: searchObject?.edge,
      node: searchObject?.field,
      key: searchObject?.property,
      operator: 'In',
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, form }) => (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={handleSubmit}>
          <div className="flex gap-[1rem] flex-col">
            <div className="flex flex-wrap gap-[2rem]">
              {filteredSelectors.map((selector) => {
                return (
                  <Field
                    name={selector.field + selector.property}
                    key={selector.field + selector.property}
                  >
                    {({ input }) => (
                      <div
                        className={
                          'flex-grow h-[5.5rem] searchOption ' +
                          BasicSearchStyle.searchOption
                        }
                      >
                        <ModifiedAsyncSearchSelect
                          {...input}
                          label={labelHelper(selector.field, selector.property)}
                          placeholder={`${labelHelper(
                            selector.field,
                            selector.property
                          )}`}
                          loadOptions={(search: string) =>
                            loadOptions(
                              selector.field,
                              selector.property,
                              search
                            )
                          }
                          isMulti
                          hideSelectedOptions={true}
                        />
                      </div>
                    )}
                  </Field>
                )
              })}
            </div>
            <div
              className={
                ' flex flex-row gap-[2rem] flex-shrink-0 justify-center'
              }
            >
              <div className="flex gap-[1rem] h-[7rem] mt-[2rem]">
                <Button
                  className="self-center"
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Search
                </Button>
                <Button
                  onClick={() => {
                    form.reset()
                    handleReset()
                  }}
                  className="self-center"
                  variant="outlined"
                  size="large"
                  disabled={filters == 0 || !disableReset}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    />
  )
}

export { BasicSearch }
