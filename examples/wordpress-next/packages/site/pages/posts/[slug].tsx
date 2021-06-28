import { Box, Container, Text, VStack } from '@gsandf/ui';
import * as datefns from 'date-fns';
import { fetchPostWithSlug } from 'lib/api';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React from 'react';
import styled from 'styled-components';
import BasicTemplate from '../../templates/Basic';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

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

function Posts(props: Props) {
  return (
    <BasicTemplate>
      <Container $direction="column" $maxWidth="600px" $p={[4, , 0]}>
        <VStack>
          <Text as="h1" dangerouslySetInnerHTML={{ __html: props.title }} />

          <Text as="div" $fontSize="2" $fontStyle="italic" $pt={2}>
            {formatDate(props.date)}
          </Text>
        </VStack>
      </Container>

      <Container $maxWidth="800px">
        <Box $py={[3, 4]}>
          <img
            alt={props.featuredImage.node.altText}
            src={props.featuredImage.node.sourceUrl}
            srcSet={props.featuredImage.node.srcSet}
            style={{ maxWidth: '100%' }}
          />
        </Box>
      </Container>

      <Container $direction="column" $maxWidth="600px" $p={[4, , 0]}>
        <Article dangerouslySetInnerHTML={{ __html: props.content }} />
      </Container>
    </BasicTemplate>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: await fetchPostWithSlug(ctx.params.slug as string)
  };
}

export default Posts;
