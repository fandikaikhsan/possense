import DashboardContainer from "@/containers/DashboardContainer"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-900 flex-col items-center justify-between p-5 lg:p-10">
      <DashboardContainer />
    </div>
  )
}
