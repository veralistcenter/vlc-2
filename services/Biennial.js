import {featImage, EventQuery, ExhibitionQuery, AnnouncementQuery, PublicationQuery } from '@/services/Thumbs'

export const Biennial = slug => `biennial (id: "${slug}", idType: SLUG) {
	title
  slug

  ${featImage}
  biennialInfo{
    fullDescription

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
  networks{
    edges{
      node{
        title
        slug
      }
    }
  }
  
  events(
    where: {orderby: {order: ASC, field: DATE}}
  ){
    edges{
      node{
        ${EventQuery}
      }
    }
  }

  exhibitions(
    where: {orderby: {order: ASC, field: DATE}}
  ){
    edges{
      node{
        ${ExhibitionQuery}
      }
    }
  }
  
  announcements(
    where: {orderby: {order: ASC, field: DATE}}
  ){
    edges{
      node{
        ${AnnouncementQuery}
      }
    }
  }

  publications(
    where: {orderby: {order: ASC, field: TITLE}}
  ){
    edges{
      node{
        ${PublicationQuery}
      }
    }
  }
  
}`