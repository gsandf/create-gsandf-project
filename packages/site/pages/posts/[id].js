import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { apiFetch } from '../../api';
import { Container } from '../../components/Base';
import Spinner from '../../components/Spinner';
import BasicTemplate from '../../templates/Basic';

const FeaturedImage = styled.div`
  background-image: url("${p => p.background}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 40vh;
  width: 100%;
`;

function Posts({ data, errors }) {
  const pending = !data || !data.post;

  if (pending) {
    return (
      <BasicTemplate>
        <Spinner />
      </BasicTemplate>
    );
  }

  if (errors) {
    return (
      <BasicTemplate>
        <Container>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Container>
      </BasicTemplate>
    );
  }

  return (
    <BasicTemplate>
      {data.post.featuredMedia && (
        <FeaturedImage background={data.post.featuredMedia.sizes.full.url} />
      )}

      <Container>
        <h1>{data.post.title}</h1>

        <Link href="/posts">
          <a>&larr; Back</a>
        </Link>

        <article dangerouslySetInnerHTML={{ __html: data.post.content }} />
      </Container>
    </BasicTemplate>
  );
}

Posts.getInitialProps = ({ query }) => {
  return apiFetch({
    query: /* GraphQL */ `
      query getPost($params: JSON) {
        post(urlParams: $params) {
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
    variables: {
      params: { id: query.id }
    }
  });
};

Posts.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.shape({
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
  }),
  errors: PropTypes.array
};

export default Posts;
