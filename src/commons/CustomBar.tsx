type CustomBarProps = {
  x: number
  y: number
  width: number
  height: number
  hasSuggestion: boolean
}

type BulbIconProps = {
  x: number
  y: number
  width: number
  height: number
}

const BulbIcon = ({ x, y, width, height }: BulbIconProps) => (
  <svg
    x={x}
    y={y}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="yellow"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
  </svg>
)

const CustomBar = (props: CustomBarProps) => {
  const { x, y, width, height, hasSuggestion } = props
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="#10B981" />
      {hasSuggestion && (
        <BulbIcon x={x + width - 12} y={y - 12} width={24} height={24} />
      )}
    </g>
  )
}

export default CustomBar
