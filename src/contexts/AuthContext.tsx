import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

type Profile = {
  id: string;
  full_name?: string | null;
  avatar_url?: string | null;
  email?: string | null;
  created_at?: string | null;
  points?: number;
};

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (changes: Partial<Profile>) => Promise<Profile | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", uid)
        .maybeSingle(); // safe when no row exists
      if (error) {
        console.error("fetchProfile supabase error:", error);
        return null;
      }
      return (data as Profile | null) ?? null;
    } catch (err) {
      console.error("fetchProfile exception:", err);
      return null;
    }
  };

  const ensureProfileExists = async (u: User) => {
    try {
      const existing = await fetchProfile(u.id);
      if (existing) {
        setProfile(existing);
        return existing;
      }

      const newProfile: Partial<Profile> = {
        id: u.id,
        email: u.email ?? null,
        full_name: (u.user_metadata as any)?.full_name ?? null,
        avatar_url: (u.user_metadata as any)?.avatar_url ?? null,
      };

      const { data, error } = await supabase
        .from("profiles")
        .upsert(newProfile)
        .select()
        .maybeSingle();

      if (error) {
        console.error("ensureProfileExists upsert error:", error);
        const fetched = await fetchProfile(u.id);
        setProfile(fetched);
        return fetched;
      }

      const result = (data as Profile | null) ?? null;
      setProfile(result);
      return result;
    } catch (err) {
      console.error("ensureProfileExists exception:", err);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;
    let subscription: { subscription: { unsubscribe: () => void } } | null = null;

    const init = async () => {
      setLoading(true);
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        setSession(currentSession ?? null);
        const currentUser = currentSession?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await ensureProfileExists(currentUser);
        } else {
          setProfile(null);
        }

        const { data: listener } = supabase.auth.onAuthStateChange(async (_event, sessionPayload) => {
          const u = sessionPayload?.user ?? null;
          setSession(sessionPayload ?? null);
          setUser(u);
          if (u) {
            await ensureProfileExists(u);
          } else {
            setProfile(null);
          }
        });

        subscription = listener;
      } catch (err) {
        console.error("Auth init error:", err);
        toast({
          title: "Auth initialization failed",
          description: (err as any)?.message ?? String(err),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
      try {
        subscription?.subscription.unsubscribe();
      } catch {
        // ignore unsubscribe errors
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (err) {
      console.error("signOut error:", err);
      toast({
        title: "Sign out failed",
        description: (err as any)?.message ?? String(err),
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (changes: Partial<Profile>) => {
    if (!user) return null;
    try {
      const payload = { ...changes, id: user.id };
      const { data, error } = await supabase
        .from("profiles")
        .upsert(payload)
        .select()
        .maybeSingle();

      if (error) {
        console.error("updateProfile supabase error:", error);
        toast({
          title: "Profile update failed",
          description: (error as any)?.message ?? String(error),
          variant: "destructive",
        });
        return null;
      }

      const result = (data as Profile | null) ?? null;
      setProfile(result);
      toast({ title: "Profile updated", description: "Your profile was saved." });
      return result;
    } catch (err) {
      console.error("updateProfile exception:", err);
      toast({
        title: "Profile update error",
        description: (err as any)?.message ?? String(err),
        variant: "destructive",
      });
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};