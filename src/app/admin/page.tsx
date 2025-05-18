import { usePortfolio } from '@/lib/context/PortfolioContext';

export default function AdminDashboard() {
  const { portfolioData, logout } = usePortfolio();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Personal Info</h3>
            <p className="mt-1 text-sm text-gray-500">
              {portfolioData.personalInfo.name}
            </p>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Experiences</h3>
            <p className="mt-1 text-sm text-gray-500">
              {portfolioData.experiences.length} items
            </p>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Projects</h3>
            <p className="mt-1 text-sm text-gray-500">
              {portfolioData.projects.length} items
            </p>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Skills</h3>
            <p className="mt-1 text-sm text-gray-500">
              {portfolioData.skills.length} items
            </p>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Education</h3>
            <p className="mt-1 text-sm text-gray-500">
              {portfolioData.education.length} items
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 