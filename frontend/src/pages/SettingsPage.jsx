import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {
  Settings, User, Lock, Trash2, ArrowLeft, Camera, AlertTriangle,
  Eye, EyeOff, Loader2, Save,
} from "lucide-react";

// Truncates long emails as: localprefix...@domain.com
function truncateEmail(email) {
  if (!email) return "";
  const atIdx = email.lastIndexOf("@");
  if (atIdx === -1) return email;
  const local = email.slice(0, atIdx);
  const domain = email.slice(atIdx); // includes the @
  if (local.length <= 12) return email;
  return local.slice(0, 10) + "..." + domain;
}

function SettingsPage() {
  const { authUser, updateProfile, logout } = useAuthStore();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      await updateProfile({ fullName });
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setIsUpdatingProfile(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await updateProfile({ profilePic: reader.result });
        setSelectedImg(reader.result);
        toast.success("Profile picture updated");
      } catch (error) {
        toast.error("Failed to update profile picture");
      } finally {
        setIsUpdatingProfile(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsChangingPassword(true);
    try {
      const res = await axiosInstance.put("/api/auth/change-password", {
        currentPassword,
        newPassword,
      });
      toast.success(res.data.message || "Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete("/api/auth/delete-account");
      toast.success("Account deleted");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/inbox")}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
          <h1 className="text-xl font-semibold text-slate-200">Settings</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">

        {/* PROFILE SECTION */}
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-6">
            <User className="size-5 text-cyan-400" />
            <h2 className="text-lg font-medium text-slate-200">Profile</h2>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative group">
              <div className="size-20 rounded-full overflow-hidden">
                <img
                  src={selectedImg || authUser?.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-full object-cover"
                />
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                <Camera className="size-6 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <p className="text-slate-200 font-medium">{authUser?.fullName}</p>
              <p className="text-slate-400 text-sm" title={authUser?.email}>{truncateEmail(authUser?.email)}</p>
            </div>
          </div>

          {/* Full Name Input */}
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4 text-slate-200"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={authUser?.email || ""}
                disabled
                className="w-full bg-slate-800/20 border border-slate-700/30 rounded-lg py-2 px-4 text-slate-500 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
            </div>
            <button
              type="submit"
              disabled={isUpdatingProfile || fullName === authUser?.fullName}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-6 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUpdatingProfile ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {isUpdatingProfile ? "Saving..." : "Save"}
            </button>
          </form>
        </div>

        {/* SECURITY SECTION */}
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="size-5 text-cyan-400" />
            <h2 className="text-lg font-medium text-slate-200">Security</h2>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPwd ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4 text-slate-200 pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showCurrentPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPwd ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4 text-slate-200 pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPwd(!showNewPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showNewPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4 text-slate-200 pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showConfirmPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-6 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isChangingPassword ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Lock className="size-4" />
              )}
              {isChangingPassword ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>

        {/* DANGER ZONE SECTION */}
        <div className="bg-red-900/10 rounded-xl p-6 border border-red-800/30">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="size-5 text-red-400" />
            <h2 className="text-lg font-medium text-red-400">Danger Zone</h2>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Once you delete your account, there is no going back. All your messages will be permanently deleted.
          </p>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg px-6 py-2 font-medium hover:bg-red-600/30 transition-all flex items-center gap-2"
          >
            <Trash2 className="size-4" />
            Delete Account
          </button>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-md mx-4 border border-red-800/30">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="size-6 text-red-400" />
              <h3 className="text-lg font-semibold text-slate-200">Delete Account?</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              This will permanently delete your account and all your messages. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-slate-300 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
