import Link from 'next/link';
import React from 'react';
import { get } from 'unchanged';
import { apiFetch, GraphQLResponse } from '../../api';
import { Container } from '../../components/Base';
import { Box, PostList } from '../../components/Posts/components';
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
        <Spinner />
      </BasicTemplate>
    );
  }

  return (
    <BasicTemplate>
      <Container>
        <h1>Posts</h1>

        <PostList>
          {data.allPost.map(({ featuredMedia, path, title }) => (
            <Box background={get('sizes.medium.url', featuredMedia)} key={path}>
              <Link href={path}>
                <a>{title}</a>
              </Link>
            </Box>
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
