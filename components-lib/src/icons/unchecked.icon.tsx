import { IconType } from '../type/icon.type'
const UnCheckedIcon = ({
  width = 20,
  height = 21,
  fill = '#B1B2B2',
  ...props
}: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <rect width={19} height={18.871} x={0.5} y={1.074} stroke={fill} rx={1.5} />
  </svg>
)
export { UnCheckedIcon }
