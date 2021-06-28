import { BasicGrid, Box, Container, Text } from '@gsandf/ui';
import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import { apiFetch } from '../../api';
import { PostBox } from '../../components/Posts/components';
import BasicTemplate from '../../templates/Basic';

interface PostProps {
  posts: {
    nodes: {
      slug: string;
      title: string;
      featuredImage?: {
        node: { sourceUrl: string };
      };
    }[];
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

function Posts({ data }: Props) {
  return (
    <BasicTemplate>
      <Box as="header" $bgColor="primary" $color="onPrimary" $py={28}>
        <Container $px={4}>
          <h1>Posts</h1>
        </Container>
      </Box>

      <Container $py={16}>
        <BasicGrid columns={[1, , 2, 3]} spacing={[4, , 6]}>
          {data.posts.nodes.map(({ featuredImage, slug, title }) => (
            <Link href={`/posts/${slug}`} key={slug}>
              <PostBox
                background={featuredImage?.node.sourceUrl ?? ''}
                $bgColor="dark"
                $color="onDark"
                $p={8}
              >
                <Text
                  dangerouslySetInnerHTML={{ __html: title }}
                  maxLineCount={2}
                  $fontSize={5}
                  $fontWeight="bold"
                />
              </PostBox>
            </Link>
          ))}
        </BasicGrid>
      </Container>
    </BasicTemplate>
  );
}

export async function getServerSideProps() {
  const props = await apiFetch<PostProps>({
    query: /* GraphQL */ `
      query getPosts {
        posts {
          nodes {
            slug
            title
            featuredImage {
              node {
                sourceUrl(size: MEDIUM)
              }
            }
          }
        }
      }
    `
  });

  return { props };
}

export default Posts;
