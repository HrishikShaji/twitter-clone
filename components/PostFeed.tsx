"use client";
import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";

interface PostFeedProps {
  userId?: string;
  onlyUser: boolean;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId, onlyUser }) => {
  console.log(onlyUser);
  const { data: posts = [] } = userId ? usePosts(userId) : usePosts();

  console.log(posts);
  return (
    <>
      {posts?.map((post: Record<string, any>) => (
        <PostItem key={post.id} data={post} userId={userId} />
      ))}
    </>
  );
};

export default PostFeed;
