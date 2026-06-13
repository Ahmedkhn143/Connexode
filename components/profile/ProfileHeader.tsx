"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BadgeCheck, Calendar, Flame, Edit2, X, Globe } from "lucide-react";
import { type User, type Track } from "@/lib/mock-data";
import { cleanImageUrl } from "@/lib/utils";

interface ProfileHeaderProps {
  user: User;
  track: Track;
}

// Custom inline GitHub and LinkedIn icons
const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ProfileHeader({ user, track }: ProfileHeaderProps) {
  const [activeUser, setActiveUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAmbassador, setIsAmbassador] = useState(false);

  // Form States
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");
  const [avatarImage, setAvatarImage] = useState((user as any).avatarImage || "");
  const [githubUrl, setGithubUrl] = useState(user.githubUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(user.linkedinUrl || "");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      // Check if ambassador
      const emailToCheck = user.email || "";
      if (emailToCheck) {
        const storedApps = localStorage.getItem("connexode_ambassador_applications");
        if (storedApps) {
          try {
            const apps = JSON.parse(storedApps);
            const userApp = apps.find((a: any) => a.email.toLowerCase() === emailToCheck.toLowerCase());
            if (userApp && userApp.status === "APPROVED") {
              setIsAmbassador(true);
            }
          } catch (e) {
            console.error(e);
          }
        }
      }

      const activeId = localStorage.getItem("connexode_active_user");
      if (activeId && activeId === user.id) {
        // Load latest saved state if available in dynamic users
        const dynamicUsersRaw = localStorage.getItem("connexode_dynamic_users");
        if (dynamicUsersRaw) {
          try {
            const dynamicUsers = JSON.parse(dynamicUsersRaw);
            const found = dynamicUsers.find((u: any) => u.id === user.id);
            if (found) {
              setActiveUser(found);
              setName(found.name);
              setBio(found.bio || "");
              setAvatarImage(found.avatarImage || "");
              setGithubUrl(found.githubUrl || "");
              setLinkedinUrl(found.linkedinUrl || "");
              return;
            }
          } catch (e) {}
        }
        setActiveUser(user);
      }
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const dynamicUsers = JSON.parse(localStorage.getItem("connexode_dynamic_users") || "[]");
    const existsIndex = dynamicUsers.findIndex((u: any) => u.id === user.id);

    const updatedUser = {
      ...user,
      name: name.trim(),
      bio: bio.trim(),
      githubUrl: githubUrl.trim(),
      linkedinUrl: linkedinUrl.trim(),
      avatarImage: cleanImageUrl(avatarImage),
      avatarInitials: name.trim().substring(0, 2).toUpperCase(),
    };

    if (existsIndex !== -1) {
      dynamicUsers[existsIndex] = updatedUser;
    } else {
      dynamicUsers.push(updatedUser);
    }

    localStorage.setItem("connexode_dynamic_users", JSON.stringify(dynamicUsers));
    alert("Profile updated successfully!");
    setIsEditing(false);
    window.location.reload();
  };

  const joinDate = new Date(user.joinDate || new Date()).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const displayUser = activeUser || user;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-8 backdrop-blur-xl animate-fade-in">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${track.color}30 0%, transparent 60%)`,
        }}
      />

      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {/* Avatar */}
        <div className="relative shrink-0">
          {displayUser.avatarImage ? (
            <img
              src={displayUser.avatarImage}
              alt={displayUser.name}
              className="h-24 w-24 rounded-3xl object-cover border border-white/10"
              style={{
                boxShadow: `0 0 40px ${track.color}40`,
              }}
            />
          ) : (
            <div
              className="flex h-24 w-24 items-center justify-center rounded-3xl text-3xl font-extrabold text-[#020B18]"
              style={{
                background: `linear-gradient(135deg, ${track.color}, ${track.color}88)`,
                boxShadow: `0 0 40px ${track.color}40`,
              }}
            >
              {displayUser.avatarInitials}
            </div>
          )}
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-[#020B18] bg-emerald-400" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-extrabold text-white">{displayUser.name}</h1>
            {isAmbassador ? (
              <div className="flex items-center gap-1.5 rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                <BadgeCheck size={12} />
                Campus Ambassador
              </div>
            ) : (
              <div className="flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                <BadgeCheck size={12} />
                Verified Intern
              </div>
            )}
            {activeUser && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-2xs font-extrabold text-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer"
              >
                <Edit2 size={10} />
                Edit Profile
              </button>
            )}
          </div>

          <p className="mb-2.5 text-slate-500">@{displayUser.username}</p>
          
          {displayUser.bio && (
            <p className="mb-4 text-xs text-slate-400 max-w-xl leading-relaxed">{displayUser.bio}</p>
          )}

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: isAmbassador ? "#EAB308" : track.color }}
              />
              {isAmbassador ? "Campus Ambassador Program" : track.title}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              Joined {joinDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Flame size={13} className="text-orange-400" />
              {displayUser.streak} day streak
            </span>
          </div>

          {/* Social Links on Header */}
          {(displayUser.githubUrl || displayUser.linkedinUrl) && (
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
              {displayUser.githubUrl && (
                <a href={displayUser.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <GithubIcon size={12} /> GitHub
                </a>
              )}
              {displayUser.linkedinUrl && (
                <a href={displayUser.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  <LinkedinIcon size={12} /> LinkedIn
                </a>
              )}
            </div>
          )}
        </div>

        {/* Points */}
        <div className="flex flex-col items-end gap-1 text-right self-stretch sm:self-center justify-center">
          <p className="font-display text-4xl font-extrabold text-white">
            {displayUser.points.toLocaleString()}
          </p>
          <p className="text-sm text-slate-500">total points</p>
          <p
            className="text-sm font-bold"
            style={{ color: track.color }}
          >
            {displayUser.rank}
          </p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && mounted && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950">
              <h3 className="text-sm font-bold text-white">Edit Profile Details</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-lg bg-white/5 p-1 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs text-slate-300 overflow-y-auto max-h-[75vh]">
              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">Profile Picture (Max 1MB)</label>
                <div className="flex items-center gap-3 mb-2">
                  {avatarImage && (
                    <img src={avatarImage} alt="Preview" className="h-10 w-10 rounded-xl object-cover border border-white/10" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 1024 * 1024) {
                        alert("Profile picture size must be less than 1MB");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setAvatarImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-2xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 file:cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={avatarImage}
                  onChange={(e) => setAvatarImage(cleanImageUrl(e.target.value))}
                  placeholder="Or paste a profile image URL..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">Bio / Description</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell others about yourself..."
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">GitHub Profile Link</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">LinkedIn Profile Link</label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-cyan-400/40"
                />
              </div>

              {/* Dynamic Program / Track Display */}
              {isAmbassador ? (
                <div className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">Active Program (Read-Only)</label>
                    <div className="w-full rounded-xl border border-yellow-500/25 bg-yellow-500/10 py-2.5 px-3 text-xs text-yellow-400 font-semibold select-none flex items-center justify-between">
                      <span>Campus Ambassador Program</span>
                      <span className="text-[9px] font-black uppercase text-yellow-400 tracking-wider">Active</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="mb-1.5 block text-2xs font-semibold uppercase tracking-wider text-slate-400">Enrolled Internship Track (Read-Only)</label>
                  <div className="w-full rounded-xl border border-white/5 bg-white/3 py-2.5 px-3 text-xs text-slate-500 font-semibold select-none flex items-center justify-between">
                    <span>{track.title}</span>
                    <span className="text-[9px] font-black uppercase text-red-400/60 tracking-wider">Locked</span>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-xs font-bold text-[#020B18] shadow hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
