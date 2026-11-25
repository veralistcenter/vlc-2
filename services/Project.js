import {
  featImage,
  EventQuery,
  ExhibitionQuery,
  AnnouncementQuery,
  PublicationQuery,
} from "@/services/Thumbs";

export const Project = (slug) => `project (id: "${slug}", idType: SLUG) {
	title
  slug

  ${featImage}
  projectInfo{
    fullDescription

    dateRange{
      startingYear
      endingYear
    }

    correspondingProjectTag{
      slug
      name
      id
    }
  }

}

projectTaxonomy(id: "${slug}", idType: SLUG) {
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
  
}`;
