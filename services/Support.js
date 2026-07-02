import { Body } from "@/services/Matrix";

export const SupportPages = `supportPages: supports{
  edges{
    node{
      title
      slug
      ${Body("Support")}
    }
  }
}`;
