import { StyledSkeleton } from './Skeleton.styled'
import { SkeletonProps } from '@mui/material'

const Skeleton = ({ ...props }: SkeletonProps) => {
  return <StyledSkeleton {...props} />
}

export { Skeleton }
