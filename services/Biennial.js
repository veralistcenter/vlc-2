import {
  featImage,
  EventQuery,
  ExhibitionQuery,
  AnnouncementQuery,
  PublicationQuery,
} from "@/services/Thumbs";

export const Biennial = (slug) => `biennial (id: "${slug}", idType: SLUG) {
	title
  slug

  ${featImage}
  biennialInfo{
    fullDescription

    associatedProject{
      ...on Project{
        title
        slug
      }
    }

    dateRange{
      startingYear
      endingYear
    }

    correspondingBiennialTag{
      slug
      name
      id
    }
  }

}

biennialTaxonomy(id: "${slug}", idType: SLUG) {
  networks(
  first: 50
  ){
    edges{
      node{
        title
        slug
      }
    }
  }
  
  events(
    first: 50 where: { orderby: {order: ASC, field: DATE}}
  ){
    edges{
      node{
        ${EventQuery}
      }
    }
  }

  exhibitions(
    first: 50 where: { orderby: {order: ASC, field: DATE}}
  ){
    edges{
      node{
        ${ExhibitionQuery}
      }
    }
  }
  
  announcements(
    first: 50 where: { orderby: {order: ASC, field: DATE}}
  ){
    edges{
      node{
        ${AnnouncementQuery}
      }
    }
  }

  publications(
    first: 50 where: { orderby: {order: ASC, field: TITLE}}
  ){
    edges{
      node{
        ${PublicationQuery}
      }
    }
  }
  
}`;
