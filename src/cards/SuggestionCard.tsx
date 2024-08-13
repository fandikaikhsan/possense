import CategoryBadge from "@/commons/CategoryBadge"

type SuggestionCardProps = {
  title: string
  category: string
  description: string
  percentage: number
}

const SuggestionCard = ({
  title,
  category,
  description,
  percentage,
}: SuggestionCardProps) => {
  const colorMap: { [key: string]: string } = {
    operations: "border-blue-500",
    product: "border-green-500",
    marketing: "border-purple-500",
  }

  return (
    <div
      className={`flex-shrink-0 w-64 bg-gray-800 shadow-md rounded-lg p-4 mr-4 border-t-4 ${
        colorMap[category] || "border-gray-500"
      }`}
    >
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <CategoryBadge category={category} />
      <p className="text-sm text-gray-400 my-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-400">
          Potential Improvement
        </span>
        <span className="text-lg font-bold text-green-400">{percentage}%</span>
      </div>
    </div>
  )
}
