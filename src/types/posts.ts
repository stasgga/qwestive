import { Post, User } from "@prisma/client";

export interface NewPost{
    title: string;
    content: string;
    image: string;
    authorId: string;
}

export interface EditPost extends NewPost{
    id: string;
}

export interface PopulatedPost extends Post{
    author: User;
  }