import { IconType } from '../type/icon.type'

const AddMoreIcon = ({
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
      d="M12.72 7.811v9.817M7.813 12.72h9.817"
    />
  </svg>
)

export { AddMoreIcon }
