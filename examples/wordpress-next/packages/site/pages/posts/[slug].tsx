import { NextPageContext } from 'next';
import React from 'react';
import styled from 'styled-components';
import { get } from 'unchanged';
import { apiFetch, GraphQLResponse } from '../../api';
import { Box, Container, Text } from '../../components/common';
import Spinner from '../../components/Spinner';
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

function Posts({ data, errors }: GraphQLResponse) {
  if (errors) {
    return (
      <BasicTemplate>
        <Container>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Container>
      </BasicTemplate>
    );
  }

  const pending = !data || !data.post;

  if (pending) {
    return (
      <BasicTemplate>
        <Spinner />
      </BasicTemplate>
    );
  }

  const { content, dateCreated, featuredMedia, title } = data.post;
  const featuredImage = get('sizes.full.url', featuredMedia);

  return (
    <BasicTemplate>
      <Container
        $direction="column"
        $maxWidth="800px"
        $p={[2, 0]}
        style={{ textAlign: 'center' }}
      >
        <Text as="h1" dangerouslySetInnerHTML={{ __html: title }} />

        <Text as="div" $color="sandstone" $fontSize="2" $pt={2}>
          {dateCreated}
        </Text>

        <Box $py={[3, 4]}>
          <img alt={featuredImage} src={featuredImage} width="100%" />
        </Box>
      </Container>

      <Container $direction="column" $maxWidth="600px" $p={[2, 0]}>
        <Article dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </BasicTemplate>
  );
}

Posts.getInitialProps = ({ query }: NextPageContext) => {
  return apiFetch({
    query: /* GraphQL */ `
      query getPost($preview: Boolean, $slug: String!) {
        post(preview: $preview, slug: $slug) {
          content
          dateCreated(format: "LLLL dd, yyyy")
          featuredMedia {
            sizes {
              full {
                url
              }
            }
          }
          title
        }
      }
    `,
    variables: { preview: query.preview === 'true', slug: query.slug }
  });
};

export default Posts;
