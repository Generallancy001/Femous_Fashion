import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  Image as ImageIcon } from
'lucide-react';
import { compressImage } from '../utils/imageCompress';
import { useProducts } from '../context/ProductContext';
import { useReviews } from '../context/ReviewContext';
import { Product, CATEGORIES, Category } from '../types';
import { formatPrice, extractNameFromEmail } from '../utils/format';
import { StarRating } from '../components/StarRating';
import { toast } from 'sonner';
export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { reviews, addAdminReply } = useReviews();
  const [activeTab, setActiveTab] = useState<'products' | 'reviews'>('products');
  // Product Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: CATEGORIES[0],
    images: [] as string[]
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Review Reply State
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'femous2024') {
      setIsAuthenticated(true);
      toast.success('Logged in successfully');
    } else {
      toast.error('Incorrect password');
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (formData.images.length + files.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }
    Array.from(files).forEach(async (file) => {
      try {
        const compressed = await compressImage(file);
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, compressed]
        }));
      } catch {
        toast.error('Failed to process image');
      }
    });
  };
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };
  const openForm = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        images: product.images
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: CATEGORIES[0],
        images: []
      });
    }
    setIsFormOpen(true);
  };
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }
    const productData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category as Category,
      images: formData.images
    };
    if (editingId) {
      updateProduct(editingId, productData);
      toast.success('Product updated');
    } else {
      addProduct(productData);
      toast.success('Product added');
    }
    setIsFormOpen(false);
  };
  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast.success('Product deleted');
    }
  };
  const handleReplySubmit = (reviewId: string) => {
    if (!replyText.trim()) return;
    addAdminReply(reviewId, replyText);
    setReplyingTo(null);
    setReplyText('');
    toast.success('Reply added');
  };
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white p-8 border border-gray-200 max-w-md w-full shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-center mb-6">
            Admin Access
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-brand-gold" />
              
            </div>
            <button
              type="submit"
              className="w-full bg-brand-dark text-white p-3 font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors">
              
              Login
            </button>
          </form>
        </div>
      </div>);

  }
  // Group reviews by product
  const productsWithReviews = products.filter((p) =>
  reviews.some((r) => r.productId === p.id)
  );
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-brand-dark">
          Admin Dashboard
        </h1>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-sm font-medium uppercase tracking-wider text-brand-grayDark hover:text-brand-dark">
          
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'products' ? 'border-brand-dark text-brand-dark' : 'border-transparent text-gray-400 hover:text-brand-dark'}`}>
          
          Products
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === 'reviews' ? 'border-brand-dark text-brand-dark' : 'border-transparent text-gray-400 hover:text-brand-dark'}`}>
          
          Reviews
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' &&
      <div>
          {!isFormOpen ?
        <>
              <div className="flex justify-end mb-6">
                <button
              onClick={() => openForm()}
              className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors">
              
                  <Plus size={16} /> Add Product
                </button>
              </div>

              <div className="bg-white border border-gray-200 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-gray border-b border-gray-200 text-sm uppercase tracking-wider text-brand-grayDark">
                      <th className="p-4 font-medium">Product</th>
                      <th className="p-4 font-medium">Category</th>
                      <th className="p-4 font-medium">Price</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) =>
                <tr
                  key={product.id}
                  className="border-b border-gray-100 hover:bg-gray-50">
                  
                        <td className="p-4 flex items-center gap-4">
                          <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-16 object-cover bg-gray-100" />
                    
                          <span className="font-medium text-brand-dark">
                            {product.name}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {product.category}
                        </td>
                        <td className="p-4 text-sm font-medium">
                          {formatPrice(product.price)}
                        </td>
                        <td className="p-4 text-right space-x-3">
                          <button
                      onClick={() => openForm(product)}
                      className="text-blue-600 hover:text-blue-800">
                      
                            <Edit2 size={18} />
                          </button>
                          <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-800">
                      
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                )}
                  </tbody>
                </table>
              </div>
            </> :

        <div className="bg-white border border-gray-200 p-6 max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl font-bold">
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
              onClick={() => setIsFormOpen(false)}
              className="text-gray-400 hover:text-brand-dark">
              
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">
                      Name
                    </label>
                    <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                  }
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:border-brand-gold" />
                
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1">
                      Price (₦)
                    </label>
                    <input
                  required
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value
                  })
                  }
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:border-brand-gold" />
                
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Category
                  </label>
                  <select
                value={formData.category}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as Category
                })
                }
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-brand-gold bg-white">
                
                    {CATEGORIES.map((cat) =>
                <option key={cat} value={cat}>
                        {cat}
                      </option>
                )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Description
                  </label>
                  <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value
                })
                }
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-brand-gold resize-none" />
              
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Images (Max 5)
                  </label>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {formData.images.map((img, idx) =>
                <div
                  key={idx}
                  className="relative w-24 h-32 border border-gray-200">
                  
                        <img
                    src={img}
                    alt={`Preview ${idx}`}
                    className="w-full h-full object-cover" />
                  
                        <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                    
                          <X size={14} />
                        </button>
                      </div>
                )}
                    {formData.images.length < 5 &&
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-32 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-colors">
                  
                        <Upload size={24} className="mb-2" />
                        <span className="text-xs">Upload</span>
                      </button>
                }
                  </div>
                  <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="hidden" />
              
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                  <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-3 text-sm font-bold uppercase tracking-widest border border-gray-300 hover:bg-gray-50">
                
                    Cancel
                  </button>
                  <button
                type="submit"
                className="bg-brand-dark text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors">
                
                    {editingId ? 'Update Product' : 'Save Product'}
                  </button>
                </div>
              </form>
            </div>
        }
        </div>
      }

      {/* Reviews Tab */}
      {activeTab === 'reviews' &&
      <div className="space-y-12">
          {productsWithReviews.length === 0 ?
        <p className="text-center text-gray-500 py-12">No reviews yet.</p> :

        productsWithReviews.map((product) => {
          const productReviews = reviews.
          filter((r) => r.productId === product.id).
          sort((a, b) => b.date - a.date);
          return (
            <div
              key={product.id}
              className="bg-white border border-gray-200 overflow-hidden">
              
                  <div className="bg-brand-gray p-4 flex items-center gap-4 border-b border-gray-200">
                    <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-16 object-cover" />
                
                    <div>
                      <h3 className="font-serif font-bold text-lg">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {productReviews.length} Review(s)
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {productReviews.map((review) =>
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-bold text-brand-dark mr-3 capitalize">
                              {extractNameFromEmail(review.email)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {review.email}
                            </span>
                          </div>
                          <StarRating rating={review.rating} size={14} />
                        </div>
                        <p className="text-brand-dark mb-4">{review.comment}</p>

                        {review.adminReply ?
                  <div className="ml-8 bg-brand-gray p-4 border-l-2 border-brand-gold">
                            <span className="bg-brand-gold text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider mb-2 inline-block">
                              Admin Reply
                            </span>
                            <p className="text-sm text-brand-dark">
                              {review.adminReply}
                            </p>
                          </div> :

                  <div className="ml-8">
                            {replyingTo === review.id ?
                    <div className="flex gap-2">
                                <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        className="flex-grow p-2 border border-gray-300 text-sm focus:outline-none focus:border-brand-gold" />
                      
                                <button
                        onClick={() => handleReplySubmit(review.id)}
                        className="bg-brand-dark text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-brand-gold">
                        
                                  Send
                                </button>
                                <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText('');
                        }}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-gray-300 hover:bg-gray-50">
                        
                                  Cancel
                                </button>
                              </div> :

                    <button
                      onClick={() => setReplyingTo(review.id)}
                      className="text-xs font-bold uppercase tracking-wider text-brand-gold hover:text-brand-dark flex items-center gap-1">
                      
                                <Plus size={12} /> Add Reply
                              </button>
                    }
                          </div>
                  }
                      </div>
                )}
                  </div>
                </div>);

        })
        }
        </div>
      }
    </div>);

};