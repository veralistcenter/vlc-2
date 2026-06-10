import {
  featImage,
  EventQuery,
  ExhibitionQuery,
  AnnouncementQuery,
  PublicationQuery,
} from "@/services/Thumbs";

export const Prize = (slug) => `prize (id: "${slug}", idType: SLUG) {
	title
  slug

  ${featImage}
  prizeInfo{
    title
    fullDescription

    dateRange{
      startingYear
      endingYear
    }

    correspondingPrizeTag{
      slug
      name
      id
    }
  }

}

prizeTaxonomy(id: "${slug}", idType: SLUG) {
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
