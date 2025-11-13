import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { BlogPost } from '../types';
import { blogPosts as staticBlogPosts } from '../data/blog';

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using static data');
        setBlogPosts(staticBlogPosts);
        setError(null);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (fetchError) {
        if (fetchError.code === 'PGRST116' || fetchError.message?.includes('table')) {
          console.warn('Blog posts table not found, using static data');
          setBlogPosts(staticBlogPosts);
          setError(null);
          setLoading(false);
          return;
        }
        throw fetchError;
      }

      // Transform database data to match BlogPost interface
      const transformedPosts: BlogPost[] = (data || []).map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        category: post.category as 'Mercado' | 'Consejos' | 'Inversión',
        date: post.created_at.split('T')[0], // Convert to YYYY-MM-DD format
        readTime: post.read_time || '5 min'
      }));

      setBlogPosts(transformedPosts);
      setError(null);
    } catch (err) {
      console.warn('Error fetching blog posts, falling back to static data:', err);
      setBlogPosts(staticBlogPosts);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const createBlogPost = async (postData: Omit<BlogPost, 'id' | 'date'>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        image: postData.image,
        category: postData.category,
        read_time: postData.readTime
      }])
      .select()
      .single();

    if (error) throw error;
    
    await fetchBlogPosts();
    return data;
  };

  const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const updateData: any = {};
    if (postData.title) updateData.title = postData.title;
    if (postData.excerpt) updateData.excerpt = postData.excerpt;
    if (postData.content) updateData.content = postData.content;
    if (postData.image) updateData.image = postData.image;
    if (postData.category) updateData.category = postData.category;
    if (postData.readTime) updateData.read_time = postData.readTime;

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    await fetchBlogPosts();
    return data;
  };

  const deleteBlogPost = async (id: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { error } = await supabase
      .from('blog_posts')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
    
    await fetchBlogPosts();
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return {
    blogPosts,
    loading,
    error,
    refetch: fetchBlogPosts,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
  };
};
