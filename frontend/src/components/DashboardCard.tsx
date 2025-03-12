import { Link } from "react-router-dom"

interface DashboardCardProps {
  title: string
  description: string
  link: string
}

export default function DashboardCard({ title, description, link }: DashboardCardProps) {
  return (
    <Link to={link} className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold text-blue-600 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  )
}

