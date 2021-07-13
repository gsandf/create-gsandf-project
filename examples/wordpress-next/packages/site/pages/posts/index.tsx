import { BasicGrid, Box, Container, Text } from '@gsandf/ui';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import { apiFetch, defaultCacheTime } from '../../api';
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

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Posts(props: Props) {
  return (
    <BasicTemplate>
      <Box as="header" $bgColor="primary" $color="onPrimary" $py={28}>
        <Container $px={4}>
          <h1>Posts</h1>
        </Container>
      </Box>

      <Container $py={16}>
        <BasicGrid columns={[1, , 2, 3]} spacing={[4, , 6]}>
          {props.posts.nodes.map(({ featuredImage, slug, title }) => (
            <Link href={`/posts/${slug}`} key={slug}>
              <a style={{ textDecoration: 'none' }}>
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
              </a>
            </Link>
          ))}
        </BasicGrid>
      </Container>
    </BasicTemplate>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await apiFetch<PostProps>({
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

  return {
    props: response.data,
    revalidate: defaultCacheTime
  };
};

export default Posts;
