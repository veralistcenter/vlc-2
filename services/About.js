import { Body } from "@/services/Matrix";

export const AboutPages = `aboutPages: abouts(first: 27){
  edges{
    node{
      
      title
      slug
      
      ${Body("About")}
    }
  }
}`;
