import { IconType } from '../type/icon.type'

const CloseIcon = ({
  width = 18,
  height = 19,
  fill = '#ECECEC',
  ...props
}: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 18 19"
    fill="none"
    {...props}
  >
    <path
      d="M2.01904 2L16.4638 16.7481"
      stroke={fill}
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M1.46387 17L15.9086 2.2519"
      stroke={fill}
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
)
export { CloseIcon }
