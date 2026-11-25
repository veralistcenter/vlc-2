import {
  EventQuery,
  ExhibitionQuery,
  PublicationQuery,
  AnnouncementQuery,
} from "@/services/Thumbs";

export const Body = (page) => `bodyField{
  body{
    __typename

    ...on ${page}_Bodyfield_Body_Richtext{
      text
      title
    }

    ...on ${page}_Bodyfield_Body_RelatedColumn{
      title
      columnSide
      relatedPages{
        __typename
        ... on Event{
          ${EventQuery}
        }
        ... on Exhibition{
          ${ExhibitionQuery}
        }
        ... on Publication{
          ${PublicationQuery}
        }
      }
    }

    ... on ${page}_Bodyfield_Body_Pullquote{
      quoteTitle
      quoteText
      quotePosition
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
          mediaItemUrl
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
        title
        mediaItemUrl
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
        __typename
        ...on Announcement{
          ${AnnouncementQuery}
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
          ${PublicationQuery}
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

    ...on ${page}_Bodyfield_Body_Donations{
      text
      title
    }
  }
}`;
