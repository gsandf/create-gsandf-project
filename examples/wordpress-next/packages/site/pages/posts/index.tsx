import Link from 'next/link';
import React from 'react';
import { get } from 'unchanged';
import { apiFetch, GraphQLResponse } from '../../api';
import { Box, Container } from '../../components/common';
import { PostBox, PostList } from '../../components/Posts/components';
import Spinner from '../../components/Spinner';
import BasicTemplate from '../../templates/Basic';

interface PostProps extends GraphQLResponse {
  data: {
    allPost: {
      slug: string;
      title: string;
      featuredMedia: {
        sizes: {
          medium_large: {
            url: string;
          };
        };
      };
    }[];
  };
}

function Posts({ data }: PostProps) {
  const pending = !data || !data.allPost;

  if (pending) {
    return (
      <BasicTemplate>
        <Box as="header" $bg="accent" $color="onAccent" $mb={3} $p={6}>
          <h1>Posts</h1>
        </Box>

        <Spinner />
      </BasicTemplate>
    );
  }

  return (
    <BasicTemplate>
      <Box as="header" $bg="accent" $color="onAccent" $p={6}>
        <h1>Posts</h1>
      </Box>

      <Container>
        <PostList>
          {data.allPost.map(({ featuredMedia, slug, title }) => (
            <PostBox
              background={get('sizes.medium_large.url', featuredMedia)}
              $bg="dark"
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

Posts.getInitialProps = () => {
  return apiFetch({
    query: /* GraphQL */ `
      query getPosts {
        allPost {
          slug
          title
          featuredMedia {
            sizes {
              medium_large {
                url
              }
            }
          }
        }
      }
    `
  });
};

export default Posts;
