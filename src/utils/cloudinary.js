/**
 * Cloudinary Upload Utility
 * 
 * SETUP INSTRUCTIONS:
 * 1. Sign up for free at https://cloudinary.com
 * 2. Get your Cloud Name, Upload Preset from dashboard
 * 3. Create an unsigned upload preset:
 *    - Go to Settings > Upload > Upload presets
 *    - Click "Add upload preset"
 *    - Set Signing Mode to "Unsigned"
 *    - Configure folder (e.g., "cricket-payments")
 *    - Save the preset name
 * 4. Add to .env file:
 *    VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
 *    VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
 */

/**
 * Upload an image file to Cloudinary
 * @param {File} file - The image file to upload
 * @param {string} folder - Optional folder name within Cloudinary (e.g., 'photos', 'screenshots')
 * @returns {Promise<string>} - Returns the secure URL of the uploaded image
 */
export const uploadToCloudinary = async (file, folder = '') => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration is missing. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file');
  }

  // Create form data
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  // Add folder if specified
  if (folder) {
    formData.append('folder', folder);
  }

  try {
    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const data = await response.json();
    
    // Return the secure URL
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param {File[]} files - Array of image files to upload
 * @param {string} folder - Optional folder name within Cloudinary
 * @returns {Promise<string[]>} - Returns array of secure URLs
 */
export const uploadMultipleToCloudinary = async (files, folder = '') => {
  const uploadPromises = files.map(file => uploadToCloudinary(file, folder));
  return Promise.all(uploadPromises);
};
