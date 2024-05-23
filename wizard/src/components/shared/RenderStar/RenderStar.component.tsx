import {
  StarBorderOutlinedIcon,
  StarIcon,
} from '@gaia-x-frontend/components-lib'

const RenderStar = ({ level }: { level: string }) => {
  const maxLevel = 3
  const serviceLevel = parseInt(level?.charAt(1))
  return Array.from({ length: maxLevel }, (_, index) => (
    <div key={index}>
      {serviceLevel >= index + 1 ? (
        <StarIcon />
      ) : (
        <StarBorderOutlinedIcon sx={{ fontSize: '2.2rem', color: '#f5d14f' }} />
      )}
    </div>
  ))
}
export { RenderStar }
