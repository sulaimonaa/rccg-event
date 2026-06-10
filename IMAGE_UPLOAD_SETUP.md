# Image Upload Setup Guide

## Overview
The business creation form has been updated to support image uploads directly to Cloudinary. Images are now uploaded to the cloud and the secure URL is saved to MongoDB.

## Changes Made

### 1. **New Files Created**
- `/app/api/upload/route.ts` - API endpoint that handles uploading images to Cloudinary
- `/components/button/CreateBtn.tsx` - Converted to server component
- `.env.example` - Template showing required environment variables

### 2. **Files Modified**
- `/app/business/create/page.tsx` - Updated form to accept file uploads instead of URL input
- `/app/api/businesses/[id]/route.tsx` - Fixed for Next.js 16 dynamic route parameters
- `.env` - Added Cloudinary configuration placeholders

### 3. **Key Features**
✅ File upload input (image only)
✅ Server-side image processing
✅ Direct upload to Cloudinary
✅ Secure URL storage in MongoDB
✅ Error handling for upload failures
✅ CORS support for API endpoints

## Setup Instructions

### Step 1: Sign up for Cloudinary
1. Go to https://cloudinary.com/users/register/free
2. Create a free account

### Step 2: Get Your Cloudinary Credentials
1. Log in to your Cloudinary dashboard: https://cloudinary.com/console
2. Note your **Cloud Name**
3. Go to **Settings > API Keys** tab
4. Note your **API Key** and **API Secret**

### Step 3: Update Environment Variables
Edit your `.env` file and replace the placeholders:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

⚠️ **Important**: Keep your API Secret private. Never commit it to version control.

### Step 4: Restart the Development Server
```bash
npm run dev
```

## How It Works

1. User selects an image file from their device
2. User fills in other business details
3. On form submission:
   - The image file is sent to `/api/upload` endpoint
   - Cloudinary processes and stores the image in the `rccgevent/businesses` folder
   - The secure URL is returned
   - The URL and business details are saved to MongoDB
4. User is redirected to the home page

## Testing

1. Navigate to `/business/create`
2. Fill in all fields
3. Select an image file
4. Click "Create Business"
5. Check the MongoDB database to verify the image URL is saved
6. Visit the home page to see the business with the uploaded image

## Troubleshooting

### "Image upload failed" error
- Verify your Cloudinary credentials are correct in `.env`
- Check that the image file is a valid format (jpg, png, gif, etc.)

### "All required fields must be filled"
- Ensure you've selected an image file (required field)
- All other fields must also be completed

### Images not showing
- Check that the Cloudinary URL is correctly saved in MongoDB
- Verify Cloudinary is allowing public access to the image

## API Documentation

### POST `/api/upload`
Uploads an image to Cloudinary

**Request:**
```
Content-Type: multipart/form-data
Body: { file: File }
```

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/.../image.jpg"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

