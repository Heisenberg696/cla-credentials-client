"use client";

import { useState } from "react";
import { AuthService } from "@/utils/auth";
import { User } from "@/types/auth";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [showDebug, setShowDebug] = useState(false);
  const user: User = AuthService.getUser();

  const handleLogout = async () => {
    await AuthService.logout();
    onLogout();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  User Information
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">
                        Full Name:
                      </span>
                      <span className="ml-2 text-gray-900">
                        {user.first_name} {user.last_name}
                      </span>
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-2 text-gray-900">{user.email}</span>
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">
                        User Type:
                      </span>
                      <span className="ml-2 text-gray-900">
                        {user.user_type}
                      </span>
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">
                        Completed Onboarding:
                      </span>
                      <span
                        className={`ml-2 font-medium ${
                          user.completed_onboarding
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {user.completed_onboarding ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  University Information
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-16 rounded-lg object-cover"
                        src={user.university.avatar}
                        alt={`${user.university.name} logo`}
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+";
                        }}
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div>
                        <span className="font-medium text-gray-700">Name:</span>
                        <span className="ml-2 text-gray-900">
                          {user.university.name}
                        </span>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700">
                          Location:
                        </span>
                        <span className="ml-2 text-gray-900">
                          {user.university.city}, {user.university.country}
                        </span>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700">
                          Phone:
                        </span>
                        <span className="ml-2 text-gray-900">
                          {user.university.phone}
                        </span>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700">
                          Website:
                        </span>
                        <a
                          href={user.university.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-indigo-600 hover:text-indigo-800 underline"
                        >
                          {user.university.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Debug Information
                </h2>
                <button
                  onClick={() => setShowDebug(!showDebug)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
                >
                  {showDebug ? "Hide" : "Show"} Debug Panel
                </button>
              </div>

              {showDebug && (
                <div className="mt-4 bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto">
                  <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
