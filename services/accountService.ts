import { supabase } from '@/lib/supabase/client';

export async function exportUserData(userId: string) {
  try {
    // Fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    // Fetch user's reviews
    const { data: reviews } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', userId);

    // Fetch user's settings
    const { data: settings } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId);

    // Compile data into a structured format
    const exportData = {
      profile,
      reviews,
      settings,
      exportDate: new Date().toISOString()
    };

    // Convert to JSON and create blob
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });

    // Create download URL
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `account-data-${new Date().toISOString().split('T')[0]}.json`;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error('Error exporting data:', error);
    return { 
      success: false, 
      error: 'Failed to export data. Please try again.' 
    };
  }
}

export async function deleteAccount(userId: string) {
  try {
    // Delete user's data from various tables
    await supabase.from('reviews').delete().eq('user_id', userId);
    await supabase.from('user_settings').delete().eq('user_id', userId);
    await supabase.from('profiles').delete().eq('id', userId);

    // Delete auth user
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting account:', error);
    return { 
      success: false, 
      error: 'Failed to delete account. Please try again.' 
    };
  }
}