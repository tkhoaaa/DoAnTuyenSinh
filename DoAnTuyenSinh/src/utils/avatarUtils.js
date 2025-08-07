 // Avatar utility functions
 export const getAvatarUrl = (user) => {
     if (!user || !user.avatar) {
         console.log("No avatar found for user:", user);
         return null;
     }

     let avatarUrl = user.avatar;

     // Handle different avatar URL formats
     if (avatarUrl.startsWith('http')) {
         console.log("Avatar is already full URL:", avatarUrl);
         return avatarUrl;
     } else if (avatarUrl.startsWith('/uploads/')) {
         const fullUrl = `http://localhost:3001${avatarUrl}`;
         console.log("Avatar converted from relative to full URL:", { original: avatarUrl, full: fullUrl });
         return fullUrl;
     } else {
         const fullUrl = `http://localhost:3001/uploads/${avatarUrl}`;
         console.log("Avatar converted from filename to full URL:", { original: avatarUrl, full: fullUrl });
         return fullUrl;
     }
 };

 export const debugUserAvatar = (user, context = "unknown") => {
     console.log(`[Avatar Debug - ${context}]`, {
         user: user,
         hasAvatar: !!(user && user.avatar),
         avatarValue: user ? user.avatar : null,
         avatarUrl: getAvatarUrl(user),
         userKeys: user ? Object.keys(user) : []
     });
 };

 export const testAvatarLoad = async(avatarUrl) => {
     if (!avatarUrl) {
         console.log("No avatar URL to test");
         return false;
     }

     try {
         const response = await fetch(avatarUrl, { method: 'HEAD' });
         const success = response.ok;
         console.log(`Avatar load test for ${avatarUrl}:`, success ? "SUCCESS" : "FAILED", response.status);
         return success;
     } catch (error) {
         console.log(`Avatar load test for ${avatarUrl}: ERROR`, error.message);
         return false;
     }
 };