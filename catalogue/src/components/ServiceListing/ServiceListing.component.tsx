/* eslint-disable react-hooks/exhaustive-deps */
import {
  getServiceDetailAPI,
  getServiceListAPI,
  getTagsListAPI,
} from '@catalogue/api/catalogue.api'
import {
  Content,
  Query,
  ServiceDetail,
  ServiceListRequest,
  Tags,
} from '@catalogue/models/Catalogue.model'
import { SortOrderHelper } from '@catalogue/utility/helper'
import {
  CatalogueCard,
  CustomTags,
  ProgressBar,
} from '@gaia-x-frontend/components-lib'
import { useCallback, useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { SearchServices } from '../SearchServices'
import { ServiceDetail as ServiceDetailComp } from '../ServiceDetail'
import {
  CatalogueList as CatalogueSkeleton,
  ServiceDetail as ServiceDetailSkeleton,
  SortBar as SortBarSkeleton,
} from '../Skeleton'
import { SortBar } from '../SortBar'
import ServiceListingStyle from './ServiceListing.module.scss'

/** MOCKS */
const mockData = [
  {
    id: 'content1',
    credentialSubjectId: 'subject1',
    name: 'Sample Content 1',
    dataAccountExport: {
      id: 'export1',
      createdDate: 1627847382,
      accessType: 'read-only',
      requestType: 'API',
      formatType: ['JSON', 'XML'],
    },
    protectionRegime: [
      {
        id: 'regime1',
        name: 'GDPR',
        createdDate: 1597847382,
      },
      {
        id: 'regime2',
        name: 'CCPA',
        createdDate: 1607847382,
      },
    ],
    providedBy: 'Provider A',
    locations: [
      {
        // Assuming Location structure
        id: 'loc1',
        name: 'Server A',
        createdDate: 2022,
      },
    ],
    veracity: 95,
    transparency: 90,
    trustIndex: 92,
    labelLevel: 'High',
  },
  {
    id: 'content2',
    credentialSubjectId: 'subject2',
    name: 'Sample Content 2',
    dataAccountExport: {
      id: 'export2',
      createdDate: 1627848393,
      accessType: 'full-access',
      requestType: 'Manual',
      formatType: ['CSV'],
    },
    protectionRegime: [
      {
        id: 'regime3',
        name: 'HIPAA',
        createdDate: 1617847382,
      },
    ],
    providedBy: 'Provider B',
    locations: [
      {
        // Assuming Location structure
        id: 'loc2',
        name: 'Server B',
        createdDate: 2022,
      },
    ],
    veracity: 88,
    transparency: 85,
    trustIndex: 87,
    labelLevel: 'Medium',
  },
]
const mockDescription = {
  id: 'service1',
  description: 'This is a sample service description.',
  credentialSubjectId: 'subject1',
  name: 'Sample Service',
  labelLevel: 'High',
  protectionRegime: [
    {
      id: 'regime1',
      name: 'GDPR',
      createdDate: 1597847382,
    },
    {
      id: 'regime2',
      name: 'CCPA',
      createdDate: 1607847382,
    },
  ],
  locations: [
    {
      // Assumindo a estrutura da interface Location
      id: 'loc1',
      name: 'Data Center A',
      createdDate: 2022,
    },
    {
      id: 'loc2',
      name: 'Data Center B',
      createdDate: 2022,
    },
  ],
  dependedServices: [
    {
      id: 'service2',
      name: 'Dependent Service 1',
      credentialSubjectId: 'subject2',
    },
    {
      id: 'service3',
      name: 'Dependent Service 2',
      credentialSubjectId: 'subject3',
    },
  ],
  resources: [
    {
      id: 'resource1',
      name: 'Resource 1',
      credentialSubjectId: 'subject4',
    },
    {
      id: 'resource2',
      name: 'Resource 2',
      credentialSubjectId: 'subject5',
    },
  ],
  veracity: 95,
  transparency: 90,
  trustIndex: 92,
  dataAccountExport: {
    id: 'export1',
    createdDate: 1627847382,
    accessType: 'read-only',
    requestType: 'API',
    formatType: ['JSON', 'XML'],
  },
  tnCUrl: 'https://example.com/terms-and-conditions',
  participant: {
    id: 'participant1',
    name: 'Participant A',
    credentialSubjectId: 'subject6',
  },
}
const mockTags = [
  {
    count: 38,
    value: 'JavaScript',
  },
  {
    count: 30,
    value: 'React',
  },
  {
    count: 28,
    value: 'Nodejs',
  },
  {
    count: 25,
    value: 'Express.js',
  },
  {
    count: 33,
    value: 'HTML5',
  },
  {
    count: 18,
    value: 'MongoDB',
  },
  {
    count: 20,
    value: 'CSS3',
  },
]

const ServiceListing = () => {
  const [data, setData] = useState<Content[]>(mockData)
  const [page, setPage] = useState<number>(0)
  const [tags, setTags] = useState<Tags[]>(mockTags)
  const [selectedTag, setSelectedTag] = useState<string>()
  const [maxPage, setMaxPage] = useState<number>(1)
  const [description, setDescription] = useState<ServiceDetail>()
  const [totalRecords, setTotalRecords] = useState<number>()
  const [activeCard, setActiveCard] = useState<string>()
  const [loadingList, setLoadingList] = useState<boolean>(true)
  const [loadingDetails, setLoadingDetails] = useState<boolean>(true)
  const [sortOrder, setSortOrder] = useState<
    | {
        column: string
        sortType: string
      }[]
    | undefined
  >([
    {
      column: 'createdAt',
      sortType: 'DESC',
    },
  ])
  const [query, setQuery] = useState<undefined | Query>()
  useEffect(() => {
    if (page < maxPage && page != 0) {
      getServiceList()
    }
  }, [page, maxPage])

  useEffect(() => {
    if (!description && data.length > 0) {
      getServiceDetail(data[0].id)
    }
    getTagsList()
  }, [data, description])

  useEffect(() => {
    getServiceList()
  }, [sortOrder, query])

  useEffect(() => {
    console.log(selectedTag)
  }, [selectedTag])

  const onSortChange = (value: number) => {
    setData([])
    setLoadingList(true)
    setLoadingDetails(true)
    setDescription(undefined)
    setPage(0)
    const sortQuery = SortOrderHelper(value)
    setSortOrder(sortQuery)
  }
  const onQueryChange = (relation: Query) => {
    setQuery({ ...relation })
    setLoadingList(true)
    setLoadingDetails(true)
    setDescription(undefined)
    setData([])
    setPage(0)
  }
  const onResetQuery = () => {
    setPage(0)
    setQuery(undefined)
    setLoadingList(true)
    setLoadingDetails(true)
    setDescription(undefined)
    setData([])
  }
  const getServiceList = () => {
    const searchQuery: ServiceListRequest = {
      page: page,
      size: 10,
      query: query,
      prompt: '',
    }
    if (sortOrder) {
      searchQuery.sort = sortOrder
    }
    getServiceListAPI(searchQuery)
      .then((res) => {
        setData((prevData) => [...prevData, ...res.content])
        if (page == 0) {
          setMaxPage(res.totalPages)
          setTotalRecords(res.totalElements)
        }
        if (res.content.length == 0) {
          setLoadingDetails(false)
        }
        setLoadingList(false)
      })
      .catch(() => {
        setLoadingList(false)
        setLoadingDetails(false)
      })
  }

  const getTagsList = () => {
    getTagsListAPI()
      .then((res: Tags[]) => {
        setTags(res)
      })
      .catch(() => {
        setLoadingList(false)
        setLoadingDetails(false)
      })
  }

  const loadMore = useCallback(() => {
    setPage((prePage) => prePage + 1)
  }, [])

  const getServiceDetail = (id: string) => {
    getServiceDetailAPI(id)
      .then((res) => {
        setActiveCard(id)
        setDescription(res.payload)
        setLoadingDetails(false)
      })
      .catch(() => {
        // console.log(err)
      })
  }

  const Footer = () => {
    return (
      <div className="flex justify-center pt-[3rem] pb-[3rem] ">
        {page < maxPage ? <ProgressBar /> : null}
      </div>
    )
  }
  return (
    <div className={ServiceListingStyle.serviceListingPage}>
      <div
        className={
          ServiceListingStyle.searchBar +
          ' h-[9rem] flex content-center items-center relative justify-center'
        }
      >
        <SearchServices
          onQueryChange={onQueryChange}
          onResetQuery={onResetQuery}
        />
      </div>
      <div
        className={
          ServiceListingStyle.searchBar +
          ' h-[9rem]  flex content-center items-center relative justify-center'
        }
      >
        <CustomTags
          style={{ borderBottom: 24 }}
          items={tags}
          onClickTag={(e: string) => {
            setSelectedTag(e)
          }}
        ></CustomTags>
      </div>
      <div
        className={
          ServiceListingStyle.mainContainer +
          ' max-w-screen-xl flex gap-8 pt-[1.2rem] p-8'
        }
      >
        <div
          className={
            ServiceListingStyle.mainContent +
            '  flex flex-col gap-[0.7rem] overflow-y-auto grow w-[100rem] relative'
          }
        >
          <div className={loadingList ? 'hidden' : 'block'}>
            <div
              className={
                ServiceListingStyle.sortBar +
                ' flex shrink-0 mb-[1.5rem] w-[100%] h-[5rem] sticky top-0 rounded-[1rem]'
              }
            >
              <SortBar
                totalRecords={totalRecords}
                onSortChange={onSortChange}
              />
            </div>
          </div>
          <div className={loadingList ? 'block' : 'hidden'}>
            <div
              className={
                ServiceListingStyle.sortBar +
                ' flex shrink-0 mb-[1.5rem] w-[100%] h-[5rem] sticky top-0 rounded-[1rem]'
              }
            >
              <SortBarSkeleton />
            </div>
          </div>

          {loadingList ? (
            <CatalogueSkeleton />
          ) : data.length ? (
            <Virtuoso
              data={data}
              endReached={loadMore}
              itemContent={(index, data) => {
                return (
                  <div
                    key={index}
                    className={' mr-[1rem] mb-[0.8rem]'}
                    onClick={() => {
                      setLoadingDetails(true)
                      getServiceDetail(data.id)
                      //MOCK DO DELETE
                      setActiveCard(data.id)
                      setLoadingDetails(false)
                      setDescription(mockDescription)
                    }}
                  >
                    <CatalogueCard
                      title={data.name}
                      certificate={data.protectionRegime}
                      owner={data.providedBy}
                      location={data.locations}
                      level={data.labelLevel}
                      showBorder={data.id == activeCard}
                    />
                  </div>
                )
              }}
              components={{ Footer }}
            />
          ) : (
            <div
              className={
                ServiceListingStyle.dataNotFound +
                ' flex flex-col h-[100%] w-[100%]  items-center justify-center'
              }
            >
              <div>Oops!</div>
              <div>No record found. Please try again</div>
            </div>
          )}
        </div>

        <div
          className={
            ServiceListingStyle.descriptionContent + ' overflow-x-auto'
          }
        >
          {loadingDetails || loadingList ? (
            <ServiceDetailSkeleton />
          ) : description ? (
            <ServiceDetailComp serviceDetail={description} />
          ) : (
            <div
              className={
                ServiceListingStyle.dataNotFound +
                ' flex h-[100%] w-[100%] items-center justify-center'
              }
            >
              No Data Found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export { ServiceListing }
