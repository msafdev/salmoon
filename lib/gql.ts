import { GraphQLClient, gql } from "graphql-request";

import { FetchPostResponse } from "@/lib/types";

const graphQLClient = new GraphQLClient(process.env.HYGRAPH_URL || "");

const getPosts = async () => {
  const query = gql`
    query FetchPosts {
      postsConnection {
        edges {
          node {
            id
            title
            slug
            excerpt
            updatedAt
            categories
            content {
              raw
            }
          }
        }
      }
    }
  `;

  const response = (await graphQLClient.request(query)) as FetchPostResponse;

  return response.postsConnection?.edges;
};

const getPost = async ({ slug }: { slug: string }) => {
  const query = gql`
    query FetchPost($slug: String!) {
      postsConnection(where: { slug: $slug }) {
        edges {
          node {
            id
            title
            slug
            excerpt
            updatedAt
            categories
            content {
              raw
            }
          }
        }
      }
    }
  `;
  const response = await graphQLClient.request(query, { slug });

  return response as FetchPostResponse;
};

export { getPosts, getPost };
