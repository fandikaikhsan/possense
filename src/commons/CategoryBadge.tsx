type CategoryBadgeProps = {
  category: string
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const colorMap: { [key: string]: string } = {
    operations: "bg-blue-500",
    product: "bg-green-500",
    marketing: "bg-purple-500",
  }

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        colorMap[category] || "bg-gray-500"
      } text-white`}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </div>
  )
}

export default CategoryBadge
