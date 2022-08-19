import {featImage, PublicationQuery, EventQuery, ExhibitionQuery } from '@/services/Thumbs'

import { Body } from '@/services/Matrix'

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


export const Publication = slug => `publication (id: "${slug}", idType: SLUG) {
  title
  slug


  ${featImage}
  
  
  related{
    relatedPages{
      __typename
      ...on Event{
        ${EventQuery}
      }
      ...on Exhibition{
        ${ExhibitionQuery}
      }
      ... on Publication{
        ${PublicationQuery}
      }
    }
    relatedPagesSize
    relatedPagesTitle
  }
  
  networkRelation{
    associatedNetwork{
      ...on Network{
        title
        slug
        networkInformation{
          nameToBeAlphabetized
        }
      }
    }
  }

  pageInfo: publicationInfo{
    date

    showFeatured: hideFeatured
    featuredMedia{
      featIssuuIframe
      featAudioFile{
        mediaItemUrl
        altText
        title
        caption
      }
      featVideoFile
      
      featuredSlides20220816{
          
        slideImage{
          sourceUrl
          srcSet
          altText
          caption
        }
        
      }
      
    }

    previewInfo{
      primaryDescription
      secondaryDescription
      author
      button{
        buttonLink
        buttonName
      }
      
      associatedBiennial{
        ...on Biennial{
          title
          slug
        }
      }

    }


  }

  publicationTypes{
    edges{
      node{
        name
        slug
      }
    }
  }

  publicationFormats{
    edges{
      node{
        name
        slug
      }
    }
  }

  sitewideTags{
    edges{
      node{
        name
        slug
      }
    }
  }

  biennialTaxonomies{
    edges{
      node{
        name
        slug
      }
    }
  }
  

  ${ Body('Publication') }
}`