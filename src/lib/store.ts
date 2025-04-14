import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Post interface
export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

// Business interface
export interface Business {
  id: string;
  name: string;
  description?: string;
  year?: string;
}

// Interface for AI generated content
export interface AIContent {
  id: string;
  prompt: string;
  content: string;
  image?: string;
  createdAt: Date;
}

// Store interface
interface AppState {
  posts: Post[];
  aiContents: AIContent[];
  currentBusiness: Business | null;
  businesses: Business[];

  // Posts actions
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;

  // AI Content actions
  addAIContent: (content: Omit<AIContent, 'id' | 'createdAt'>) => void;
  deleteAIContent: (id: string) => void;

  // Business actions
  setCurrentBusiness: (business: Business | null) => void;
  addBusiness: (business: Omit<Business, 'id'>) => void;
  updateBusiness: (id: string, business: Partial<Business>) => void;
  deleteBusiness: (id: string) => void;
}

// Create the store
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      posts: [],
      aiContents: [],
      currentBusiness: null,
      businesses: [],

      // Posts actions
      addPost: (post) => set((state) => ({
        posts: [
          ...state.posts,
          {
            ...post,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      })),

      updatePost: (id, post) => set((state) => ({
        posts: state.posts.map((p) =>
          p.id === id
            ? { ...p, ...post, updatedAt: new Date() }
            : p
        ),
      })),

      deletePost: (id) => set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      })),

      // AI Content actions
      addAIContent: (content) => set((state) => ({
        aiContents: [
          ...state.aiContents,
          {
            ...content,
            id: crypto.randomUUID(),
            createdAt: new Date(),
          },
        ],
      })),

      deleteAIContent: (id) => set((state) => ({
        aiContents: state.aiContents.filter((content) => content.id !== id),
      })),

      // Business actions
      setCurrentBusiness: (business) => set({ currentBusiness: business }),

      addBusiness: (business) => set((state) => ({
        businesses: [
          ...state.businesses,
          {
            ...business,
            id: crypto.randomUUID(),
          },
        ],
      })),

      updateBusiness: (id, business) => set((state) => ({
        businesses: state.businesses.map((b) =>
          b.id === id ? { ...b, ...business } : b
        ),
      })),

      deleteBusiness: (id) => set((state) => ({
        businesses: state.businesses.filter((business) => business.id !== id),
      })),
    }),
    {
      name: 'ai-content-platform-storage',
    }
  )
);
