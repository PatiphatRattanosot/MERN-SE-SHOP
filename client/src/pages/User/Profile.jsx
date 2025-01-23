import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          {/* Left Side: Profile Information */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Your Profile</h1>
            <p className="py-6">
              View and update your profile information here.
            </p>

            <div className="flex justify-center lg:justify-start">
              {/* Profile Picture */}
              <div className="avatar">
                <div className="w-24 h-24 rounded-full">
                  <img src={user?.photoURL} alt="Profile" />
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Full Name</h2>
              <p className="text-gray-600">{user?.displayName}</p>

              <h2 className="text-xl font-semibold mt-4">Email</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            {/* Edit Profile Button */}
            <div className="form-control mt-6">
              <a href="/profile/setting" className="btn btn-primary">
                Edit Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
