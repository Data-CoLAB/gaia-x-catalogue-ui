import { styled } from '@mui/material/styles'
import {
  AsyncPaginate,
  AsyncPaginateProps,
  withAsyncPaginate,
} from 'react-select-async-paginate'
import CreatableSelect from 'react-select/creatable'
import { GroupBase } from 'react-select'

const AsyncCreatable = withAsyncPaginate(CreatableSelect)
interface AsyncCreatableStyledProps
  extends AsyncPaginateProps<unknown, GroupBase<unknown>, unknown, boolean> {
  formatCreateLabel: (userInput: string) => string
}
const AsyncCreatableStyled = styled<
  React.ComponentType<AsyncCreatableStyledProps>
>(AsyncCreatable)`
  & > div {
    box-shadow: 0 0 0 0px ${({ theme }) => theme.palette.secondary.gray1};
    border: 0;
    border-radius: 0;
    font-family: 'Titillium Web';

    &:hover {
      border: 0;
      border-bottom: 2px solid ${({ theme }) => theme.palette.primary.purple};
    }

    &:hover + div {
      border-bottom: 0px;
    }

    &:focus {
      border-bottom: 1px solid ${({ theme }) => theme.palette.primary.purple};
    }

    .css-qvco5b-CY,
    .css-1dmcmre-C7,
    .css-art2ul-ValueContainer2 {
      padding: 2px 0px;
    }

    .css-1jqq78o-placeholder {
      font-size: 1.6rem;
    }
  }

  .css-13cymwt-control,
  .css-t3ipsp-control {
    border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.gray1};

    & > div {
      padding: 2px 0px;
    }

    .css-1p3m7a8-multiValue {
      border-radius: 0.4rem;
      background: ${({ theme }) => theme.palette.secondary.gray4};
      font-size: 1.8rem;
      font-weight: normal;
    }
  }
`

const AsyncSearchSelectStyled = styled(AsyncPaginate)`
  & > div {
    box-shadow: 0 0 0 0px ${({ theme }) => theme.palette.secondary.gray1};
    border: 0;
    border-radius: 0;
    font-family: 'Titillium Web';

    &:hover {
      border: 0;
      border-bottom: 2px solid ${({ theme }) => theme.palette.primary.purple};
    }

    &:hover + div {
      border-bottom: 0px;
    }

    &:focus {
      border-bottom: 1px solid ${({ theme }) => theme.palette.primary.purple};
    }

    .css-qvco5b-CY,
    .css-1dmcmre-C7,
    .css-art2ul-ValueContainer2 {
      padding: 2px 0px;
    }

    .css-1jqq78o-placeholder {
      font-size: 1.6rem;
      margin-left: 0px;
    }
  }

  .css-13cymwt-control,
  .css-t3ipsp-control {
    border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.gray1};

    & > div {
      padding: 2px 0px;
    }

    .css-hlgwow {
      padding: 2px 0;
    }

    & > div {
      /* padding: 2px 0px; */
    }

    .css-1p3m7a8-multiValue {
      border-radius: 0.4rem;
      background: ${({ theme }) => theme.palette.secondary.gray4};
      font-size: 1.8rem;
      font-weight: normal;
    }
  }
` as typeof AsyncPaginate
const AsyncSearchSelectContainerStyled = styled('div')`
  position: relative;
`

const AsyncSearchSelectLabelStyled = styled('label')`
  background: transparent;
  position: absolute;
  top: 0;
  z-index: 999;
  transform: translate(0, -1.5px) scale(0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 2rem;
  z-index: 999;
  padding: 0.3rem 0.7rem 0.3rem 0rem;
  display: none;
  left: -12.5%;
  width: 100%;
`

const CustomOptionStyled = styled('div')`
  button {
    border: 0;
    border-bottom: 0.1rem solid #ececec;
    color: #565655;
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    padding: 1rem;
    width: 100%;
    cursor: pointer;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 600;
  }
`
const StyledValueContainer = styled('div')`
  border-radius: 1.45rem;
  color: ${({ theme }) => theme.palette.secondary.white};
  background: ${({ theme }) => theme.palette.primary.mediumGreen};
  font-size: 1.6rem;
  font-weight: 600;
  height: 2.9rem;
  padding: 0.2rem 1.6rem;
`
const StyleOptionContainer = styled('div')`
  display: flex;
  gap: 2rem;
  color: ${({ theme }) => theme.palette.secondary.gray1};
  font-size: 1.6rem;
  font-weight: 400;
`
export {
  AsyncSearchSelectContainerStyled,
  AsyncSearchSelectLabelStyled,
  AsyncSearchSelectStyled,
  CustomOptionStyled,
  AsyncCreatableStyled,
  StyledValueContainer,
  StyleOptionContainer,
}
export type { AsyncPaginateProps }
