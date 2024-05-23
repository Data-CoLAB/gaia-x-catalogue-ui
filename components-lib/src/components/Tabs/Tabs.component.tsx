import * as React from 'react'
import Tab from '@mui/material/Tab'
import { StyledTabsComp, TabsProps } from './Tabs.styled'

export type CustomTabsProps = TabsProps & {
  items: string[]
  onChangeTab: (param: number) => void
  fontColor?: string
  activetabColor?: string
}

const CustomTabs = ({
  items,
  onChangeTab,
  fontColor,
  activetabColor,
}: CustomTabsProps) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    onChangeTab(newValue)
  }

  return (
    <div>
      <StyledTabsComp
        fontcolor={fontColor}
        onChange={handleChange}
        value={value}
        activetabcolor={activetabColor}
      >
        {items &&
          items.map((item: string, index: number) => (
            <Tab key={index} label={item} value={index} />
          ))}
      </StyledTabsComp>
    </div>
  )
}

export { CustomTabs }
