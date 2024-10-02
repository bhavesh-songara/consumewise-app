import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText, tool, embed } from "ai";
import { z } from "zod";
import mongoose from "mongoose";

import { connect } from "@/lib/mongodb";

const consumeWiseDb = mongoose.connection.useDb("consumewise");

const ProductCollection = consumeWiseDb.collection("Products");

export async function POST(req: Request) {
  const { messages } = await req.json();

  await connect();

  const result = await streamText({
    model: google("gemini-1.5-flash-latest"),
    messages: convertToCoreMessages(messages),
    system: `You are a helpful assistant ConsumeWise AI that helps consumers understand the health impact of packaged food products and nudges them to make better choices. You can use searchProduct tool to search for a product for nutritional, ingredients, and other details.`,
    tools: {
      searchProduct: tool({
        description: "Search for a product user is looking for.",
        parameters: z.object({
          query: z.string().describe(`The product name to search for.`),
        }),
        execute: async ({ query }) => {
          const { embedding } = await embed({
            model: google.textEmbeddingModel("text-embedding-004"),
            value: query,
          });

          if (!embedding || !embedding.length) {
            return {
              products: [],
            };
          }

          const products = await ProductCollection.aggregate([
            {
              $vectorSearch: {
                index: "vector_index",
                queryVector: embedding,
                path: "embedding",
                exact: true,
                limit: 5,
              },
            },
            {
              $addFields: {
                score: {
                  $meta: "vectorSearchScore",
                },
              },
            },
            {
              $sort: {
                score: -1,
              },
            },
            {
              $project: {
                embedding: 0,
              },
            },
          ]).toArray();

          return {
            products,
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
