type MetricItemProps = {
  title: string
  value: string
  change: number
}

const MetricItem = ({ title, value, change }: MetricItemProps) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-400">{title}</span>
    <span className="text-2xl font-bold text-white">{value}</span>
    <span
      className={`text-sm ${change >= 0 ? "text-green-400" : "text-red-400"}`}
    >
      {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
    </span>
  </div>
)

export default MetricItem
