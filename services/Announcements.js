import { Body } from '@/services/Matrix'


import { 
  EventQuery, 
  ExhibitionQuery,
  featImage
} from '@/services/Thumbs'

export const Announcement = slug => `announcement (id: "${slug}", idType: SLUG) {
	__typename
	title
	slug
	pageInfo: announcementFields{
	  date
	  previewInfo{
	    description
	    button{
	      buttonLink
	      buttonName
	    }
	    
	  }
	}

  ${featImage}

  networkRelation{
    associatedNetwork{
      __typename
      ...on Network{
        title
        slug
      }
    }
  }

  related{
    relatedPagesSize
    relatedPagesTitle
    relatedPages{
      __typename
      ...on Publication{
        title
      }
      
      ...on Exhibition{
        ${ExhibitionQuery}
      }

      ...on Event{
        ${EventQuery}
      }
    }
  }

  pageFormat{
  	shortBody
  	pageLength
  	body{
      __typename
      ...on Announcement_Pageformat_Body_Button{
        buttonFile{
          sourceUrl
        }
        buttonLink
        buttonName
      }
      
      ...on Announcement_Pageformat_Body_Gallery{
        title
        slide{
          slideTitle
          caption
          audioFile{
            sourceUrl
          }
          video
          image{
            sourceUrl
            altText
            srcSet
            caption
          }
        }
      }
      
      ...on Announcement_Pageformat_Body_Richtext{
        title
        text
      }
      
      ...on Announcement_Pageformat_Body_Accordian{
        title
        section{
          sectionText
          sectionImage{
            sourceUrl
            srcSet
            altText
            caption
          }
          sectionTitle
          sectionSubtitle
        }  
      }
      
      ...on Announcement_Pageformat_Body_AudioPlayer{
        audioFile{
          sourceUrl
        }
      }
      
      ...on Announcement_Pageformat_Body_VideoPlayer{
        title
        caption
        vimeoUrl
      }
      
      ...on Announcement_Pageformat_Body_RelatedPages{
        title
        relatedPagesTitle
        relatedPagesSize
        relatedPages{
          __typename
          ... on Event{
            ${EventQuery}
          }
          ... on Exhibition{
            ${ExhibitionQuery}
          }
          ... on Publication{
            title
          }
        }
      }
    }
  }

}`