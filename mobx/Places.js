import { observable, computed, action, toJS, set, get } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { logError } from "../Services/errorLogger/errorLogger";

class Places {
  @observable _selectedCity = {};
  @persist("object")
  @observable
  _cityCategories = {};
  @persist("object")
  @observable
  _textSearches = {};
  @observable _isLoading = false;
  @observable _hasError = false;

  @action
  reset = () => {
    this._selectedCity = {};
    this._cityCategories = {};
    this._textSearches = {};
    this._isLoading = false;
    this._hasError = false;
  };

  @computed
  get selectedCity() {
    return this._selectedCity;
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._hasError;
  }

  /**
   * TODO: Better way to use empty objects instead of try-catch (creates sentry entry)
   */
  @computed
  get categories() {
    try {
      const category = get(
        this._cityCategories,
        this._selectedCity.cityObject.cityId
      );
      if (category) return toJS(category);
      else return {};
    } catch (e) {
      logError(e);
      return {};
    }
  }

  @action
  loadTextSearch = text => {
    this._isLoading = true;
    apiCall(
      constants.googleTextSearch.replace(":keyword", encodeURIComponent(text)),
      {},
      "GET"
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          const textSearches = toJS(this._textSearches);
          textSearches[text] = {
            searchResults: response.data.results,
            token: response.data.nextPageToken
          };
          this._textSearches = textSearches;
        } else {
          const response = {
            status: "SUCCESS",
            data: {
              htmlAttributions: [],
              nextPageToken:
                "CtQDyAEAAKGCoPlNU7o_FY0Glkf8zXleD6bDLQX6oZJ5NARBJIlEckZxYo7XsOTREGiwo1cBaY_lTblrnFEv0B4xsTp7SUPSXNqRwDnRYAAtc14CSz-b6m0ZdrW4RKqMu9VPTqw6OHRugpKtgvGfBGRWYY4rysuze1QNy_bf3FKJRJ-6Jt0TInf71yqqmTLWyb0gcxnOBDeX7p_ssvDQHIoc79jsXYz3INi1bniV4pgOUbstavSZHTV0NTcj4NmBlej2TxrELgXZMIaqq10KL9dFtJvyEm2oYRaZHMAqO5P2A29HpP6xiUMX2X8Jk0DI82buM81a0hfvzz-p-WI_j1QNy3gLKhiBEXb6r6CSsX_AZPQ_o3TmKwfsQJChiNepGTIb-MU9QccNFYdEOzGXPf_qfdoVRDC38X78-1h6I5BWt6VLP6bY_caxQnS9PwFfo-OGXIDOGjUmPbcMgB_Uv18gSn2hZoGN7Y5wBwq4Nuzph-l5Ox-LmJSlhx2Hudn1FtQ9BynL_koHWq2nW8tbxeNPq35_5JFCTrHtZtl0cVRLz6sZnnS-pm4o9i90O6zcgQLqvzIKF7JoRrB9EjylqaEljQ0ShVS6fuEs7UWbGzR-m3hAxl6cEhDp8Pxt7UEhzNrJIeMrpK_8GhQ-KwJLStUA3ADExgTYm1mPx1TthQ",
              results: [
                {
                  geometry: {
                    location: {
                      lat: -8.512324999999999,
                      lng: 115.267986
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "fafc9edafef26b065751ad4d748f2fb9f11861dc",
                  name: "ZEN Rooms Ubud Sukma Tebesaya",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/109699757391875230800/photos">ZEN Rooms Ubud Sukma Tebesaya</a>'
                      ],
                      photoReference:
                        "CmRaAAAAi97q7WMKp5_CvlIYyLqnSvP22W5Rk-IOzqD-4AahAqWkaCspG-b0rlfpvj1EFBz3VizNFEHbF70a9uZjf4tO6lrjO8prxiIhwIbAuENi82hw4o-7y80ix2CiFqj4DbtCEhAjd0Km9oKS1H1lMOrPH6HaGhSO2zl5KTmX14nPxd1BPW4acWFQrw",
                      height: 3648,
                      width: 5388,
                      photoUrl:
                        "https://lh3.googleusercontent.com/p/AF1QipMzFpkw339Sk3yoTG4jB_pp8AXGsS0y0YXGbKRx=s1600-w1600-h1600"
                    }
                  ],
                  placeId: "ChIJz2aU2W490i0Rx2-5Spkzj0M",
                  priceLevel: null,
                  rating: 4,
                  reference: "ChIJz2aU2W490i0Rx2-5Spkzj0M",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Sukma No. 8 Peliatan Ubud,rumah, Peliatan, Ubud, Peliatan, Ubud, Bali, 80571, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.721378999999999,
                      lng: 115.170622
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "99a9b17dd6952bf28b3eec972601e4af13ccc66f",
                  name: "Hard Rock Hotel Bali",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/110099759231783843865/photos">Hard Rock Hotel Bali</a>'
                      ],
                      photoReference:
                        "CmRaAAAAFvrkfDk62XKkuu3CIlKWxGadkrBj03QdpIfVnQbCqtfTjZ7DQpX9ZHDfb1dBROiCVCYW4TGF9tpHCTOFn6nn6xmB511x0QjKCSf_XHHh5g8WxjaNDEkDcIl3arhRMO6gEhCowpDwPa0m7ejEJzqH93guGhQxA-D2GjZD2pHqPT9IBsQETesSIA",
                      height: 1280,
                      width: 1920,
                      photoUrl:
                        "https://lh3.googleusercontent.com/p/AF1QipObXRSnLMix5xQMiNpurM-qMjV-cqgtL2MgRAHj=s1600-w1600-h1280"
                    }
                  ],
                  placeId: "ChIJ4yjNZrxG0i0R1wrn2LzJ6hA",
                  priceLevel: null,
                  rating: 4.5,
                  reference: "ChIJ4yjNZrxG0i0R1wrn2LzJ6hA",
                  scope: null,
                  types: [
                    "spa",
                    "lodging",
                    "restaurant",
                    "point_of_interest",
                    "food",
                    "establishment"
                  ],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jalan Pantai Kuta, Banjar Pande Mas, Kuta, Kabupaten Badung, Bali 80361, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.799067899999999,
                      lng: 115.2317306
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "2b4125a1b3c2f2fc6b1467c8b899525160075103",
                  name: "Meliá Bali",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/101561379776402238731/photos">Meliá Bali</a>'
                      ],
                      photoReference:
                        "CmRaAAAAGgmRLP_f-n-2TCIMa9Cyf0T0eKI6qwrIc_3VHI1Kds8JvgZcyQ2DS0gN9qk4qojpAyDlpFVbhczwqwKpw9qObUE-dQsMNrfmQtysU3FOoQaU2DASdmx5awajnCm0NPVIEhCtmcDiwV8ntI6TkrBv7hqhGhS_XxroNu4UjfagIjaGPvW6nEM42Q",
                      height: 1536,
                      width: 2304,
                      photoUrl:
                        "https://lh3.googleusercontent.com/p/AF1QipMew5_d-YMq8TcUh1z4gtOJ49K9DCJ213Hlvz0w=s1600-w1600-h1536"
                    }
                  ],
                  placeId: "ChIJg9Sb1iVD0i0ROW3yfiS-MJ0",
                  priceLevel: null,
                  rating: 4.5,
                  reference: "ChIJg9Sb1iVD0i0ROW3yfiS-MJ0",
                  scope: null,
                  types: [
                    "spa",
                    "park",
                    "lodging",
                    "restaurant",
                    "point_of_interest",
                    "food",
                    "establishment"
                  ],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Kawasan Wisata ITDC Lot. 1, Nusa Dua, Benoa, Kuta Selatan, Benoa, Kuta Sel., Kabupaten Badung, Bali 80363, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.680715,
                      lng: 115.1526404
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "7f00c3ea7bf4e88af84a05f503b33109f70d713c",
                  name: "Studios at Alila Seminyak",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/109477979898618680220/photos">The Studios at Alila Seminyak</a>'
                      ],
                      photoReference:
                        "CmRaAAAAu0Wk6BqhBMSn_Nf1L-JqfnZo5_zkv3yuVNXAisFqKjjzXjGZHXzGDdKiOr6y3NQCStmOBHEtV2-MSPfjg3cCkfEcvyNr0lKNabN5x8Y0aYPPUnDaLzNUfMgaZXMvbD9LEhCfA6VRK13N8-3cXQedMwVOGhRMyoFRse-GVMY2bkvJSmnVqvB_9w",
                      height: 1365,
                      width: 2048,
                      photoUrl:
                        "https://lh3.googleusercontent.com/p/AF1QipOH5v1y2wnJSAHIGX8ek0J6e4fWzBUCi33-3Y9m=s1600-w1600-h1365"
                    }
                  ],
                  placeId: "ChIJa3NbFw5H0i0Rk0OykLQ6Y44",
                  priceLevel: null,
                  rating: 4.6,
                  reference: "ChIJa3NbFw5H0i0Rk0OykLQ6Y44",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jalan Taman Ganesha No. 9 Petitenget, Seminyak, Kerobokan Kelod, Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.784466499999999,
                      lng: 115.1595824
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "c2fa5b431ac3ede490f957638712238f6e4ed3f8",
                  name: "Four Seasons Resort Bali At Jimbaran Bay",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/107366365411317018582/photos">Four Seasons Resort Bali At Jimbaran Bay</a>'
                      ],
                      photoReference:
                        "CmRaAAAATq6QHsRIc0jlZ2FCYvIcZ92BYJkGl1UIrae3_4ycU1R18wCETahAIayX1sDWaXCBV_XIN8fP5rvgobbl3b7I4t3SWI2WMprFwEhU4IE_U_oafvJ0M3eUANX6bzG05SxCEhCzTOFH8NGJVwvv8pL2BrBXGhTI9TteGnGR0gO-DMm3avftwK-TOA",
                      height: 1321,
                      width: 2048,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJ6cVf9fFE0i0RogyvBWu4WuM",
                  priceLevel: null,
                  rating: 4.7,
                  reference: "ChIJ6cVf9fFE0i0RogyvBWu4WuM",
                  scope: null,
                  types: [
                    "spa",
                    "lodging",
                    "point_of_interest",
                    "establishment"
                  ],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jimbaran, South Kuta, Badung Regency, Bali 80361, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.788042899999999,
                      lng: 115.1366705
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "3ce837c21f0584b0c4ebeaf4a556756da3154793",
                  name: "The Villas at AYANA Resort, BALI",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/110050150254021433291/photos">The Villas at AYANA Resort and Spa Bali</a>'
                      ],
                      photoReference:
                        "CmRaAAAA31xWktUoXtqhJUjcp2yllRtj6_VbRRuK1PS6unMFACqaNTsxVYvO0KfTldyQKF-hI9Ny1nI8Qr5vAVKoAnan4G-7klRto7CbkVK-Ebzhp0Ax0bmdsvgsaaIDjM8VrJy4EhCsEfpSvnYF3MSgnypmLBF3GhT9zvCVfNcN9K3gGy1YVCj-YsPVDA",
                      height: 605,
                      width: 907,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJe2lg4gJF0i0Rl_8LzZd5b4I",
                  priceLevel: null,
                  rating: 4.6,
                  reference: "ChIJe2lg4gJF0i0Rl_8LzZd5b4I",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Karang Mas Sejahtera, Jimbaran, Kuta Selatan, Jimbaran Kuta Selatan, Jimbaran, Kuta Sel., Kabupaten Badung, Bali 80364, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.8036734,
                      lng: 115.2332192
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "de470e3b109b5aa0fd121c623d3a02a88817c6fd",
                  name: "Grand Hyatt Bali",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/108778149963800530600/photos">Grand Hyatt Bali</a>'
                      ],
                      photoReference:
                        "CmRaAAAAsviaHhcyVOFOSHsUcuQMg35ZeqFWENILBx4N-xlo5VbZUeksRPvYnO8WZYsP79snmE2E71GElh-rXxX6TQ1yBcAFAwtmNmA5DB4zRUNPlLknn1WwLqp1Be2eAXhdAJs5EhA6E7JkJc78GSWdXORPQnvRGhSAhIS8Cxw1nTL_14wduPGRd_7IUQ",
                      height: 1920,
                      width: 2880,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJ24BeDptA0i0RFOjaTEUPQT0",
                  priceLevel: null,
                  rating: 4.5,
                  reference: "ChIJ24BeDptA0i0RFOjaTEUPQT0",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Kawasan Wisata Nusa Dua BTDC Nusa Dua, Benoa, South Kuta, Badung Regency, Bali 80363, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.5016996,
                      lng: 115.2439434
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "cafd5f256dde2bbfefc893e03bc7b6713038562d",
                  name: "Four Seasons Resort Bali At Sayan",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/113243762790458106302/photos">Four Seasons Resort Bali At Sayan</a>'
                      ],
                      photoReference:
                        "CmRaAAAA_mI5w5zpo1kOhDyOmwJZJv3z8qkV8a3EZQDKsMtbG_P1X9tyZMiCHND4gVaoFAjLOp8w-j1jm0H9NRrD5YkM2lgJaMootlbBgX8EjI0knCeo2xyuYJlNOIu6KKE1SkQLEhBigPehmH0eBc-O0Zt5qjS-GhQUY0x-TNz7YLalfV_CaYP3btZ5dw",
                      height: 1050,
                      width: 1313,
                      photoUrl:
                        "https://lh3.googleusercontent.com/p/AF1QipMuevX7RKvspcP_0GaApVQU_3F5NKrliJ0Jn7xs=s1600-w1313-h1050"
                    }
                  ],
                  placeId: "ChIJzdUYSsUi0i0R73icGTwBtn8",
                  priceLevel: null,
                  rating: 4.6,
                  reference: "ChIJzdUYSsUi0i0R73icGTwBtn8",
                  scope: null,
                  types: [
                    "spa",
                    "lodging",
                    "point_of_interest",
                    "establishment"
                  ],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Raya Sayan, Sayan, Ubud, Kabupaten Gianyar, Bali 80571, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.412795,
                      lng: 115.2388908
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "529278b3b8b0f94eed62c8674b9151af76ade95d",
                  name: "Hanging Gardens Of Bali",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/111782210136374808649/photos">Ubud Hanging Gardens</a>'
                      ],
                      photoReference:
                        "CmRaAAAA6QlhZl-vymXWi5fbc5vFSRDTmO3mlNzWWBaLhGhvow0hNmFKubwCHCHVMu7C4wleBz6VDxXwCW-FrOI9-rg7IAoj_5b9xcRUn7oP-FPnTbl0_p4M_i4J-0Y7HG1r56A8EhA-sQWy0MG5l7RUa1f-dhjaGhT8kSzZae3ytrihkItcukTw2Xq_ew",
                      height: 1239,
                      width: 2204,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJXz2mf0Y90i0RuaYn0Rf84hs",
                  priceLevel: null,
                  rating: 4.5,
                  reference: "ChIJXz2mf0Y90i0RuaYn0Rf84hs",
                  scope: null,
                  types: [
                    "spa",
                    "lodging",
                    "restaurant",
                    "point_of_interest",
                    "food",
                    "establishment"
                  ],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Banjar Susut, Desa Buahan, Payangan, Buahan, Payangan, Buahan, Payangan, Kabupaten Gianyar, Bali 80571, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.708817,
                      lng: 115.167654
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "da0d847fe7872c611e2e70d3e652801aac4409a3",
                  name: "Legian Beach Hotel",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/116531490054203819331/photos">Legian Beach Hotel</a>'
                      ],
                      photoReference:
                        "CmRZAAAAlcZa_VTqT6f_vU7P7uz9dRnyTY-epPsOo7G57nRgUQ8EDEGus57UX_1jD0nSHxj_pqBpUxH2b9lDPNJaCu6XfSR8vsXYEl3EiT3ZssG08jRplqb_tgTwy3TBDyoWPE8LEhD27GhCph_D6U2ZH6_7lbKjGhTIZeB3ogb4O2-hkqi_gCX-r1HFKg",
                      height: 1000,
                      width: 1500,
                      photoUrl:
                        "https://lh3.googleusercontent.com/p/AF1QipMPahgQ3a2OtcEZlZMoUPqBiCVET8YWshSsfEQ=s1600-w1500-h1000"
                    }
                  ],
                  placeId: "ChIJ8yyYDOdG0i0Ra-NWOmBfoqE",
                  priceLevel: null,
                  rating: 4.3,
                  reference: "ChIJ8yyYDOdG0i0Ra-NWOmBfoqE",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Melasti, Legian, Kuta, Kabupaten Badung, Bali 80361, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.7295305,
                      lng: 115.1669796
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "121693f8c92ae9b4f5aa02967b0c0863e331aeb9",
                  name: "Discovery Kartika Plaza Hotel",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/112924126193656535218/photos">Discovery Kartika Plaza Hotel</a>'
                      ],
                      photoReference:
                        "CmRaAAAAmD6IvGx_a_Uc2akZf7VvNQWhhIv9YiBX0xWywzFiHQUJCIE1snWY4X0haq81bg_INn98trbfmMFmyM3nZiqnHRe_FlOgTCziMzFFuTaB_d7KavDv4yPEu_NKvXbAQoKZEhAkbkx2Cg6rvNhf9M05JOg5GhTUJusnmUVyO50m7krakCQrZlgBQw",
                      height: 1197,
                      width: 2048,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJt1wdoqFG0i0RMnW07pzilFQ",
                  priceLevel: null,
                  rating: 4.5,
                  reference: "ChIJt1wdoqFG0i0RMnW07pzilFQ",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Kartika Plaza, Kuta, Kabupaten Badung, Bali 80361, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.811662199999999,
                      lng: 115.1103585
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "15aeb886450bc39606b47a2dd59bc762442b4cf1",
                  name: "Anantara Uluwatu Bali Resort",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/118390624376061658117/photos">Anantara Bali Uluwatu Resort &amp; Spa</a>'
                      ],
                      photoReference:
                        "CmRaAAAA300XwrCVXOIQTs5WPabh8m-BBcinHNBgJwsHzOGk4zop_QpazHDGvh4QFa1pcoCQsBONvNdT7nI11YmEOnhk3WG8VImmfTvXSyYhOfpIqof98O2a8yPjwNg7dAFh-tIWEhCWkr1fJ2qaHc5UzbcvRIFhGhTIb0RKfxNYvBX__62P-5XMBXDuTQ",
                      height: 2640,
                      width: 3960,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJv5Tx3UVF0i0RQ2jeB0yfNfQ",
                  priceLevel: null,
                  rating: 4.5,
                  reference: "ChIJv5Tx3UVF0i0RQ2jeB0yfNfQ",
                  scope: null,
                  types: [
                    "spa",
                    "lodging",
                    "point_of_interest",
                    "establishment"
                  ],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Pemutih – Labuan Sait, Jl. Raya Uluwatu Pecatu, Pecatu, Kuta Sel., Kabupaten Badung, Bali 80361, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.7791654,
                      lng: 115.1669024
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "08909e1c14c29127b47e93b3043b5353fc481f7c",
                  name: "InterContinental Bali Resort",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/114715023470702645643/photos">InterContinental Bali Resort</a>'
                      ],
                      photoReference:
                        "CmRaAAAA9CIJ-pov2iL53vlqKDCl5zU8YncqitiUVDGtSqL7TyR-bpHsAN_SRxqjFe6M29jtr3ck5K9WDM0l4Ji-uEKlABfXQeMim2-EamDA6bRPxu6p0YgU5gQuhqPQMm_tqvsiEhDzSgQsYRabfCI-Z4IsG-qUGhTNO4wqpWrUhiMUz-OtM7OFMrNPRA",
                      height: 2386,
                      width: 3604,
                      photoUrl:
                        "https://lh3.googleusercontent.com/p/AF1QipME6AQ3aoW28dTzZLQ2uFEAZIRGCCWjK-Bqc_ku=s1600-w1600-h1600"
                    }
                  ],
                  placeId: "ChIJZS45kIxE0i0RJ5ay5snshP4",
                  priceLevel: null,
                  rating: 4.6,
                  reference: "ChIJZS45kIxE0i0RJ5ay5snshP4",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Raya Uluwatu No.45, Jimbaran, Kuta Sel., Kabupaten Badung, Bali 80361, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.512841,
                      lng: 115.256724
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "cac0100084fc26655f3454f35e49ebae6ad9c79c",
                  name: "Komaneka at Bisma",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/113883924257038357348/photos">Komaneka at Bisma</a>'
                      ],
                      photoReference:
                        "CmRaAAAAIntaqxP3sbonxsYpYqN229V1dRZKpWw4oHGTaTbhlKUwYboFlqH0bFlDTpx6IYDRwh1BQqhoyKO2VJklNp7ezC20n7DAQVCDDbqU6_7ex7kIsyYKBMsSScHm-AEAzO4hEhDmn3roLfb_IORIrk0utD5JGhQuS_Busp6CKkjfAWWbRFYU4unpng",
                      height: 3096,
                      width: 4800,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJx34FoWw90i0RqOr9rcbtD8k",
                  priceLevel: null,
                  rating: 4.6,
                  reference: "ChIJx34FoWw90i0RqOr9rcbtD8k",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Bisma, Ubud, Kabupaten Gianyar, Bali 80571, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.696628,
                      lng: 115.168379
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "3ebaa164b7d92a88901df1baf2a4100818850696",
                  name: "The Haven Bali Seminyak",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/116088249887218865050/photos">THE HAVEN BALI SEMINYAK</a>'
                      ],
                      photoReference:
                        "CmRaAAAAJM0D6mo33-_LcytMu-x8fWouGZeSaLKD6cL7W482DNhnX1k91ZhBAlfSr9emWLPZWKxRU06QlsF2ZOsbCIYFIleJUZ4rUbXiS97euqXShARb8IOYD32Dmfqpw-pXJxTaEhCgzRQluY51-rJk6oOVELtEGhSSSY-rMuOUv25VxYenc241BTksZw",
                      height: 664,
                      width: 1000,
                      photoUrl:
                        "https://lh3.googleusercontent.com/p/AF1QipNR9aZwV3pfD7G1KdzXez78F5MtmooeH46kzIaE=s1600-w1000-h664"
                    }
                  ],
                  placeId: "ChIJN0DM_t5G0i0RfI7qPy8BDR0",
                  priceLevel: null,
                  rating: 4.3,
                  reference: "ChIJN0DM_t5G0i0RfI7qPy8BDR0",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Raya Seminyak No.500, Seminyak, Kuta, Bali, 80361, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.686221999999999,
                      lng: 115.154574
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "6d9313d4d70b09853f60b1cc8a24e13aae717685",
                  name: "The Seminyak Beach Resort & Spa",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/117382787395869138850/photos">Ronald Reagan</a>'
                      ],
                      photoReference:
                        "CmRaAAAAiuW5FiCXxi1htWnOknGnicCWNVnG-qFvxi0BAm1Ol36NVEKx5xmSAg9cscnZcZjiHUMGGKllDVrJjZA2yBBgRqOn9_QPcTjD0PcBW8Vl6qWAYycfGRahcC3a_j-mZJCdEhBDjsGiaELlWxW1C-gDRbB8GhT2dwCbj_ZFVSBqQELD5cl-Ak_z8g",
                      height: 3864,
                      width: 5152,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJzcxjwRpH0i0RkCvrbJ5wmL8",
                  priceLevel: null,
                  rating: 4.4,
                  reference: "ChIJzcxjwRpH0i0RkCvrbJ5wmL8",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Kayu Aya, Pantai Seminyak, Kuta, Seminyak, Kuta, Kabupaten Badung, Bali 80361, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.498645999999999,
                      lng: 115.261527
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "98108ec13e402b86c2d6bc04558c1c8285c1cc8a",
                  name: "The Samara Villas & Restaurant",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/103487719375399870618/photos">The Samara Villas, Boutique Hotel in Ubud</a>'
                      ],
                      photoReference:
                        "CmRaAAAAfZ72T7K4WxRaft3EYhJhat37cBqMEr5_rGDxBLSjs1mLwrVzaMugdqslQp6snyqdJKicAWLvM3Uux73RWWsek8Zb6UTtXrSYWum7RaEWAx8dx2vsoOlUnotHSXWkE4zLEhD1AQ82VCMBDAYYiXDv7cqTGhTIJB7YlQUBh6_UauWIG0Wj6IpT8w",
                      height: 1355,
                      width: 2048,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJayDTbEc90i0RGcyrOQoCWss",
                  priceLevel: null,
                  rating: 4.7,
                  reference: "ChIJayDTbEc90i0RGcyrOQoCWss",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Kajeng No.Subak, Juwuk Manis, Ubud, Kabupaten Gianyar, Bali 80571, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.8069259,
                      lng: 115.2252668
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "4a9b9598afe9284ecdce48b7dd678caac8ccd1d4",
                  name: "Courtyard by Marriott Bali Nusa Dua Resort",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/109831870954457438944/photos">Courtyard Bali Nusa Dua</a>'
                      ],
                      photoReference:
                        "CmRaAAAAFaMsKM8ZQt4LWyZXp_0fCG0-ai9lrSZzybZdU3HC5_e4cGnIBGp4dlTlwOG4xgqgD_H2G-lsDPAgyYtEOTahT6J5tYkodcMO3nkNgXWeORpiKSuRzDZ8TVKcHs5Zh93ZEhD1FUZMLwJTdndirT5E2A1xGhS38quKWTx8Kyl6W53RJgB73TPnJQ",
                      height: 810,
                      width: 1440,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJ2QKoMiZD0i0R8zeMlH3mCp0",
                  priceLevel: null,
                  rating: 4.5,
                  reference: "ChIJ2QKoMiZD0i0R8zeMlH3mCp0",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Kawasan Pariwisata Lot SW1 Nusa Dua Bali, Bali 80363, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.7256886,
                      lng: 115.1701928
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "c16cc61b0471fdcd133b2aecfffd45b5c766b4cc",
                  name: "Kuta Paradiso Hotel",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/110221670024663609129/photos">Taso Toprakidis</a>'
                      ],
                      photoReference:
                        "CmRaAAAA68rsji94BOkmwSwW-5aPvU-Z_j1i0wjlosRYPreWFRsQl-1dFwpyQgplqC9fjVNNXe0mwN9InhP9fs3jGCbtBhASgIvlmnkfpwqOCeOHMopl-mb-3D75qB0PKDdD-dsXEhCRT8RwhO4QeoX-B9eXr5s2GhS6kALoe2En0CrH6hkDtWJAq-caOQ",
                      height: 3024,
                      width: 4032,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJR8WoVxZE0i0RHkN8aJWGGBE",
                  priceLevel: null,
                  rating: 4.2,
                  reference: "ChIJR8WoVxZE0i0RHkN8aJWGGBE",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jl. Kartika Plaza, Tuban, Kuta, Kabupaten Badung, Bali 80361, Indonesia"
                },
                {
                  geometry: {
                    location: {
                      lat: -8.6842378,
                      lng: 115.1610854
                    }
                  },
                  icon:
                    "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                  id: "864b33872348b0540c8d7df9c06943dda45ea45f",
                  name: "Amadea Resort & Villas",
                  openingHours: {
                    openNow: true,
                    weekdayText: null
                  },
                  photos: [
                    {
                      htmlAttributions: [
                        '<a href="https://maps.google.com/maps/contrib/104989547912996550606/photos">Amadea Resort &amp; Villas</a>'
                      ],
                      photoReference:
                        "CmRaAAAA7e4OjyZHgrAi8_ZWyr6HLh-I4VDeqXe1WIw7UZd0fyJ74N8soX56l5fwVHA-RDYohyQ5bHJxAoGOa4Juase0r-S9-AnxkO_Yc2EpUYvBjhpnUfqPZlZiBXaAUP3eYOLjEhAuYBR8Uusuo_dEZgYDcPPmGhR4fMTqQrvK-FRbm0MkiujV_fcZUw",
                      height: 1000,
                      width: 1000,
                      photoUrl: null
                    }
                  ],
                  placeId: "ChIJGwTW4RlH0i0RSU-EOx8spQ0",
                  priceLevel: null,
                  rating: 4.4,
                  reference: "ChIJGwTW4RlH0i0RSU-EOx8spQ0",
                  scope: null,
                  types: ["lodging", "point_of_interest", "establishment"],
                  vicinity: null,
                  distance: 0,
                  formattedAddress:
                    "Jalan Kayu Aya, Seminyak, Kuta, Seminyak, Kuta, Kabupaten Badung, Bali 81360, Indonesia"
                }
              ],
              status: "OK",
              keyword: "hotels-in-bali"
            }
          };
          const textSearches = toJS(this._textSearches);
          textSearches[text] = {
            searchResults: response.data.results,
            token: response.data.nextPageToken
          };
          this._textSearches = textSearches;
          this._hasError = true;
        }
      })
      .catch(err => {
        this._isLoading = false;
        this._hasError = true;
      });
  };

  getSearchResultsByText = createTransformer(text => {
    if (this._textSearches[text]) {
      return toJS(this._textSearches[text]);
    } else {
      return {
        searchResults: [],
        token: ""
      };
    }
  });

  @action
  selectCity = city => {
    this._selectedCity = city;
    this.loadCityCategory(city.cityObject.cityId);
  };

  @action
  loadCityCategory = cityId => {
    if (!this._cityCategories[cityId]) this._loadCityCategoryFromAPI(cityId);
  };

  @action
  _loadCityCategoryFromAPI = cityId => {
    this._isLoading = true;
    apiCall(`${constants.getCityPlaceCategory}?city=${cityId}`, {}, "GET")
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          const cityCategories = toJS(this._cityCategories);
          cityCategories[cityId] = response.data;
          this._cityCategories = cityCategories;
          // set(this._cityCategories, `${cityId}`, response.data);
        } else {
          this._hasError = true;
        }
      })
      .catch(err => {
        this._hasError = true;
        this._isLoading = false;
      });
  };
}

export default Places;
