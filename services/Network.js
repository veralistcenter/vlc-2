import { EventQuery, featImage, ExhibitionQuery } from '@/services/Thumbs'


export const Network100 = `networks: networks(where: {orderby: {field: MODIFIED, order: ASC}}, first: 100) {
  edges {
    node {
      title
      slug
      networkInformation{
        type
      }
    }
  }
}`

export const Network = `networks(first: 200, where: {orderby: {order: ASC, field: TITLE}}){
  
	pageInfo{
		hasNextPage
		endCursor
	}
  edges{
    node{
      title
      slug

      networkInformation{
        type
        nameToBeAlphabetized
      }

      networkTypes{
        edges{
          node{
            name
            slug
          }
        }
      }
    }
  }
}`


export const AdditionalNetwork = cursor => `moreNetwork: networks(first: 200, after: "${cursor}", where: {orderby: {order: ASC, field: DATE}}){
  pageInfo {
    hasNextPage
    endCursor
  }
  edges {
    node {
      title
      slug

      networkInformation{
        type
        nameToBeAlphabetized
      }

      networkTypes{
        edges{
          node{
            name
            slug
          }
        }
      }
    }
  }
}`


export const Item = slug => `network (id: "${slug}", idType: SLUG) {
  title
  slug

  ${featImage}

  networkTypes{
    edges{
      node{
        name
        slug
      }
    }
  }
  networkInformation{
    networkList{
      name
      slug
    }
    type
    externalLink{
      networkRelatedPages
      makeExternalLink
      externalLinkUrl
    }
  }
  
  networkPreview{
    subtitle
    description
    button{
      buttonLink
      buttonName
    }
  }
  
  pageFormat{
    pageLength
    shortBody
    body{
      __typename
      ...on Network_Pageformat_Body_Button{
        buttonFile{
          sourceUrl
        }
        buttonLink
        buttonName
      }
      
      ...on Network_Pageformat_Body_Gallery{
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
      
      ...on Network_Pageformat_Body_Richtext{
        title
        text
      }
      
      ...on Network_Pageformat_Body_Accordian{
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
      
      ...on Network_Pageformat_Body_AudioPlayer{
        audioFile{
          sourceUrl
        }
      }
      
      ...on Network_Pageformat_Body_VideoPlayer{
        title
        caption
        vimeoUrl
      }
      
      ...on Network_Pageformat_Body_RelatedPages{
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
}`