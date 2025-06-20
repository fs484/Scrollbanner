
export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  date: string;
  slug: string;
  status: string;
}


export interface Post {
  id: number;
  title: string;
  excerpt?: string;
  date?: string;
}


export type AnimationDirection = 'left' | 'right';


export type GradientVariant = 
  | 'pink' 
  | 'teal' 
  | 'blue' 
  | 'green' 
  | 'yellow' 
  | 'purple' 
  | 'red' 
  | 'magenta';


export interface ScrollingTextRowProps {
  text: string;
  direction: AnimationDirection;
  gradientVariant: GradientVariant;
  index: number;
}
