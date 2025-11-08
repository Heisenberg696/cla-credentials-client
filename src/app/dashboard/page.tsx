"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  User,
  Mail,
  Building2,
  MapPin,
  Phone,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AuthService } from "@/utils/auth";
import { User as UserType } from "@/types/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = AuthService.getUser();
    const token = AuthService.getToken();

    console.log("Fetched user data:", userData);
    console.log("Fetched token:", token);

    if (!userData || !token) {
      router.push("/login");
      return;
    }

    setUser(userData);
    setLoading(false);
  }, [router]);

  const handleLogout = async () => {
    await AuthService.logout();
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1f2e]">
        <div className="text-lg text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1f2e]">
        <div className="text-lg text-white">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1f2e] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-[#2a303c] shadow-xl rounded-lg mb-6">
          <div className="px-6 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-400">
                  Welcome back, {user.first_name}!
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Information Card */}
          <div className="bg-[#2a303c] shadow-xl rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-[#4a9eff]" />
                User Information
              </h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">Full Name</p>
                  <p className="text-base text-white font-medium">
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">Email</p>
                  <p className="text-base text-white font-medium">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">User Type</p>
                  <p className="text-base text-white font-medium">
                    {user.user_type}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 mt-0.5 flex items-center justify-center">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      user.completed_onboarding ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">
                    Onboarding Status
                  </p>
                  <p
                    className={`text-base font-semibold ${
                      user.completed_onboarding
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {user.completed_onboarding ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* University Information Card */}
          <div className="bg-[#2a303c] shadow-xl rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#4a9eff]" />
                University Information
              </h2>
            </div>
            <div className="px-6 py-5">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-20 w-20 rounded-lg object-cover ring-2 ring-[#4a9eff]"
                    src={user.university.avatar}
                    alt={`${user.university.name} logo`}
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMmEzMDNjIi8+CjxwYXRoIGQ9Ik0yNSAyNUg1NVY1NUgyNVYyNVoiIGZpbGw9IiM0YTllZmYiLz4KPC9zdmc+";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">
                    Institution
                  </p>
                  <p className="text-lg text-white font-semibold">
                    {user.university.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400">
                      Location
                    </p>
                    <p className="text-base text-white font-medium">
                      {user.university.city}, {user.university.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400">Phone</p>
                    <p className="text-base text-white font-medium">
                      {user.university.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400">Website</p>
                    <a
                      href={user.university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-[#4a9eff] hover:text-[#3a8eef] font-medium underline transition-colors"
                    >
                      {user.university.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Panel */}
        <div className="mt-6 bg-[#2a303c] shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-xl font-semibold text-white">
                Debug Information
              </h2>
              <span className="text-gray-400">
                {showDebug ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </span>
            </button>
          </div>

          {showDebug && (
            <div className="px-6 py-5">
              <div className="bg-[#1a1f2e] rounded-lg p-4 overflow-auto max-h-96">
                <pre className="text-sm text-green-400 font-mono">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
