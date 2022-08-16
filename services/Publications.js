import { PublicationQuery } from '@/services/Thumbs'

export const PublicationOverview = `types: publicationTypes(first: 50){
    edges{
      node{
        ... on PublicationType{
          name
          slug
        }
      }
    }
  }
  
  formats: publicationFormats(first: 50){
    edges{
      node{
        ... on PublicationFormat{
          name
          slug
        }
      }
    }
  }

  taxonomy: sitewideTags(first: 400){
	  edges{
	    node{
	      ... on SitewideTag{
	        name
	        slug
	      }
	    }
	  }
	}

	focus: biennialTaxonomies{
    edges{
      node{
        ...on BiennialTaxonomy{
          slug
          name
        }
      }
    }
  }

  publications: publications (first: 400){
    edges{
      node{
        ...on Publication{
					${PublicationQuery}
        }
      }
    }
  }

  `