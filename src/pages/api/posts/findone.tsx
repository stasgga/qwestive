// src/pages/api/posts/find.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const posts = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const post = await prisma.post.findUnique({
    where: {
      id: body.id,
    },
    include: {
      author: true,
    },
  });
  res.status(200).json(post);
};

export default posts;
