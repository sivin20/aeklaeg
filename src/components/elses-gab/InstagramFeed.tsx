import React, { useState, useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------------
  // CONFIGURATION:
  // 1. Go to https://behold.so/ and create a free account.
  // 2. Connect your Instagram.
  // 3. Create a "JSON Feed" (not a widget).
  // 4. Paste the Feed URL they give you here:
  // ---------------------------------------------------------
  const FEED_URL = 'https://feeds.behold.so/10WFC4CSlP4KESkLm1NP';

  useEffect(() => {
    // If no URL is set, don't try to fetch (keeps placeholder active)
    console.log('Instagram Feed URL:', FEED_URL);
    if (FEED_URL === 'https://feeds.behold.so/10WFC4CSlP4KESkLm1NP') {
      console.log('No Instagram Feed URL set. Using placeholders.');
      setLoading(false);
    }

    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(FEED_URL);
        console.log('Fetching Instagram feed from:', FEED_URL);
        const data = await response.json();
        console.log('Fetched Instagram data:', data);
        console.log('Instagram posts:', data.posts);
        // We only take the first 4 posts to fit your grid
        setPosts(data.posts.slice(0, 4));
      } catch (error) {
        console.error('Error fetching Instagram feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <section className='py-16 md:py-24 bg-background'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='flex items-center gap-3 mb-12 justify-center'>
          <Instagram className='w-8 h-8 text-primary' />
          <h2 className='font-serif text-3xl md:text-4xl font-bold text-foreground'>
            Følg os på Instagram
          </h2>
        </div>

        <div className='max-w-6xl mx-auto'>
          {/* Profile Link */}
          <div className='text-center mb-8'>
            <a
              href='https://www.instagram.com/elses_gab/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sans text-lg'
            >
              @elses_gab <ExternalLink className='w-4 h-4' />
            </a>
          </div>

          {/* Grid Display */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {/* STATE 1: LOADING or NO FEED URL (Show Placeholders) */}
            {(loading || posts.length === 0) &&
              [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='aspect-square bg-muted/20 rounded-lg flex items-center justify-center border border-border/20 animate-pulse'
                >
                  <Instagram className='w-12 h-12 text-muted-foreground/30' />
                </div>
              ))}

            {/* STATE 2: LIVE DATA (Show Actual Images) */}
            {!loading &&
              posts.length > 0 &&
              posts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group relative aspect-square overflow-hidden rounded-lg block'
                >
                  {/* Image/Video Thumbnail */}
                  <img
                    src={post.mediaUrl || post.thumbnailUrl}
                    alt={
                      post.caption
                        ? post.caption.slice(0, 50)
                        : 'Instagram post'
                    }
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  />

                  {/* Hover Overlay */}
                  <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <Instagram className='text-white w-8 h-8' />
                  </div>
                </a>
              ))}
          </div>

          {/* Footer Note */}
          <p className='text-center mt-8 text-muted-foreground font-sans text-sm'>
            {posts.length === 0 ? (
              // Message shown if setup isn't complete
              <>
                Instagram feed kræver opsætning. Besøg vores{' '}
                <a
                  href='https://www.instagram.com/elses_gab/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline'
                >
                  Instagram profil
                </a>{' '}
                for at se de nyeste opslag.
              </>
            ) : (
              // Message shown when working
              'Opdateres automatisk fra vores Instagram feed.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
