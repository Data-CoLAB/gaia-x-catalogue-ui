/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { TabsProps } from '@mui/material/Tabs'

const TagContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
const Tag = styled(Container)`
  width: auto;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.palette.primary.mediumGreen};
  color: ${({ theme }) => theme.palette.primary.mediumGreen};
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 14px;
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.mediumGreen};
    color: white;
    border-color: ${({ theme }) => theme.palette.primary.mediumGreen};
  }

  &.selected {
    background-color: ${({ theme }) => theme.palette.primary.mediumGreen};
    color: white;
    border-color: ${({ theme }) => theme.palette.primary.mediumGreen};
  }
`

export { Tag, TagContainer }
export type { TabsProps }
