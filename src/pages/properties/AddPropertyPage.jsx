import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, UploadIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';

const propertyTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'condo', label: 'Condo' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'bnb', label: 'BnB' },
  { value: 'penthouse', label: 'Penthouse' },
];

const defaultAmenities = [
  'Pool', 'Gym', 'Parking', 'Laundry', 'Pet Friendly', 'Rooftop', 'Concierge', 'Bike Storage'
];

export function AddPropertyPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    units: '',
    description: '',
    amenities: [],
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Property name is required';
    if (!formData.type) newErrors.type = 'Property type is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData.units) newErrors.units = 'Number of units is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const newProperty = {
      id: `prop-${Date.now()}`,
      name: formData.name,
      type: formData.type,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      units: parseInt(formData.units),
      occupiedUnits: 0,
      description: formData.description,
      amenities: formData.amenities,
      image: imagePreview || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      status: 'active',
      monthlyRevenue: 0,
      createdAt: new Date().toISOString(),
    };
    
    const existingProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    const updatedProperties = [...existingProperties, newProperty];
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    
    setIsLoading(false);
    toast.success('Property added successfully!');
    navigate('/properties');
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/properties')}>
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Add Property</h1>
          <p className="text-slate-400">Create a new rental property</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Basic Information</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Property Name"
                placeholder="e.g., Sunset Apartments"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
              />
              <Select
                label="Property Type"
                options={propertyTypes}
                placeholder="Select type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                error={errors.type}
              />
            </div>
            <Input
              label="Number of Units"
              type="number"
              placeholder="e.g., 24"
              value={formData.units}
              onChange={(e) => setFormData({ ...formData, units: e.target.value })}
              error={errors.units}
            />
            <Textarea
              label="Description"
              placeholder="Describe the property..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Address</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Street Address"
              placeholder="123 Main Street"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              error={errors.address}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                placeholder="Where Exactly"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                error={errors.city}
              />
              <Input
                label="County/Country"
                placeholder="CA"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                error={errors.state}
              />
              <Input
                label="ZIP Code"
                placeholder="90028"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                error={errors.zipCode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Images</h3>
          </CardHeader>
          <CardContent>
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Property preview" 
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <XIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            ) : (
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
                  <UploadIcon className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-300 font-medium mb-1">Click to upload images</p>
                  <p className="text-sm text-slate-500">PNG, JPG up to 10MB</p>
                </div>
              </label>
            )}
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Amenities</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {defaultAmenities.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.amenities.includes(amenity)
                      ? 'bg-primary-500 text-white'
                      : 'bg-surface-dark text-slate-300 hover:bg-surface-hover'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => navigate('/properties')}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Add Property
          </Button>
        </div>
      </form>
    </div>
  );
}