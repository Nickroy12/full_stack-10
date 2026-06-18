import { getUserSession } from "@/lib/core/sessions";
import { Mail, User, Calendar } from "lucide-react";
import Image from "next/image";

const ProfilePage = async () => {
  const user = await getUserSession();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* Cover */}
          <div className="h-40 bg-gradient-to-r from-green-500 to-green-600"></div>

          {/* Profile Header */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
              <Image
                src={
                  user?.image ||
                  "https://ui-avatars.com/api/?name=User&background=random"
                }
                height={140} width={140}
                alt={user?.name}
                className=" rounded-full border-4 border-white object-cover bg-white"
              />

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800">
                  {user?.name || "Unknown User"}
                </h1>

                <p className="text-gray-500 mt-1">
                  {user?.email}
                </p>

                <span className="inline-block mt-3 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                  Active User
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid md:grid-cols-2 gap-6 p-8 border-t">
            
            {/* Personal Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-5">
                Personal Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <User size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-5">
                Account Overview
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-green-600 font-medium">
                    Active
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Email Verified</span>
                  <span
                    className={`font-medium ${
                      user?.emailVerified
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {user?.emailVerified
                      ? "Verified"
                      : "Not Verified"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>User ID</span>
                  <span className="font-medium">
                    {user?.id?.slice(0, 8)}...
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 p-8 border-t">
            <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Edit Profile
            </button>

            <button className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              Change Password
            </button>

            <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;