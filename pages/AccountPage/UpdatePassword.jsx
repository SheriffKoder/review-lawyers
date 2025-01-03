import React, { useState } from "react";
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { Button } from '@/components/ui/Button';
import { AlertCircle } from "lucide-react";
import { auth } from "@/firebase/firebase";

const UpdatePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // const auth = getAuth();
  

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setError("No user is currently signed in.");
      return;
    }

    try {
      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the user's password
      await updatePassword(user, newPassword);
      setSuccess("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      // console.log(error.message.split("auth/")[1])
      setError(error.message.split("auth/")[1].slice(0,-2));
    }
  };

  return (
    <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div>
                <label className="block font-medium text-gray-400 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border text-sm  border-white/10 text-white"
                  placeholder="Confirm your current password"
                />
              </div>

              <div>
                <label className="block  font-medium text-gray-400 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border text-sm border-white/10 text-white"
                  placeholder="Enter the new password"
                />
              </div>

              <div>
                <label className="block  font-medium text-gray-400 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border text-sm border-white/10 text-white"
                  placeholder="Re-enter the new password"
                />
              </div>

              {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                  <p>{error}</p>
                  </div>
                </div>
              )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-green-500">
                <AlertCircle className="w-5 h-5" />
                <p>{success}</p>
                </div>
              </div>
            )}

            {/* {success && <p className="text-green-500 mt-2">{success}</p>} */}


            <Button
              type="submit"
              className="">
              Update Password
            </Button>
    </form>
  );
};

export default UpdatePasswordForm;
