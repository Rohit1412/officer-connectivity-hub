import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Officer, Device, Analytics, StreamConnection } from '@/types';

export const useOfficers = () => {
  return useQuery({
    queryKey: ['officers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('officers')
        .select('*');
      
      if (error) throw error;
      return data as Officer[];
    },
  });
};

export const useDevices = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('devices')
        .select('*');
      
      if (error) throw error;
      return data as Device[];
    },
  });
};

export const useStreamConnections = () => {
  return useQuery({
    queryKey: ['stream_connections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stream_connections')
        .select('*');
      
      if (error) throw error;
      return data as StreamConnection[];
    },
  });
};

export const useAddDevice = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (device: Omit<Device, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('devices')
        .insert(device)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};

export const useAddStreamConnection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (connection: Omit<StreamConnection, 'id'>) => {
      const { data, error } = await supabase
        .from('stream_connections')
        .insert(connection)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stream_connections'] });
    },
  });
};

export const useUpdateDeviceStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Device['status'] }) => {
      const { data, error } = await supabase
        .from('devices')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};

export const useAddAnalytics = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (analytics: Omit<Analytics, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('analytics')
        .insert(analytics)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};