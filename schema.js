import gql from 'graphql-tag';

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    calories: String
    price: Float
    image: String
  }

  type Logo {
    url: String!
    altText: String
  }

  type NavLink {
    label: String!
    href: String!
  }

  type DropdownLink {
    label: String!
    href: String!
  }

  type BannerImage {
    url: String!
    altText: String
  }

  type InfoBox {
    title: String!
    description: String
    linkText: String
    linkHref: String
  }

  type Category {
    category: String!
  }

  type Query {
    products: [Product]
    logo: Logo
    locationText: String
    navLinks: [NavLink]
    dropdownLinks: [DropdownLink]
    bannerImage: BannerImage
    boxes: [InfoBox]
    categories: [Category]
  }

  type Mutation {
    addProduct(name: String!, description: String, calories: String, price: Float, image: String): Product
  }
`;

export default typeDefs;