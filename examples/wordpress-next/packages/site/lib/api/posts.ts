import { apiFetch } from 'api';

export async function fetchPostWithSlug(slug: string) {
  type FetchPostResponse = {
    date: string;
    content: string;
    title: string;
    featuredImage: {
      node: {
        altText: string;
        sourceUrl: string;
        srcSet: string;
      };
    };
  };

  const fetchPostQuery = /* GraphQL */ `
    query fetchPost($slug: ID!) {
      post(id: $slug, idType: URI) {
        date
        content(format: RENDERED)
        title(format: RENDERED)
        featuredImage {
          node {
            altText
            sourceUrl(size: MEDIUM_LARGE)
            srcSet
          }
        }
      }
    }
  `;

  const response = await apiFetch<{ post: FetchPostResponse }>({
    query: fetchPostQuery,
    variables: { slug: `/posts/${slug}` }
  });

  return response.data.post;
}
