import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { apiFetch, GraphQLQuery, GraphQLResponse } from '../../api';
import { Container } from '../../components/Base';
import Spinner from '../../components/Spinner';
import BasicTemplate from '../../templates/Basic';
import { NextPageContext } from 'next';

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

  const pending = !data || !data.allPost;

  if (pending) {
    return (
      <BasicTemplate>
        <Spinner />
      </BasicTemplate>
    );
  }

  const { content, featuredMedia, title } = data.allPost[0];

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
      query getPost($slug: String!) {
        allPost(filter: { slug: { eq: $slug } }) {
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
    variables: { slug: query.slug }
  });
};

Posts.propTypes = {
  data: PropTypes.shape({
    allPost: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        featuredMedia: PropTypes.shape({
          sizes: PropTypes.shape({
            full: PropTypes.shape({
              url: PropTypes.string.isRequired
            })
          })
        }),
        title: PropTypes.string.isRequired
      })
    )
  }),
  errors: PropTypes.array
};

export default Posts;
