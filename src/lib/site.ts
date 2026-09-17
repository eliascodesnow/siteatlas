export const SITE_NAME = "SiteAtlas";
export const STUDIO_NAME = "Kinetix Africa";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export function conceptDisclosure(businessName: string): string {
  return `Website concept by Kinetix Africa. This is an independent design concept and is not the official website of ${businessName}. Menus, listings and imagery are illustrative; stock photography does not depict the business, its staff or its premises.`;
}
