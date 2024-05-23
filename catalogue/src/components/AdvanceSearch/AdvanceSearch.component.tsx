/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Parser } from 'pegjs'
import {
  Button,
  CancelIcon,
  CheckCircleIcon,
  InputField,
} from '@gaia-x-frontend/components-lib'
import { Query } from '@catalogue/models/Catalogue.model'
interface SearchServicesByQueryProps {
  parser: Parser | undefined
  onQuerySubmit: (relation: Query) => void
  onResetQuery: () => void
  disableReset: boolean
}

const AdvanceSearch = ({
  parser,
  onQuerySubmit,
  onResetQuery,
  disableReset,
}: SearchServicesByQueryProps) => {
  const [query, setQuery] = useState('')
  const [relation, setRelation] = useState<unknown | null>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [searched, setSearched] = useState(false)
  const [incompleteSearch, setIncompleteSearch] = useState(true)
  const textFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    textFieldRef.current?.focus()
  }, [query])

  const parseInputValue = useCallback(
    (inputValue: string): void => {
      try {
        // Replace one or more occurrence of consecutive spaces with single space
        const trimmedValue = inputValue.replace(/  +/g, ' ')
        setQuery(trimmedValue)
        const relation: unknown = parser?.parse(trimmedValue)
        if (relation) {
          setRelation(relation)
          setSuggestions([])
          setIncompleteSearch(false)

          return
        }
      } catch (err: unknown) {
        setIncompleteSearch(true)
        const typedErr = err as {
          expected: { ignoreCase: boolean; text: string; type: string }[]
        }
        const suggestions = [
          ...new Set(
            typedErr.expected
              .map((item) => item.text)
              .filter((text) => Boolean(text))
          ),
        ]
        setRelation(null)
        setSuggestions(suggestions)
      }
    },
    [parser]
  )

  const buildQuery = useCallback(
    (syntax: string) => {
      const whiteSpace = !query.length
        ? ''
        : ['.', '(', ')', ','].includes(syntax)
        ? ''
        : ['.', '('].includes(query.slice(-1))
        ? ''
        : ' '
      const buildedQuery = `${query}${whiteSpace}${syntax}`
      parseInputValue(buildedQuery)
    },
    [query, parseInputValue]
  )

  const handleReset = useCallback(() => {
    if (query.length) {
      setQuery('')
      parseInputValue('')
      onResetQuery()
      setSearched(false)
    } else {
      onResetQuery()
    }
  }, [parseInputValue, query])

  useEffect(() => {
    parseInputValue('')
  }, [parseInputValue])

  return (
    <div className={' flex flex-col items-center mt-[1rem]'}>
      <div className="flex gap-[1rem] items-center w-[100%] mt-[1rem]">
        <InputField
          className={' ml-[1rem] mr-[1rem] w-[100%] text-center'}
          type="text"
          value={query}
          inputRef={textFieldRef}
          onChange={(event) => {
            parseInputValue(event.target.value)
          }}
          minheight="none"
          variant="standard"
          InputProps={{
            startAdornment: (
              <div className="mr-[2rem] flex items-center">
                {incompleteSearch ? (
                  <CancelIcon fontSize="large" color="error" />
                ) : (
                  <CheckCircleIcon fontSize="large" color="success" />
                )}
              </div>
            ),
          }}
        />
      </div>

      <br></br>
      <div className="flex flex-wrap gap-[0.6rem] h-[10rem] overflow-scroll ">
        {suggestions.map((suggestion) => {
          return (
            <div
              className={
                ' mr-[1rem] h-[2.8rem] px-[1.4rem] py-[0.2rem] bg-[#465AFF]/[.10] text-black rounded-[15rem] text-[1.6rem] font-[400] cursor-pointer '
              }
              key={suggestion}
              onClick={() => buildQuery(suggestion)}
            >
              {suggestion}
            </div>
          )
        })}
      </div>
      <div className="flex gap-[2rem] mt-[1rem]">
        <Button
          onClick={() => {
            setSearched(true)
            onQuerySubmit(relation as Query)
          }}
          className={' self-center'}
          variant="contained"
          size="large"
          disabled={incompleteSearch}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            handleReset()
          }}
          className={' self-center'}
          variant="outlined"
          size="large"
          disabled={!searched || !disableReset}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export { AdvanceSearch }
