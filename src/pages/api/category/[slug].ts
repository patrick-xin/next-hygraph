import { client } from "@/lib/client";
import { BLOG_ON_CATEGORY_QUERY } from "@/lib/query";
import type { NextApiRequest, NextApiResponse } from "next";

const PAGE_SIZE = 4;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cursor, slug } = req.body;

  const { data } = await client.query({
    query: BLOG_ON_CATEGORY_QUERY,
    variables: {
      first: PAGE_SIZE,
      after: cursor,
      slug,
    },
  });

  res.status(200).json({ data });
}
