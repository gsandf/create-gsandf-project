import { get } from 'unchanged';
import { wpFetch } from '../api';
import { filterArray } from '../utils';

export const postFields = /* GraphQL */ `
  dateCreated: DateTime! @formatDate
  dateModified: DateTime! @formatDate
  id: ID!
  path: String!
  slug: String!
  status: PostStatus!
  template: String
  title: String!
  type: String!
`;

export const postFilterFields = /* GraphQL */ `
  dateCreated: FilterableDateTime
  dateModified: FilterableDateTime
  id: FilterableInt
  path: FilterableString
  slug: FilterableString
  status: FilterableString
  template: FilterableString
  title: FilterableString
  type: FilterableString
`;

export const resolvers = {
  Media: {
    altText: parent => parent.alt_text,
    sizes: parent => parent.media_details.sizes
  },
  MediaSize: {
    url: parent => parent.source_url
  },
  Page: {
    content: parent => parent.content.rendered,
    excerpt: parent => parent.excerpt.rendered,
    featuredMedia: ({ featured_media: featuredMedia }) => {
      if (!featuredMedia) return null;
      return wpFetch('/wp/v2/media/:id', {
        urlParams: { id: featuredMedia }
      });
    }
  },
  Post: {
    content: parent => parent.content.rendered,
    excerpt: parent => parent.excerpt.rendered,
    featuredMedia: ({ featured_media: featuredMedia }) => {
      if (!featuredMedia) return null;
      return wpFetch('/wp/v2/media/:id', {
        urlParams: { id: featuredMedia }
      });
    }
  },
  PostStatus: {
    ACF_DISABLED: 'acf-disabled',
    ANY: 'any',
    AUTO_DRAFT: 'auto-draft',
    DRAFT: 'draft',
    FUTURE: 'future',
    INHERIT: 'inherit',
    PENDING: 'pending',
    PRIVATE: 'private',
    PUBLISH: 'publish',
    REQUEST_COMPLETED: 'request-completed',
    REQUEST_CONFIRMED: 'request-confirmed',
    REQUEST_FAILED: 'request-failed',
    REQUEST_PENDING: 'request-pending',
    TRASH: 'trash'
  },
  Query: {
    allPage: (_, { filter }) =>
      wpFetch('/wp/v2/pages').then(data => filterArray(data, filter)),
    allPost: (_, { filter }) =>
      wpFetch('/wp/v2/posts').then(data => filterArray(data, filter)),
    page: async (_, { id, preview, slug }) => {
      if (!id) {
        if (!slug) {
          throw new Error('either `id` or `slug` is required');
        }

        id = await wpFetch('/wp/v2/pages', { query: { slug } }).then(pages =>
          get('0.id', pages)
        );
      }

      const pageData = await wpFetch('/wp/v2/pages/:id', { urlParams: { id } });

      if (preview) {
        return wpFetch(get('_links.version-history.0.href', pageData)).then(
          results => results[0]
        );
      }

      return pageData;
    },
    post: async (_, { id, preview, slug }) => {
      if (!id) {
        if (!slug) {
          throw new Error('either `id` or `slug` is required');
        }

        id = await wpFetch('/wp/v2/posts', { query: { slug } }).then(posts =>
          get('0.id', posts)
        );
      }

      const postData = await wpFetch('/wp/v2/posts/:id', { urlParams: { id } });

      if (preview) {
        return wpFetch(get('_links.version-history.0.href', postData)).then(
          results => results[0]
        );
      }

      return postData;
    }
  }
};

export const typeDefs = /* GraphQL */ `
  """
  A generic type that allows valid object.
  """
  scalar JSON

  type Media {
    ${postFields}
    altText: String
    link: String
    sizes: MediaSizes
  }

  type MediaSizes {
     full: MediaSize
     large: MediaSize
     medium_large: MediaSize
     medium: MediaSize
     thumbnail: MediaSize
  }

  type MediaSize {
    height: Int!
    width: Int!
    url: String!
  }

  type Page {
    ${postFields}
    content: String
    excerpt: String
    featuredMedia: Media
  }

  type Post {
    ${postFields}
    content: String
    excerpt: String
    featuredMedia: Media
  }

  input PostFilter {
    ${postFilterFields}
    content: FilterableString
    excerpt: FilterableString
  }

  enum PostStatus {
    ACF_DISABLED
    ANY
    AUTO_DRAFT
    DRAFT
    FUTURE
    INHERIT
    PENDING
    PRIVATE
    PUBLISH
    REQUEST_COMPLETED
    REQUEST_CONFIRMED
    REQUEST_FAILED
    REQUEST_PENDING
    TRASH
  }

  extend type Query {
    allPage(filter: PostFilter): [Page]
    allPost(filter: PostFilter): [Post]
    page(id: ID, preview: Boolean, slug: String): Page
    post(id: ID, preview: Boolean, slug: String): Post
  }
`;
