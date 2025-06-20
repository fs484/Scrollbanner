import { WordPressPost, Post } from '@/types/post';

const API_ENDPOINT = 'https://frontendtest.pleasecheck.me/wp-json/wp/v2/posts/';


function cleanHtmlEntities(text: string): string {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .trim();
}


function transformWordPressPost(wpPost: WordPressPost): Post {
  return {
    id: wpPost.id,
    title: cleanHtmlEntities(wpPost.title.rendered),
    excerpt: wpPost.excerpt?.rendered ? cleanHtmlEntities(wpPost.excerpt.rendered) : undefined,
    date: wpPost.date,
  };
}


const FALLBACK_POSTS: Post[] = [
  { 
    id: 1, 
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
  },
  { 
    id: 2, 
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
  },
  { 
    id: 3, 
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
  },
  { 
    id: 4, 
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
  },
  { 
    id: 5, 
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
  },
  { 
    id: 6, 
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
  },
  { 
    id: 7, 
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
  },
  { 
    id: 8, 
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
  }
];


export async function fetchPosts(): Promise<Post[]> {
  try {
    console.log('🚀 Fetching posts from WordPress API...');
    
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const wpPosts: WordPressPost[] = await response.json();
    
    if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
      throw new Error('No posts received from API');
    }

    const transformedPosts = wpPosts.map(transformWordPressPost);
    console.log(`✅ Successfully fetched ${transformedPosts.length} posts`);
    
    return transformedPosts;

  } catch (error) {
    console.error('❌ Error fetching posts from WordPress API:', error);
    console.log('🔄 Using fallback data...');
    
    return FALLBACK_POSTS;
  }
}
