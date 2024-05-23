import { Box, List, ListItem } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledContainer = styled(Box)`
  border: 0.5px solid ${({ theme }) => theme.palette.secondary.gray3};
  max-width: 30rem;
  padding: 2.5rem 0;
  width: fit-content;
  min-height: fit-content;
  height: calc(100vh - 11.4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const StyledList = styled(List)`
  &.MuiList-root {
    padding-top: 0;
    padding-bottom: 0;
  }
  .navItem {
    padding: 1.5rem 3rem;
    display: flex;
    gap: 1.5rem;
  }
  .navLink {
    color: ${({ theme }) => theme.palette.secondary.gray1};
    font-size: 1.8rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;

    &.active {
      color: ${({ theme }) => theme.palette.primary.purple};

      svg {
        path {
          fill: ${({ theme }) => theme.palette.primary.purple};
        }
      }
    }
    &:hover {
      color: ${({ theme }) => theme.palette.secondary.black};

      svg {
        path {
          fill: ${({ theme }) => theme.palette.secondary.black};
        }
      }
    }
  }
`
export const StyledListItem = styled(ListItem)``
