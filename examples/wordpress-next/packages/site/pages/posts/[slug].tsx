import * as datefns from 'date-fns';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import styled from 'styled-components';
import { apiFetch } from '../../api';
import { Box, Container, Text } from '../../components/common';
import BasicTemplate from '../../templates/Basic';

const Article = styled.article`
  img {
    height: auto;
    max-width: 100%;
  }

  img,
  iframe {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;

const formatDate = (dateString: string) =>
  datefns.format(new Date(dateString), 'MMMM d, yyyy');

function Posts(props: PostProps) {
  return (
    <BasicTemplate>
      <Container
        $direction="column"
        $maxWidth="800px"
        $p={[2, 0]}
        style={{ textAlign: 'center' }}
      >
        <Text as="h1" dangerouslySetInnerHTML={{ __html: props.title }} />

        <Text as="div" $fontSize="2" $fontStyle="italic" $pt={2}>
          {formatDate(props.date)}
        </Text>

        <Box $py={[3, 4]}>
          <img
            alt={props.featuredImage.altText}
            src={props.featuredImage.sourceUrl}
            srcSet={props.featuredImage.srcSet}
            style={{ maxWidth: '100%' }}
          />
        </Box>
      </Container>

      <Container $direction="column" $maxWidth="600px" $p={[2, 0]}>
        <Article dangerouslySetInnerHTML={{ __html: props.content }} />
      </Container>
    </BasicTemplate>
  );
}

interface PostProps {
  date: string;
  content: string;
  excerpt: string;
  title: string;
  featuredImage: {
    altText: string;
    sourceUrl: string;
    srcSet: string;
  };
}

interface ServerSidePropsArgs extends GetServerSidePropsContext {
  params: { slug: string };
}

export async function getServerSideProps({ params }: ServerSidePropsArgs) {
  const query = /* GraphQL */ `
    query getPost($slug: ID!) {
      post(id: $slug, idType: URI) {
        date
        content(format: RENDERED)
        excerpt(format: RENDERED)
        title(format: RENDERED)
        featuredImage {
          altText
          sourceUrl(size: MEDIUM_LARGE)
          srcSet
        }
      }
    }
  `;

  const { data } = await apiFetch({
    query,
    variables: {
      slug: params.slug
    }
  });

  return {
    props: data.post
  };
}

export default Posts;
