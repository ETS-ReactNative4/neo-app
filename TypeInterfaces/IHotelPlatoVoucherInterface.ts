export interface IHotelPlatoVoucherInterface {
  // private String
  title: string;
  // private String
  voucherId: string;
  // private String
  hotelCostingId: string;
  // private String
  identifier: string;
  // private String
  cityName: string;
  // private String
  hotelName: string;
  // private String
  hotelAddress1: string;
  // private String
  hotelAddress2: string;
  // private String
  hotelContactNumber: string;
  // private String
  hotelWebsite: string;
  // private List<String>
  amenities: string[];
  // private String
  bookingSource: string;
  // private String
  dateOfIssue: string;
  // private String
  status: string;
  // private float
  bookingCost: number;
  // private long
  bookedTime: number;
  // private String
  checkInDate: string;
  // private String
  checkOutDate: string;
  // private long
  checkInDateTs: number;
  // private long
  checkOutDateTs: number;
  // private String
  checkInTime: string;
  // private String
  checkOutTime: string;
  // private List<HotelVoucherRoomVO>
  rooms: any[];
  // private Map<String, String>
  valueAddsMap: any;
  voucherUrl: string;
}
