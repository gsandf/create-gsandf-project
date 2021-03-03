import Link from 'next/link';
import React from 'react';
import { apiFetch, GraphQLResponse } from '../../api';
import { Box, Container } from '../../components/common';
import { PostBox, PostList } from '../../components/Posts/components';
import BasicTemplate from '../../templates/Basic';

interface PostProps extends GraphQLResponse {
  data: {
    posts: {
      nodes: {
        slug: string;
        title: string;
        featuredImage?: {
          sourceUrl: string;
        };
      }[];
    };
  };
}

function Posts({ data }: PostProps) {
  return (
    <BasicTemplate>
      <Box as="header" $bgColor="accent" $color="onAccent" $p={6}>
        <h1>Posts</h1>
      </Box>

      <Container>
        <PostList>
          {data.posts.nodes.map(({ featuredImage, slug, title }) => (
            <PostBox
              background={featuredImage?.sourceUrl ?? ''}
              $bgColor="dark"
              $color="onDark"
              key={slug}
            >
              <Link href={`/posts/${slug}`}>
                <a dangerouslySetInnerHTML={{ __html: title }} />
              </Link>
            </PostBox>
          ))}
        </PostList>
      </Container>
    </BasicTemplate>
  );
}

export async function getServerSideProps() {
  const props = await apiFetch({
    query: /* GraphQL */ `
      query getPosts {
        posts {
          nodes {
            slug
            title
            featuredImage {
              sourceUrl(size: MEDIUM)
            }
          }
        }
      }
    `
  });

  return { props };
}

export default Posts;
