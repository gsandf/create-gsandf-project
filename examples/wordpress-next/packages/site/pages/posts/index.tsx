import Link from 'next/link';
import React from 'react';
import { get } from 'unchanged';
import { apiFetch, GraphQLResponse } from '../../api';
import { Container, Box } from '../../components/common';
import { PostBox, PostList } from '../../components/Posts/components';
import Spinner from '../../components/Spinner';
import BasicTemplate from '../../templates/Basic';

interface PostProps extends GraphQLResponse {
  data: {
    allPost: {
      path: string;
      title: string;
      featuredMedia: {
        sizes: {
          medium: {
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
        <Box as="header" bg="accent" color="onAccent" mb={3} p={6}>
          <h1>Posts</h1>
        </Box>

        <Spinner />
      </BasicTemplate>
    );
  }

  return (
    <BasicTemplate>
      <Box as="header" bg="accent" color="onAccent" mb={3} p={6}>
        <h1>Posts</h1>
      </Box>

      <Container>
        <PostList>
          {data.allPost.map(({ featuredMedia, path, title }) => (
            <PostBox
              background={get('sizes.medium.url', featuredMedia)}
              bg="dark"
              color="onDark"
              key={path}
            >
              <Link href={path}>
                <a>{title}</a>
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
          path
          title
          featuredMedia {
            sizes {
              medium {
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
