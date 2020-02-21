import { NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { apiFetch, GraphQLResponse } from '../../api';
import { Container } from '../../components/Base';
import Spinner from '../../components/Spinner';
import BasicTemplate from '../../templates/Basic';

const FeaturedImage = styled.div<{ background: string }>`
  background-image: url("${p => p.background}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 40vh;
  width: 100%;
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

  const { content, featuredMedia, title } = data.post;

  return (
    <BasicTemplate>
      {featuredMedia && (
        <FeaturedImage background={featuredMedia.sizes.full.url} />
      )}

      <Container>
        <h1>{title}</h1>

        <Link href="/posts">
          <a>&larr; Back</a>
        </Link>

        <article dangerouslySetInnerHTML={{ __html: content }} />
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
