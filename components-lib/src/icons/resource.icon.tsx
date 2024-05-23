import { IconType } from '../type/icon.type'

const ResourceIcon = ({
  width = 24,
  height = 24,
  fill = '#565655',
  ...props
}: IconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <path
      fill={fill}
      d="M7 20V8.973c0-.55.2-1.016.6-1.4A1.99 1.99 0 0 1 9.025 7H20c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v8l-5 5H9c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 0 1 7 19.999ZM2.025 6.25c-.1-.55.008-1.047.325-1.488.317-.442.75-.713 1.3-.813L14.5 2.024c.55-.1 1.046.009 1.488.325.441.317.712.75.812 1.3L17.05 5H15l-.175-1L4 5.924l1 5.65v6.975a2.25 2.25 0 0 1-.688-.6 1.849 1.849 0 0 1-.362-.85L2.025 6.25ZM9 9v11h7v-4h4V9H9Z"
    />
  </svg>
)
export { ResourceIcon }
