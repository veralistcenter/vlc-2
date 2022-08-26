import { Body } from '@/services/Matrix'

export const AboutPages = `aboutPages: abouts{
  edges{
    node{
      
      title
      slug
      
      ${ Body('About') }
    }
  }
}`