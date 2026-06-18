"use client"
import { createRecipe } from '@/lib/action/action';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddRecipeForm = () => {
  // 🟢 মক ইউজার ডিফাইন করা হলো (পরবর্তীতে এটি ব্যাকএন্ড বা Auth থেকে আসবে)
  const mockUser = {
    id: "user_67890abcde",
    name: "John Doe",
    email: "johndoe@example.com",
    role: "chef"
  };

  const initialFormState = {
    name: '',
    image: null,
    category: '',
    cuisineType: '',
    difficulty: 'Easy',
    prepTime: '',
    ingredientsText: '', 
    instructionsText: '', 
  };

  const [recipe, setRecipe] = useState(initialFormState);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.success) {
        setRecipe((prev) => ({ ...prev, image: data.data.url }));
      } else {
        alert('Image upload failed.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred during image upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return;

    setSaving(true);

    const finalRecipeData = {
      name: recipe.name,
      image: recipe.image,
      category: recipe.category,
      cuisineType: recipe.cuisineType,
      difficulty: recipe.difficulty,
      prepTime: recipe.prepTime,
      ingredients: recipe.ingredientsText.trim(), 
      instructions: recipe.instructionsText.trim(), 
      likesCount: 0,
      isFeatured: false,
      status: "usual",
      createdAt: new Date(),
      
      // 🟢 মক ইউজারের ডাটা রেসিপির সাথে যুক্ত করা হলো
      userId: mockUser.id,

    };

    const res = await createRecipe(finalRecipeData)
    if(res?.insertedId){
      toast.success('Successfully Recipe Uploaded !! ')
    }
    
    setRecipe(initialFormState);
    if (e.target) e.target.reset(); 
    setSaving(false);
  };

  const inputThemeClasses = "w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-gray-50/50 focus:bg-white dark:bg-gray-800/50 dark:focus:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500";
  const labelThemeClasses = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";

  return (
    <div className="w-full max-w-4xl mx-auto my-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors duration-200">
      
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-6 text-white">
        <h2 className="text-3xl font-extrabold tracking-tight">Create a New Recipe</h2>
        {/* 🟢 UI-তে ডেমো হিসেবে ইউজারের নাম দেখানোর জন্য (ঐচ্ছিক) */}
        <p className="text-green-100 mt-1 text-sm">Posting as: <strong>{mockUser.name}</strong></p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        {/* Recipe Name */}
        <div>
          <label className={labelThemeClasses}>Recipe Name</label>
          <input
            type="text"
            name="name"
            required
            value={recipe.name}
            onChange={handleChange}
            className={inputThemeClasses}
            placeholder="e.g., Spicy Garlic Shrimp Pasta"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className={labelThemeClasses}>Recipe Cover Photo</label>
          <div className="flex items-center gap-6 p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer transition-all"
              />
              {uploading && <p className="text-xs text-emerald-500 mt-2 animate-pulse font-medium">Uploading image to ImgBB securely...</p>}
            </div>
            {recipe.image && (
              <div className="relative shrink-0">
                <img src={recipe.image} alt="Preview" className="h-20 w-28 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm" />
              </div>
            )}
          </div>
        </div>

        {/* Grid Meta Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className={labelThemeClasses}>Category</label>
            <input
              type="text"
              name="category"
              value={recipe.category}
              onChange={handleChange}
              className={inputThemeClasses}
              placeholder="e.g., Main, Dessert"
            />
          </div>
          <div>
            <label className={labelThemeClasses}>Cuisine Type</label>
            <input
              type="text"
              name="cuisineType"
              value={recipe.cuisineType}
              onChange={handleChange}
              className={inputThemeClasses}
              placeholder="e.g., Italian, Asian"
            />
          </div>
          <div>
            <label className={labelThemeClasses}>Difficulty</label>
            <select
              name="difficulty"
              value={recipe.difficulty}
              onChange={handleChange}
              className={`${inputThemeClasses} py-[11px]`}
            >
              <option value="Easy" className="bg-white dark:bg-gray-900">Easy</option>
              <option value="Medium" className="bg-white dark:bg-gray-900">Medium</option>
              <option value="Hard" className="bg-white dark:bg-gray-900">Hard</option>
            </select>
          </div>
          <div>
            <label className={labelThemeClasses}>Prep Time</label>
            <input
              type="text"
              name="prepTime"
              value={recipe.prepTime}
              onChange={handleChange}
              className={inputThemeClasses}
              placeholder="e.g., 30 mins"
            />
          </div>
        </div>

        {/* Ingredients Textarea */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Ingredients</label>
            <span className="text-xs text-gray-400 dark:text-gray-500">Each ingredient on a new line</span>
          </div>
          <textarea
            name="ingredientsText"
            required
            rows="5"
            value={recipe.ingredientsText}
            onChange={handleChange}
            className={`${inputThemeClasses} font-mono text-sm leading-relaxed`}
            placeholder="2 tbsp Olive Oil&#10;3 cloves Garlic, minced"
          />
        </div>

        {/* Instructions Textarea */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Instructions / Steps</label>
            <span className="text-xs text-gray-400 dark:text-gray-500">Each step on a new line</span>
          </div>
          <textarea
            name="instructionsText"
            required
            rows="5"
            value={recipe.instructionsText}
            onChange={handleChange}
            className={`${inputThemeClasses} font-mono text-sm leading-relaxed`}
            placeholder="Heat olive oil in a large skillet over medium-high heat."
          />
        </div>

        {/* Submit Action Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={uploading || saving}
            className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.99] ${
              uploading || saving
                ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed shadow-none' 
                : 'bg-gradient-to-r from-emerald-600 to-green-500 hover:opacity-95 shadow-emerald-600/10 dark:shadow-none'
            }`}
          >
            {uploading ? 'Uploading Cover Image...' : saving ? 'Saving Recipe...' : 'Save Recipe to Collection'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddRecipeForm;