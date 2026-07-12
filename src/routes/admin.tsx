import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, LogOut, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

const iconOptions = ['Droplets', 'Waves', 'Sun', 'CircleDot'];
const ADMIN_PASSWORD = 'Admin@123';

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid password! Use: Admin@123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <p className="text-sm text-muted-foreground">Default password: Admin@123</p>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const fetchServices = async () => {
    setLoading(true);
    setDebugInfo('Fetching services...');
    
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Fetch Error:', error);
        setDebugInfo(`Fetch Error: ${error.message}`);
        setServices([]);
      } else {
        console.log('✅ Fetched services:', data);
        setDebugInfo(`Successfully fetched ${data?.length || 0} services`);
        setServices(data || []);
      }
    } catch (err: any) {
      console.error('❌ Unexpected error:', err);
      setDebugInfo(`Unexpected error: ${err.message}`);
      setServices([]);
    }
    
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    setDebugInfo(`Deleting service with ID: ${id}`);
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('❌ Delete Error:', error);
        setDebugInfo(`Delete Error: ${error.message}`);
        alert(`Delete failed: ${error.message}`);
      } else {
        console.log('✅ Delete successful');
        setDebugInfo('Service deleted successfully');
        fetchServices(); // Refresh the list
      }
    } catch (err: any) {
      console.error('❌ Delete Error:', err);
      setDebugInfo(`Delete Error: ${err.message}`);
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingService(null);
  };

  const handleSaveSuccess = () => {
    setIsDialogOpen(false);
    setEditingService(null);
    fetchServices();
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Debug Panel */}
      <div className="max-w-7xl mx-auto mb-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-bold text-lg mb-2">Debug Info:</h3>
            <p className="font-mono text-sm bg-gray-100 p-2 rounded">
              {debugInfo || 'No debug info'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={fetchServices} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="destructive" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-end mb-6">
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        {/* Services List */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No services found</p>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Service
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const truncatedDescription = service.description ? 
                service.description.split(' ').slice(0, 50).join(' ') + 
                (service.description.split(' ').length > 50 ? '...' : '') : '';
              const needsReadMore = service.description && service.description.split(' ').length > 50;
              
              return (
                <Card key={service.id} className="h-80 flex flex-col">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 line-clamp-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          ID: {service.id}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEdit(service)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(service.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1 mb-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {truncatedDescription}
                        {needsReadMore && (
                          <button 
                            onClick={() => handleEdit(service)}
                            className="ml-1 text-primary hover:underline font-medium"
                          >
                            Read More
                          </button>
                        )}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">{service.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Service Dialog */}
        <ServiceDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          editingService={editingService}
          onSuccess={handleSaveSuccess}
          setDebugInfo={setDebugInfo}
        />
      </div>
    </div>
  );
}

function ServiceDialog({ 
  open, 
  onOpenChange, 
  editingService, 
  onSuccess, 
  setDebugInfo 
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingService: any;
  onSuccess: () => void;
  setDebugInfo: (info: string) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image_url: '',
    video_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 50MB for videos)
    if (file.size > 50 * 1024 * 1024) {
      alert('Video file size must be less than 50MB');
      return;
    }

    setUploadingVideo(true);
    setDebugInfo('Uploading video...');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `service-videos/${fileName}`;

      const { data, error } = await supabase.storage
        .from('services')
        .upload(filePath, file);

      if (error) {
        console.error('❌ Video Upload Error:', error);
        setDebugInfo(`Video Upload Error: ${error.message}`);
        alert(`Video upload failed: ${error.message}`);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('services')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, video_url: publicUrl }));
      setDebugInfo('Video uploaded successfully');
      console.log('✅ Video uploaded:', publicUrl);

    } catch (err: any) {
      console.error('❌ Video Upload Error:', err);
      setDebugInfo(`Video Upload Error: ${err.message}`);
      alert(`Video upload failed: ${err.message}`);
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setDebugInfo('Uploading image...');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `service-images/${fileName}`;

      const { data, error } = await supabase.storage
        .from('services')
        .upload(filePath, file);

      if (error) {
        console.error('❌ Upload Error:', error);
        setDebugInfo(`Upload Error: ${error.message}`);
        alert(`Upload failed: ${error.message}`);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('services')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      setDebugInfo('Image uploaded successfully');
      console.log('✅ Image uploaded:', publicUrl);

    } catch (err: any) {
      console.error('❌ Upload Error:', err);
      setDebugInfo(`Upload Error: ${err.message}`);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (open) {
      if (editingService) {
        setFormData({
          title: editingService.title || '',
          description: editingService.description || '',
          price: editingService.price || '',
          image_url: editingService.image_url || '',
          video_url: editingService.video_url || ''
        });
      } else {
        setFormData({
          title: '',
          description: '',
          price: '',
          image_url: '',
          video_url: ''
        });
      }
    }
  }, [editingService, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const serviceData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      image_url: formData.image_url || null,
      video_url: formData.video_url || null
    };

    setDebugInfo(`${editingService ? 'Updating' : 'Creating'} service...`);
    
    try {
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);
        
        if (error) {
          console.error('❌ Update Error:', error);
          setDebugInfo(`Update Error: ${error.message}`);
          alert(`Update failed: ${error.message}`);
        } else {
          console.log('✅ Update successful');
          setDebugInfo('Service updated successfully');
          onSuccess();
        }
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceData]);
        
        if (error) {
          console.error('❌ Insert Error:', error);
          setDebugInfo(`Insert Error: ${error.message}`);
          alert(`Add failed: ${error.message}`);
        } else {
          console.log('✅ Insert successful');
          setDebugInfo('Service added successfully');
          onSuccess();
        }
      }
    } catch (err: any) {
      console.error('❌ Save Error:', err);
      setDebugInfo(`Save Error: ${err.message}`);
      alert(`Save failed: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingService ? 'Edit Service' : 'Add New Service'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Service Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="e.g. ₹1,500"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image_file">Service Image (Optional)</Label>
            <Input
              id="image_file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading || uploading || uploadingVideo}
            />
            {formData.image_url && (
              <div className="mt-2">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="w-20 h-20 object-cover rounded border"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                  className="mt-1 text-red-500"
                >
                  Remove Image
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video_file">Service Video (Optional)</Label>
            <Input
              id="video_file"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              disabled={loading || uploading || uploadingVideo}
            />
            {formData.video_url && (
              <div className="mt-2">
                <video 
                  src={formData.video_url} 
                  controls
                  className="w-32 h-24 rounded border"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, video_url: '' }))}
                  className="mt-1 text-red-500"
                >
                  Remove Video
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 justify-end pt-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => onOpenChange(false)} 
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploading || uploadingVideo}>
              {loading ? 'Saving...' : uploading ? 'Uploading Image...' : uploadingVideo ? 'Uploading Video...' : (editingService ? 'Update' : 'Add')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}