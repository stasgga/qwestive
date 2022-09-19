import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NewPost } from "../types/posts";

export default function NewPostView() {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState<NewPost>({
    title: "",
    content: "",
    image: "",
    authorId: session?.user?.id || "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(post);
    const created = await fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify(post),
    });
    console.log(created);
    router.push("/");
  };
  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl md:text-[3rem] leading-normal font-extrabold text-gray-700">
          Create New Post
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 pt-3 mt-3 text-center lg:w-2/5"
        >
          <div className="mb-6">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="large-input"
              onChange={handleChange}
              value={post.title}
              name="title"
              className="block p-3 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 "
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Content
            </label>
            <textarea
              id="message"
              onChange={handleChange}
              value={post.content}
              name="content"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Content goes here..."
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Image Url
            </label>
            <input
              type="text"
              id="large-input"
              onChange={handleChange}
              value={post.image}
              name="image"
              className="block p-3 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 "
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
