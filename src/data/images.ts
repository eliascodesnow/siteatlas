/**
 * Curated stock photography pools (Pexels). Images are licensed stock imagery
 * used to illustrate concepts – they are never presented as photographs of
 * the actual business, its staff or its premises.
 */
export interface PoolImage {
  id: number;
  alt: string;
}

export const IMAGE_POOLS: Record<string, PoolImage[]> = {
  restaurant: [
    { id: 13772595, alt: "Grilled fish plated with asparagus and a bright sauce" },
    { id: 37923425, alt: "Chef seasoning an avocado dish in a restaurant kitchen" },
    { id: 27612507, alt: "A plated dish with colourful sauce and garnish" },
    { id: 29101361, alt: "Vegetables arranged on a white plate" },
    { id: 27612522, alt: "Seafood dish plated with herbs" },
    { id: 15580733, alt: "Roasted meat served with vegetables" },
    { id: 35336025, alt: "A set dinner table with salads and glassware" },
    { id: 29259649, alt: "A plated dessert with sauce" },
  ],
  grill: [
    { id: 37128330, alt: "A platter of grilled meats" },
    { id: 12087794, alt: "Meat skewers cooking over charcoal" },
    { id: 15711722, alt: "Skewers being prepared in a kitchen" },
    { id: 12087792, alt: "Close-up of skewered meat on a grill" },
    { id: 38602968, alt: "Grilled skewers on an outdoor barbecue" },
    { id: 35336025, alt: "A set dinner table with salads and glassware" },
    { id: 15580733, alt: "Roasted meat served with vegetables" },
  ],
  cafe: [
    { id: 19571937, alt: "A barista preparing coffee at an espresso machine" },
    { id: 19560976, alt: "A barista pulling a shot in a modern café" },
    { id: 29462802, alt: "Overhead view of a barista crafting coffee" },
    { id: 13305631, alt: "Coffee bar with an espresso machine and stacked cups" },
    { id: 16999510, alt: "A barista behind a café counter" },
    { id: 33975940, alt: "Espresso machine and grinders in a café" },
    { id: 32265890, alt: "Close-up of an espresso machine and cups" },
    { id: 34261437, alt: "A barista making coffee at an espresso machine" },
  ],
  bakery: [
    { id: 7405059, alt: "Breads and pastries in a bakery display case" },
    { id: 33043943, alt: "Fresh croissants at a market stall" },
    { id: 29380136, alt: "Assorted pastries dusted with sugar" },
    { id: 30853716, alt: "Golden croissants lined up in a bakery" },
    { id: 29380155, alt: "An artisan bakery interior with fresh bread" },
    { id: 38279077, alt: "Croissants and breadsticks in a display case" },
  ],
  barber: [
    { id: 7447148, alt: "A barber shaping a client's hair with clippers" },
    { id: 12464841, alt: "Close-up of a razor fade in progress" },
    { id: 7447150, alt: "A barber trimming an afro with scissors and comb" },
    { id: 7447136, alt: "A client in a cape receiving a haircut" },
    { id: 7697390, alt: "A barber giving a precise cut in a barbershop" },
    { id: 34702982, alt: "A barber trimming a young man's hair" },
    { id: 7697358, alt: "A boy getting a haircut with electric clippers" },
  ],
  salon: [
    { id: 7755680, alt: "A woman receiving a hair treatment in a bright salon" },
    { id: 11360227, alt: "A hair wash at a salon basin" },
    { id: 7755244, alt: "A woman with curly hair getting a manicure" },
    { id: 7755473, alt: "A woman having her hair washed at a salon" },
    { id: 7990108, alt: "A manicure in progress at a modern salon" },
    { id: 7755447, alt: "A client relaxing during a hair wash" },
    { id: 23349891, alt: "Close-up of a professional hair wash" },
    { id: 7755663, alt: "A young woman at a beauty salon basin" },
  ],
  hotel: [
    { id: 30165023, alt: "A beachfront resort pool at sunset" },
    { id: 30370495, alt: "An outdoor pool surrounded by greenery" },
    { id: 37790193, alt: "A lodge terrace with sun loungers and a timber pergola" },
    { id: 30370492, alt: "Sun loungers beside a resort pool" },
    { id: 7974839, alt: "A hotel pool lit at night" },
    { id: 30370493, alt: "A resort pool with tropical planting" },
    { id: 14036440, alt: "Sun umbrellas beside a tropical resort pool" },
    { id: 37700633, alt: "A poolside with palm trees" },
  ],
  coast: [
    { id: 20693413, alt: "A beachfront house among palm trees on the Kenyan coast" },
    { id: 27742235, alt: "A palm-lined beach in Mombasa" },
    { id: 20693411, alt: "A seaside resort among palm trees" },
    { id: 38376805, alt: "A tropical beach with turquoise water" },
    { id: 2549017, alt: "Coconut palms beside white sand and clear water" },
    { id: 30165023, alt: "A beachfront resort pool at sunset" },
    { id: 14036440, alt: "Sun umbrellas beside a tropical resort pool" },
  ],
  safari: [
    { id: 35718626, alt: "A herd of elephants crossing the Maasai Mara" },
    { id: 18960157, alt: "Two elephants walking in the savannah near Narok" },
    { id: 30705567, alt: "A mother and calf elephant in the Mara grasslands" },
    { id: 19294855, alt: "Elephants under a wide cloudy sky" },
    { id: 15994110, alt: "Elephants with a calf walking through grass" },
    { id: 20335122, alt: "An elephant in the savannah" },
    { id: 30221306, alt: "An elephant at dusk in tall grass" },
    { id: 24181855, alt: "An elephant grazing in the Maasai Mara" },
  ],
  property: [
    { id: 8146330, alt: "A bright empty room with hardwood floors and a large window" },
    { id: 27459248, alt: "A contemporary apartment façade with glass balconies" },
    { id: 37224965, alt: "Multi-storey apartment buildings under a clear sky" },
    { id: 29174530, alt: "A modern apartment building exterior" },
    { id: 30094324, alt: "Apartment balconies against a blue sky" },
    { id: 37666086, alt: "A contemporary building with yellow accents" },
    { id: 18082442, alt: "A new apartment block under construction" },
    { id: 18082446, alt: "A crane beside apartment buildings under construction" },
  ],
  fashion: [
    { id: 5698862, alt: "A woman browsing clothing in a boutique" },
    { id: 8484204, alt: "A woman beside a rack of colourful garments" },
    { id: 8387127, alt: "Women choosing outfits in a boutique" },
    { id: 8311880, alt: "Two women browsing clothes in a fashion store" },
    { id: 7990522, alt: "A woman holding a coat in a store" },
    { id: 13282014, alt: "Blue dresses in a boutique window" },
    { id: 8387833, alt: "A woman with a pink dress in a boutique" },
    { id: 18260811, alt: "A retail window display of garments" },
  ],
  furniture: [
    { id: 6758238, alt: "Sofas and coffee tables in a furniture showroom" },
    { id: 7535062, alt: "A furniture store display with a bed and dining table" },
    { id: 6758247, alt: "A cupboard beside a dining table in a showroom" },
    { id: 33349417, alt: "A living room with blue and beige sofas" },
    { id: 7535031, alt: "A sofa with cushions in a modern apartment" },
    { id: 7195558, alt: "A living room with a sofa and glass table" },
  ],
  auto: [
    { id: 18108314, alt: "Cars displayed in a modern showroom" },
    { id: 4895455, alt: "A technician inspecting a car engine" },
    { id: 33814734, alt: "A repair workshop with vehicles being serviced" },
    { id: 14908957, alt: "A technician polishing a car body" },
    { id: 8985969, alt: "A car engine under an open bonnet" },
    { id: 10182845, alt: "Black sports cars in a garage" },
    { id: 9702389, alt: "Cars parked in a covered showroom" },
    { id: 35532902, alt: "Detail of a classic car door" },
  ],
  gym: [
    { id: 28805366, alt: "A man lifting weights in a gym" },
    { id: 6388359, alt: "A man stretching in a gym" },
    { id: 32695898, alt: "Two women in athletic wear in a modern gym" },
    { id: 4804337, alt: "A man doing push-ups on kettlebells" },
    { id: 5750817, alt: "A boxer standing in front of a punching bag" },
    { id: 4804346, alt: "A man skipping rope in a gym" },
  ],
  office: [
    { id: 38649010, alt: "Professionals in a business meeting" },
    { id: 8547282, alt: "Colleagues reviewing work on a laptop" },
    { id: 12179672, alt: "Two businessmen in conversation on a city street" },
    { id: 8547285, alt: "A team in discussion around a wooden table" },
    { id: 7993903, alt: "Two professionals discussing a project" },
    { id: 8550500, alt: "Three colleagues meeting in an office" },
    { id: 6950050, alt: "A meeting in a modern conference room" },
    { id: 7793926, alt: "Colleagues brainstorming in a bright office" },
  ],
  tech: [
    { id: 6804068, alt: "A development team at their workstations" },
    { id: 1181467, alt: "A woman coding on a laptop with multiple monitors" },
    { id: 7988745, alt: "Two professionals collaborating at a desk" },
    { id: 1181271, alt: "A laptop displaying code" },
    { id: 6804594, alt: "A programmer working in a modern office" },
    { id: 34804011, alt: "Close-up of code on a laptop screen" },
  ],
  photography: [
    { id: 32092180, alt: "A photographer adjusting a camera in a studio" },
    { id: 16135656, alt: "A photographer aiming her camera in a studio" },
    { id: 36182206, alt: "A studio lighting setup with a seated model" },
    { id: 16135648, alt: "A woman using a professional camera" },
    { id: 39164922, alt: "A photographer taking a shot in a studio" },
    { id: 33714946, alt: "A photographer working with studio lighting" },
  ],
  events: [
    { id: 35985211, alt: "An indoor reception with floral arrangements" },
    { id: 29040997, alt: "Elegant tables at a reception" },
    { id: 16120244, alt: "Reception tables with floral centrepieces and candles" },
    { id: 16935999, alt: "A banquet setting with vibrant flowers" },
    { id: 16120136, alt: "A table setting with roses and crystal glassware" },
    { id: 17315445, alt: "Glassware and flowers at a reception" },
  ],
  construction: [
    { id: 7937687, alt: "An architect examining plans in a new building" },
    { id: 6474459, alt: "An architect with a tablet on a construction site" },
    { id: 7937664, alt: "An architect inspecting an unfinished interior" },
    { id: 7937740, alt: "An architect leaving a building with drawings" },
    { id: 7937758, alt: "An architect inspecting a glass door" },
    { id: 6566822, alt: "Two people reviewing an interior wall during renovation" },
    { id: 7937963, alt: "Checking wall alignment during a renovation" },
    { id: 6474469, alt: "Using a tablet inside an unfinished interior" },
  ],
  education: [
    { id: 34526416, alt: "Students collaborating in a classroom" },
    { id: 34162713, alt: "Students concentrating in class" },
    { id: 5905554, alt: "A teacher explaining a task at a whiteboard" },
    { id: 27769510, alt: "Students in a lecture hall" },
    { id: 34162719, alt: "Students at an indoor assembly" },
    { id: 36467885, alt: "Students gathered in a classroom" },
  ],
  nairobi: [
    { id: 29069329, alt: "The Nairobi skyline at dusk" },
    { id: 9833512, alt: "Nairobi skyscrapers and greenery" },
    { id: 15496531, alt: "Clouds over the Nairobi skyline" },
    { id: 15496542, alt: "Aerial view of the Nairobi expressway" },
    { id: 9833514, alt: "Nairobi skyline seen from Uhuru Park" },
    { id: 9833517, alt: "Nairobi cityscape with towers" },
  ],
  dental: [
    { id: 4269268, alt: "A modern dental treatment room" },
    { id: 5355863, alt: "A dental clinic with blue chairs" },
    { id: 6627668, alt: "Dental instruments in a clinic" },
    { id: 6502344, alt: "Close-up of dental handpieces" },
  ],
};

export function poolImage(pool: string, index: number): PoolImage {
  const list = IMAGE_POOLS[pool] ?? IMAGE_POOLS.nairobi;
  return list[((index % list.length) + list.length) % list.length];
}

export function poolSize(pool: string): number {
  return (IMAGE_POOLS[pool] ?? IMAGE_POOLS.nairobi).length;
}

export function pexelsUrl(id: number, width = 1600, height?: number): string {
  const h = height ? `&h=${height}&fit=crop` : "";
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}${h}`;
}
