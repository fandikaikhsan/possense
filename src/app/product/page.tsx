import ProductContainer from "@/containers/ProductContainer"

export default function Product() {
  return (
    <div className="flex min-h-screen bg-gray-900 flex-col items-center justify-between p-5 lg:p-10">
      <ProductContainer />
    </div>
  )
}
