import { gql } from "@apollo/client";

export const MENUS_QUERY = gql`
  query MenusQuery {
    menus {
      label
      path
      blogs {
        title
        slug
        coverImage {
          url
        }
      }
    }
  }
`;

export const CORE_BLOG_FIELDS = gql`
  fragment BlogParts on Blog {
    id
    title
    stage
    createdAt
    publishedAt
    excerpt
    views
    content {
      json
      references {
        ... on Asset {
          id
          mimeType
          url
          width
          height
        }
      }
    }
    author {
      firstName
      lastName
      slug
      bio
      avatar {
        url
      }
    }
    seo
    slug
    id
    coverImage {
      thumbnail: url(
        transformation: {
          image: { resize: { width: 240, height: 160 } }
          document: { output: { format: webp } }
        }
      )
      medium: url(
        transformation: {
          image: { resize: { width: 320, height: 240 } }
          document: { output: { format: webp } }
        }
      )
      url(transformation: { document: { output: { format: webp } } })
    }
    tags
    categories {
      name
      slug
      id
    }
  }
`;

export const BLOG_QUERY = gql`
  ${CORE_BLOG_FIELDS}
  query BlogQuery($first: Int!, $after: String) {
    categories {
      name
      id
      slug
    }
    blogsConnection(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...BlogParts
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        pageSize
      }
    }
  }
`;

export const ARTICLE_QUERY = gql`
  ${CORE_BLOG_FIELDS}
  query ArticleQuery($slug: String!) {
    blog(where: { slug: $slug }) {
      ...BlogParts
      author {
        recentPosts: blogs(
          where: { NOT: { slug: $slug } }
          orderBy: publishedAt_ASC
          first: 3
        ) {
          categories {
            name
            slug
            id
          }
          id
          title
          slug
          createdAt
          publishedAt
          excerpt
          coverImage {
            url(transformation: { document: { output: { format: webp } } })
          }
        }
      }
    }
    menus {
      label
      path
      blogs {
        title
        slug
        coverImage {
          url
        }
      }
    }
  }
`;

export const UPDATE_BLOG_VIEWS = gql`
  mutation UpdateBlogViews($slug: String!, $views: Int!) {
    updateBlog(where: { slug: $slug }, data: { views: $views }) {
      views
    }
    publishBlog(where: { slug: $slug }, to: PUBLISHED) {
      slug
    }
  }
`;

export const BLOG_ON_CATEGORY_QUERY = gql`
  ${CORE_BLOG_FIELDS}
  query BlogOnCategoryQuery($first: Int!, $after: String, $slug: String!) {
    categories {
      name
      id
      slug
      seo
      image {
        url
      }
    }
    menus {
      label
      path
      blogs {
        title
        slug
        coverImage {
          url
        }
      }
    }
    blogsConnection(
      first: $first
      after: $after
      where: { categories_every: { slug: $slug } }
      orderBy: publishedAt_DESC
    ) {
      edges {
        cursor
        node {
          ...BlogParts
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        pageSize
      }
    }
  }
`;

export const BLOG_ON_AUTHOR_QUERY = gql`
  ${CORE_BLOG_FIELDS}
  query BlogOnAuthorQuery($first: Int!, $after: String, $slug: String!) {
    categories {
      name
      id
      slug
    }
    author(where: { slug: $slug }) {
      firstName
      lastName
      slug
      bio
      avatar {
        url
      }
    }
    menus {
      label
      path
      blogs {
        title
        slug
        coverImage {
          url
        }
      }
    }
    blogsConnection(
      first: $first
      after: $after
      where: { author: { slug: $slug } }
      orderBy: createdAt_DESC
    ) {
      edges {
        cursor
        node {
          ...BlogParts
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        pageSize
      }
    }
  }
`;

export const HOME_PAGE_QUERY = gql`
  ${CORE_BLOG_FIELDS}
  query HomePageQuery($first: Int!) {
    categories(
      where: { slug_in: ["design-ideas", "shopping", "expert-advice"] }
      orderBy: createdAt_DESC
      first: $first
    ) {
      name
      slug
      blogs {
        ...BlogParts
      }
    }
    blogs(where: { inCarousel: true }) {
      slug
      title
      excerpt
      coverImage {
        url
      }
    }
    menus {
      label
      path
      blogs {
        title
        slug
        coverImage {
          url
        }
      }
    }
  }
`;

export const CATEGORY_QUERY = gql`
  query CategoryQuery {
    categories {
      name
      id
      slug
      image {
        url
      }
    }
  }
`;

export const HOME_TRENDING_QUERY = gql`
  ${CORE_BLOG_FIELDS}
  query HomepageTrandingQuery($ids: [ID!]!) {
    blogs(orderBy: views_DESC, where: { id_not_in: $ids }) {
      ...BlogParts
    }
  }
`;

export const SEARCH_ARTICLE_QUERY = gql`
  ${CORE_BLOG_FIELDS}
  query SearchArticleQuery($query: String!) {
    blogs(where: { title_contains: $query }) {
      ...BlogParts
    }
    menus {
      label
      path
      blogs {
        title
        slug
        coverImage {
          url
        }
      }
    }
  }
`;

export const CAROUSEL_QUERY = gql`
  query {
    blogs(where: { inCarousel: true }) {
      slug
      title
      excerpt
      coverImage {
        url
      }
    }
  }
`;

export const ABOUT_PAGE_QUERY = gql`
  query AboutPageQuery {
    about(where: { id: "clad47ie69llj0bn3ufm8la0v" }) {
      description
      info {
        json
      }
      mission {
        json
      }
      team {
        json
        references {
          ... on Author {
            id
            lastName
            lastName
            bio
            avatar {
              url
            }
          }
        }
      }
    }
    menus {
      label
      path
      blogs {
        title
        slug
        coverImage {
          url
        }
      }
    }
  }
`;

export const BLOGS_QUERY = gql`
  ${CORE_BLOG_FIELDS}
  query BlogsQuery($first: Int!) {
    blogs(first: $first) {
      ...BlogParts
    }
  }
`;

export const AUTHORS_QUERY = gql`
  query AuthorsQuery {
    authors {
      firstName
      lastName
      slug
      bio
      avatar {
        url
      }
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query CategoriesQuery {
    categories {
      name
      id
      slug
    }
  }
`;
