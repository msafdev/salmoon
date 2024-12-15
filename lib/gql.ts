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
            thumbnail {
              url
            }
            excerpt
            updatedAt
            createdAt
            categories
            content {
              json
            }
          }
        }
      }
    }
  `;

  const response = (await graphQLClient.request(query)) as FetchPostResponse;

  return response.postsConnection?.edges;
};

const getPost = async ({
  slug,
  disableCache = false,
}: {
  slug: string;
  disableCache?: boolean;
}) => {
  const query = gql`
    query FetchPost($slug: String!) {
      postsConnection(where: { slug: $slug }) {
        edges {
          node {
            id
            title
            slug
            thumbnail {
              url
            }
            excerpt
            updatedAt
            createdAt
            categories
            content {
              json
            }
          }
        }
      }
    }
  `;

  if (disableCache) {
    const timestamp = new Date().getTime();
    const response = await graphQLClient.request(query, { slug, timestamp });
    return response as FetchPostResponse;
  } else {
    const response = await graphQLClient.request(query, { slug });
    return response as FetchPostResponse;
  }
};

export { getPosts, getPost };
