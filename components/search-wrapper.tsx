"use client";

import SearchModalClient from "@/components/SearchModal";

export interface PostItem {
  slug: string;
  title: string;
  description: string;
}

interface SearchWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  posts: PostItem[]; // Recibe los artículos desde el servidor
}

export default function SearchWrapper({
  isOpen,
  onClose,
  posts,
}: SearchWrapperProps) {
  return (
    <SearchModalClient
      isOpen={isOpen}
      onClose={onClose}
      posts={posts}
    />
  );
}