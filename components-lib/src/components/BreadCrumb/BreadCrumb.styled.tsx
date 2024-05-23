import { styled } from '@mui/material/styles'
import Breadcrumbs from '@mui/material/Breadcrumbs'

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  font-weight: 400;
  font-size: 2rem;

  .activeNavigation {
    color: ${({ theme }) => theme.palette.primary.mediumGreen};
  }

  .previousNavigation {
    color: ${({ theme }) => theme.palette.secondary.black};

    &:hover {
      text-decoration: none;
      cursor: pointer;
    }
  }
  .MuiBreadcrumbs-separator {
    color: ${({ theme }) => theme.palette.secondary.black};
  }
`
