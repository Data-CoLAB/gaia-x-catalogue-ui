import { IconType } from '../type/icon.type'

const CrossIcon = ({
  width = 25,
  height = 25,
  fill = '#ECECEC',
  ...props
}: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <circle cx={12.5} cy={12.5} r={12.5} fill={fill} />
    <path
      stroke="#565655"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9.25 9.249 6.942 6.941m-6.942 0 6.942-6.941"
    />
  </svg>
)
export { CrossIcon }
