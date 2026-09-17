export const KINETIX_WHATSAPP_NUMBER = "254792656824";
export const KINETIX_WHATSAPP_DISPLAY = "+254 792 656 824";

export function whatsappLink(message: string): string {
  return `https://wa.me/${KINETIX_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function businessConceptMessage(businessName: string): string {
  return `Hi Kinetix Africa, I'm interested in the SiteAtlas website concept created for ${businessName}. I'd like to discuss getting a similar website.`;
}

export function generalEnquiryMessage(): string {
  return "Hi Kinetix Africa, I found SiteAtlas and I'd like to talk about a website for my business.";
}

export function categoryEnquiryMessage(categoryName: string): string {
  return `Hi Kinetix Africa, I've been looking at the ${categoryName} concepts on SiteAtlas. I'd like to discuss a website for my business.`;
}
