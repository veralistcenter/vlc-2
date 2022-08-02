import { EventQuery, ExhibitionQuery } from '@/services/Thumbs'

export const Body = page => `bodyField{
  body{
    __typename
    
    ...on ${page}_Bodyfield_Body_Richtext{
      text
      title
    }
    
    ...on ${page}_Bodyfield_Body_Footnotes{
      text
    }
    
    ...on ${page}_Bodyfield_Body_Button{
      title
      buttonName
      buttonFile{
        sourceUrl
      }
      buttonLink
    }

    ...on ${page}_Bodyfield_Body_Accordian{
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
    
    ...on ${page}_Bodyfield_Body_SingleImage{
      imageSize
      image{
        sourceUrl
        altText
        srcSet
        caption
      }
    }
    
    ...on ${page}_Bodyfield_Body_Gallery{
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
    
    ... on ${page}_Bodyfield_Body_AudioPlayer{
      audioFile{
        sourceUrl
      }
    }
    
    ...on ${page}_Bodyfield_Body_VideoPlayer{
      vimeoUrl
      title
      caption
    }
    
    ...on ${page}_Bodyfield_Body_RelatedAnnouncements{
      title
      relatedPagesSize
      relatedPagesTitle
      relatedAnnouncements{
        ...on Announcement{
          title
          slug
        }
      }
    }
    
    ...on ${page}_Bodyfield_Body_RelatedPages{
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
    
    ...on ${page}_Bodyfield_Body_RelatedNetwork{
      title
      network{
        ...on Network{
          title
      		slug
        }
      }
    }
  }
}`