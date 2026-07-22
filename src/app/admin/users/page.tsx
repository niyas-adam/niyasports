"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { Users, Shield, ShieldOff, Search } from "lucide-react";

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  is_admin: boolean;
  created_at: string;
};

export default function AdminUsersPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toggling, setToggling] = useState<string | null>(null);
  const supabase = createClient();

  const fetchUsers = useCallback(async () => {
    const { data: authUsers } = await supabase.auth.admin.listUsers();
    const emailMap: Record<string, string> = {};
    if (authUsers?.users) {
      authUsers.users.forEach((u) => {
        emailMap[u.id] = u.email || "";
      });
    }

    let query = supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (search) {
      query = query.or(
        `full_name.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    const { data } = await query;
    if (data) {
      const enriched = data.map((p) => ({
        ...p,
        email: emailMap[p.id] || null,
      }));
      setProfiles(enriched);
    }
    setLoading(false);
  }, [search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleAdmin = async (profileId: string, current: boolean) => {
    setToggling(profileId);
    await supabase
      .from("profiles")
      .update({ is_admin: !current })
      .eq("id", profileId);
    setToggling(null);
    fetchUsers();
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-accent-bright" size={28} />
        <h1 className="font-anton text-3xl text-ink">Users</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-accent-bright transition text-sm"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-bright mx-auto" />
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-12 bg-surface border border-line">
          <Users className="mx-auto text-muted" size={48} />
          <p className="text-muted mt-3">No users found</p>
        </div>
      ) : (
        <div className="bg-surface border border-line overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-surface-2">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Email</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Admin</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {profiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-surface-2">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-ink">
                      {profile.full_name || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {profile.email || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleAdmin(profile.id, profile.is_admin)}
                      disabled={toggling === profile.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition ${
                        profile.is_admin
                          ? "bg-accent/20 text-accent-bright hover:bg-accent/30"
                          : "bg-surface-2 text-muted hover:text-ink"
                      }`}
                    >
                      {profile.is_admin ? (
                        <Shield size={14} />
                      ) : (
                        <ShieldOff size={14} />
                      )}
                      {profile.is_admin ? "Admin" : "User"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-muted">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
