import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'unchanged';
import { apiFetch } from '../../api';
import { Container } from '../../components/Base';
import Spinner from '../../components/Spinner';
import BasicTemplate from '../../templates/Basic';
import { Box, PostList } from './components';

class Posts extends React.Component {
  static getInitialProps() {
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
  }

  static propTypes = {
    data: PropTypes.shape({
      allPost: PropTypes.arrayOf(
        PropTypes.shape({
          path: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    })
  };

  render() {
    const { data } = this.props;
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
              <Box
                background={get('sizes.medium.url', featuredMedia)}
                key={path}
              >
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
}

export default Posts;
