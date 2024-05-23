/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'debounce'
import { Parser, generate } from 'pegjs'
import {
  CloseMUIIcon,
  SearchIcon,
  TuneIcon,
  CustomTabs,
  InputField,
  Badge,
} from '@gaia-x-frontend/components-lib'
import { BasicSearch } from '../BasicSearch'
import { AdvanceSearch } from '../AdvanceSearch'
import { Search as SearchSkeleton } from '../Skeleton'
import { SearchQueryHelper } from '@catalogue/utility/helper'
import { GrammerAPI, SelectorAPI } from '@catalogue/api/search.api'
import { SearchType } from '../../constants/base.constants'
import { Query } from '@catalogue/models/Catalogue.model'
import { SelectorResponse } from '@catalogue/models/Search.model'
import SearchServiceStyle from './SearchService.module.scss'

type SearchServiceProps = {
  onQueryChange: (relation: Query) => void
  onResetQuery: () => void
}

const SearchServices = ({
  onQueryChange,
  onResetQuery,
}: SearchServiceProps) => {
  const [showSearchOptions, setSearchOptions] = useState(false)
  const [loadingGrammer, setLoadingGrammar] = useState<boolean>(true)
  const [loadingSelectors, setLoadingSelectors] = useState(true)
  const [searchType, setSearchType] = useState<SearchType>(SearchType.Selector)
  const [parser, setParser] = useState<Parser | undefined>()
  const [selectors, setSelectors] = useState<SelectorResponse[]>([])
  const [searchText, setSearchText] = useState('')
  const [filters, setFilters] = useState(0)
  const [basicSearch, setBasicSearch] = useState<Query | undefined>()
  const [disableReset, setDisableReset] = useState<SearchType>(
    SearchType.Selector
  )
  useEffect(() => {
    getGrammer()
    getSelectors()
  }, [])

  const handleSearch = (searchString: string) => {
    setSearchText(searchString)
    debounceSearch(searchString, basicSearch)
  }
  const debounceSearch = useCallback(
    debounce((searchString: string, basicSearchQuery?: Query) => {
      if (searchString) {
        const searchQuery = SearchQueryHelper(searchString)
        if (basicSearchQuery) {
          if (searchQuery.or?.length) {
            const searchFilter: Query = JSON.parse(
              JSON.stringify(basicSearchQuery)
            )
            searchFilter.and?.push(searchQuery.or[0])
            onQueryChange(searchFilter)
          }
        } else {
          onQueryChange(searchQuery)
        }
      } else {
        if (basicSearchQuery) {
          onQueryChange(basicSearchQuery)
        } else {
          onResetQuery()
        }
      }
    }, 1000),
    []
  )

  const onQuerySubmit = (relation: Query) => {
    onQueryChange(relation)
  }
  const handleFiltersChange = (value: number) => {
    setFilters(value)
  }
  const getSelectors = () => {
    SelectorAPI()
      .then((resp) => {
        setSelectors(resp)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoadingSelectors(false)
      })
  }

  const getGrammer = () => {
    GrammerAPI()
      .then((resp) => {
        const parser = generate(resp)
        setParser(parser)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoadingGrammar(false)
      })
  }

  const handleSearchByQuery = (query: Query) => {
    setFilters(0)
    setSearchText('')
    onQuerySubmit(query)
    setSearchOptions(false)
    setDisableReset(SearchType.Advanced)
    setBasicSearch(undefined)
  }

  const handleResetByQuery = () => {
    setFilters(0)
    onResetQuery()
    setSearchOptions(false)
    setBasicSearch(undefined)
  }

  const handleSearchBySelector = (query: Query) => {
    setBasicSearch(query)
    if (searchText) {
      const filterSearch = SearchQueryHelper(searchText)
      const searchQuery: Query = JSON.parse(JSON.stringify(query))
      if (filterSearch.or?.[0]) {
        searchQuery.and?.push(filterSearch.or[0])
      }
      setSearchOptions(false)
      onQuerySubmit(searchQuery)
    } else {
      setSearchOptions(false)
      onQuerySubmit(query)
    }
    setDisableReset(SearchType.Selector)
  }

  const handleResetBySelector = () => {
    setSearchOptions(false)
    setBasicSearch(undefined)
    if (searchText) {
      const searchQuery = SearchQueryHelper(searchText)
      onQuerySubmit(searchQuery)
    } else {
      onResetQuery()
    }
  }

  return (
    <div className="w-[100%] max-w-screen-xl">
      <div
        className={
          showSearchOptions
            ? 'max-w-screen-xl block w-[100%] bg-[white] absolute z-[1] top-0 opacity-[0.95] ' +
              SearchServiceStyle.searchBox
            : 'hidden'
        }
      >
        <div className="w-[100%] flex flex-col p-16 pt-[2rem]">
          <div
            onClick={() => {
              setSearchOptions(false)
            }}
            className="absolute top-0 right-0 m-[3rem] cursor-pointer z-10"
          >
            <CloseMUIIcon fontSize="large" />
          </div>
          <div>
            {/* {loadingGrammar === APIStatus.Success && */}
            {!(loadingSelectors && loadingGrammer) ? (
              <div className={' w-[100%] flex flex-col'}>
                <CustomTabs
                  items={['Basic', 'Advanced']}
                  onChangeTab={(e: number) => setSearchType(e)}
                  fontColor="#B1B2B2"
                  activetabColor="#465AFF"
                />

                <div
                  className={
                    searchType === SearchType.Advanced ? 'block' : 'hidden'
                  }
                >
                  <AdvanceSearch
                    parser={parser}
                    onQuerySubmit={handleSearchByQuery}
                    onResetQuery={handleResetByQuery}
                    disableReset={disableReset == SearchType.Advanced}
                  />
                </div>
                <div
                  className={
                    searchType === SearchType.Selector
                      ? 'block mt-[3rem]'
                      : 'hidden'
                  }
                >
                  <BasicSearch
                    selectors={selectors}
                    onQuerySubmit={handleSearchBySelector}
                    onResetQuery={handleResetBySelector}
                    handleFilterChanges={handleFiltersChange}
                    disableReset={disableReset == SearchType.Selector}
                  />
                </div>
              </div>
            ) : (
              <SearchSkeleton />
            )}
          </div>
        </div>
      </div>

      <div className={showSearchOptions ? 'hidden' : 'block'}>
        <div className="mx-8 flex justify-center align-center" style={{background: 'white'}}>
          <InputField
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            fullWidth={true}
            minheight="none"
            placeholder="Search service name"
            InputProps={{
              startAdornment: (
                <div className="mr-[2rem]">
                  <SearchIcon fontSize="large" />
                </div>
              ),
              endAdornment: (
                <div
                  onClick={() => {
                    setSearchOptions(true)
                  }}
                  className="cursor-pointer"
                >
                  <Badge
                    badgeContent={filters}
                    variant="standard"
                    overlap="circular"
                    color="primary"
                  >
                    <TuneIcon fontSize="large" />
                  </Badge>
                </div>
              ),
            }}
          ></InputField>
        </div>
      </div>
    </div>
  )
}

export { SearchServices }
