import { GeneralCostingStatusEnum } from "./GeneralCostingStatusEnum";
import { HotelPlatoVoucherInterface } from "./HotelPlatoVoucherInterface";

export interface HotelCostingInterface {
  // private GeneralCostingStatus
  status: GeneralCostingStatusEnum;
  // private String
  costingId: string;
  // private String
  checkInDate: string;
  // private String
  checkOutDate: string;
  // private String
  checkInDateDisplay: string;
  // private String
  checkInMonthDisplay: string;
  // private String
  checkInDayOfWeek: string;
  // private String
  checkOutDateDisplay: string;
  // private String
  checkOutMonthDisplay: string;
  // private String
  checkOutDayOfWeek: string;
  // private List<RoomCostingVO>
  roomsInHotel: any;
  // private int
  numberOfNights: number;
  // private boolean
  discountApplied: boolean;
  // private String
  finalPrice: string;
  // private String
  marketingText: string;
  // private long
  cityId: number;
  // private String
  cityName: string;
  // private List<Property>
  amenities: any;
  // private String
  costingKey: string;
  // private String
  hotelQuery: string;
  // private DiffVO
  diffDetail: any;
  // private ReviewVOV2
  appReviews: any;

  // private int
  discountPercentage: number;
  // private boolean
  sale: boolean;
  // private boolean
  memberOnlyDeal: boolean;
  // private boolean
  pytRecommended: boolean;

  // private long
  checkInTs: number;
  // private long
  checkOutTs: number;
  // private String
  ourCost: string;
  // private boolean
  roomOffer: boolean;
  // private SourceProvider
  sourceProvider: any;

  // private List<HotelAmenity>
  hotelAmenities: any;
  // private boolean
  seaPlane: boolean;
  // private boolean
  speedBoat: boolean;
  // private boolean
  waterVilla: boolean;
  // private Boolean
  hotelNotRetained: boolean;
  // private List<SourceProvider>
  ourSourceProviders: any;
  // private float
  discountedPrice: number;
  // private Map<String, HotelCostingPlatoRequestVO>
  platoDetails: any;
  // private boolean
  offline: boolean;
  // private boolean
  hotelNotInInventory: boolean; // Flag that indicates hotel is not in our DB
  // private boolean
  expired: boolean;
  // private boolean
  isSanduneSplitStay: boolean;
  // private boolean
  allowedToSplit: boolean;

  voucher: HotelPlatoVoucherInterface;
}
