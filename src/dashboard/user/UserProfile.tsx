import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { updateUserProfile } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import { updateProfile } from "@/redux/slices/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [shippingAddress, setShippingAddress] = useState(
    user?.shippingAddress || "",
  );

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.id) {
      toast.error("User not found. Please log in again.");
      return;
    }

    try {
      const updatedUser = await dispatch(
        updateUserProfile({
          userId: user.id,
          name,
          image,
          shippingAddress,
        }),
      ).unwrap();

      // Update redux state with new user info
      dispatch(updateProfile(updatedUser));

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        My Profile
      </h2>

      {user?.image && (
        <div className="mb-4 text-center">
          <img
            src={user.image}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full object-cover"
          />
        </div>
      )}

      <form onSubmit={handleUpdateProfile} className="space-y-5">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium">
            Name
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium">
            Email
          </label>
          <input
            type="email"
            className="w-full p-3 border rounded cursor-not-allowed bg-gray-100"
            value={user?.email || ""}
            disabled
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium">
            Image URL
          </label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 border rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium">
            Shipping Address
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            placeholder="Add your shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
