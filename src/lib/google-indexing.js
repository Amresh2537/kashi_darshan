export async function pingGoogleIndexing(url) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Development mode: Skipping Google ping for', url);
    return;
  }

  try {
    const GOOGLE_INDEXING_API = process.env.GOOGLE_INDEXING_API;
    
    if (!GOOGLE_INDEXING_API) {
      console.log('Google Indexing API key not configured');
      return;
    }

    const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GOOGLE_INDEXING_API}`
      },
      body: JSON.stringify({
        url: url,
        type: 'URL_UPDATED'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Google indexing ping successful for:', url);
    } else {
      console.error('❌ Google indexing error:', data);
    }
  } catch (error) {
    console.error('❌ Error pinging Google:', error);
  }
}