import { useState } from 'react'
import { TabsProps, Tag, TagContainer } from './Tags.styled'

export interface Tags {
  value: string
  count: number
}

export type CustomTagsProps = TabsProps & {
  items: Tags[]
  onClickTag: (param: string) => void
}

const CustomTags = ({ items, onClickTag }: CustomTagsProps) => {
  const [selectedTag, setSelectedTag] = useState<string>('')

  const handleTagClick = (value: string) => {
    if (selectedTag !== value) {
      setSelectedTag(value)
    } else {
      setSelectedTag('')
    }
    onClickTag(value)
  }

  return (
    <>
      <TagContainer>
        {items &&
          items.map((tag, index) => (
            <Tag
              key={index}
              className={selectedTag?.includes(tag?.value) ? 'selected' : ''}
              onClick={() => handleTagClick(tag?.value)}
            >
              {tag.value} ({tag.count})
            </Tag>
          ))}
      </TagContainer>
    </>
  )
}

export { CustomTags }
