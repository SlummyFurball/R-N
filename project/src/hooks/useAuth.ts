import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Supabase is not configured, don't attempt auth
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured for authentication');
      setLoading(false);
      return;
    }

    console.log('🔐 Initializing auth...');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('📋 Initial session:', session ? 'Found' : 'None');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((error) => {
      console.error('Error getting session:', error);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('🔄 Auth state changed:', _event, session ? 'User logged in' : 'User logged out');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      return { data: null, error: { message: 'Supabase no está configurado. Verifica las variables de entorno.' } };
    }

    console.log('🚀 Attempting sign in for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    console.log('✅ Sign in result:', { 
      success: !error, 
      user: data?.user?.email,
      session: !!data?.session 
    });
    
    if (error) {
      console.error('Sign in error:', error);
    }
    
    return { data, error };
  };

  const signOut = async () => {
    console.log('👋 Signing out...');
    const { error } = await supabase.auth.signOut();
    if (!error) {
      console.log('✅ Signed out successfully');
    }
    return { error };
  };

  return {
    user,
    session,
    loading,
    signIn,
    signOut,
  };
};
