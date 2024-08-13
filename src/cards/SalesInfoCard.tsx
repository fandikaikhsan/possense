type SalesInfoCardProps = {
  title: string
  value: string
  color: string
}

const SalesInfoCard = ({ title, value, color }: SalesInfoCardProps) => (
  <div className="bg-gray-700 rounded-lg p-4">
    <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
    <p className={`text-lg font-bold ${color}`}>{value}</p>
  </div>
)

export default SalesInfoCard
