import { ExhibitionQuery } from '@/services/Thumbs'

export const RecentExhibitions = `recentExhibitions: exhibitions(
  first: 40
  where: {orderby: {order: ASC, field: DATE}}
){
  edges {
    node {
      ${ExhibitionQuery}
    }
  }
}`

export const Exhibitions = `exhibitions(where: {orderby: {order: ASC, field: DATE}}){
  edges {
    node {
      ${ExhibitionQuery}
    }
  }
}`

// divide into current, upcoming, past

export const Exhibition = ``