var value = 'value';
var attribute = 'attribute';

const includeSelector = {
  "Item,": value,
  "Item": {
    "AutoPay,": value,
    "BestOfferEnabled,": value,
    "BidCount,": value,
    "BusinessSellerDetails,": value,
    "BusinessSellerDetails": {
      "AdditionalContactInformation,": value,
      "Address,": value,
      "Address": {
        "CityName,": value,
        "CompanyName,": value,
        "FirstName,": value,
        "LastName,": value,
        "Name,": value,
        "Phone,": value,
        "PostalCode,": value,
        "StateOrProvince,": value,
        "Street1,": value,
        "Street2,": value
      },
      "Email,": value,
      "Fax,": value,
      "LegalInvoice,": value,
      "TermsAndConditions,": value,
      "TradeRegistrationNumber,": value,
      "VATDetails,": value,
      "VATDetails": {
        "VATID,": value,
        "VATSite,": value
      }
    },
    "Charity,": value,
    "Charity": {
      "CharityID,": value,
      "CharityName,": value,
      "CharityNumber,": value,
      "DonationPercent,": value,
      "LogoURL,": value,
      "Mission,": value,
      "Status,": value
    },
    "ConditionDescription,": value,
    "ConditionDisplayName,": value,
    "ConditionID,": value,
    "ConvertedCurrentPrice,": value,
    "Country,": value,
    "CurrentPrice,": value,
    "Description,": value,
    "eBayNowEligible,": value,
    "EndTime,": value,
    "GalleryURL,": value,
    "GlobalShipping,": value,
    "HandlingTime,": value,
    "HighBidder,": value,
    "HighBidder": {
      "FeedbackPrivate,": value,
      "FeedbackRatingStar,": value,
      "FeedbackScore,": value,
      "UserAnonymized,": value,
      "UserID,": value
    },
    "HitCount,": value,
    "IntegratedMerchantCreditCardEnabled,": value,
    "ItemID,": value,
    "ItemSpecifics,": value,
    "ItemSpecifics": {
      "NameValueList,": value,
      "NameValueList": {
        "Name,": value,
        "Value,": value
      }
    },
    "ListingStatus,": value,
    "ListingType,": value,
    "Location,": value,
    "LotSize,": value,
    "MinimumToBid,": value,
    "NewBestOffer,": value,
    "PaymentAllowedSite,": value,
    "PaymentMethods,": value,
    "PictureURL,": value,
    "PostalCode,": value,
    "PrimaryCategoryID,": value,
    "PrimaryCategoryIDPath,": value,
    "PrimaryCategoryName,": value,
    "ProductID,": value,
    "Quantity,": value,
    "QuantityAvailableHint,": value,
    "QuantityInfo,": value,
    "QuantitySold,": value,
    "QuantitySoldByPickupInStore,": value,
    "QuantityThreshold,": value,
    "ReserveMet,": value,
    "ReturnPolicy,": value,
    "ReturnPolicy": {
      "Description,": value,
      "EAN,": value,
      "Refund,": value,
      "ReturnsAccepted,": value,
      "ReturnsWithin,": value,
      "ShippingCostPaidBy,": value,
      "WarrantyDuration,": value,
      "WarrantyOffered,": value,
      "WarrantyType,": value
    },
    "SecondaryCategoryID,": value,
    "SecondaryCategoryIDPath,": value,
    "SecondaryCategoryName,": value,
    "Seller,": value,
    "Seller": {
      "FeedbackRatingStar,": value,
      "FeedbackScore,": value,
      "PositiveFeedbackPercent,": value,
      "TopRatedSeller,": value,
      "UserID,": value
    },
    "ShippingCostSummary,": value,
    "ShippingCostSummary": {
      "InsuranceCost,": value,
      "ListedShippingServiceCost,": value,
      "LocalPickup,": value,
      "ShippingServiceCost,": value,
      "ShippingType,": value
    },
    "ShipToLocations,": value,
    "Site,": value,
    "SKU,": value,
    "StartTime,": value,
    "Storefront,": value,
    "Storefront": {
      "StoreName,": value,
      "StoreURL,": value
    },
    "Subtitle,": value,
    "TimeLeft,": value,
    "Title,": value,
    "TopRatedListing,": value,
    "UnitInfo,": value,
    "Variations,": value,
    "Variations": {
      "Pictures,": value,
      "Pictures": {
        "VariationSpecificName,": value,
        "VariationSpecificPictureSet,": value,
        "VariationSpecificPictureSet": value
      },
      "Variation,": value,
      "Variation": {
        "Quantity,": value,
        "SellingStatus,": value,
        "SellingStatus": value,
        "SKU,": value,
        "StartPrice,": value,
        "VariationSpecifics,": value,
        "VariationSpecifics": {
          "NameValueList,": value,
          "NameValueList": {
            "Name,": value,
            "Value,": value
          }
        }
      },
      "VariationSpecificsSet,": value,
      "VariationSpecificsSet": {
        "NameValueList,": value,
        "NameValueList": {
          "Name,": value,
          "Value,": value
        }
      }
    },
    "VhrAvailable,": value,
    "VhrUrl,": value,
    "ViewItemURLForNaturalSearch": value
  },
  "VariationSpecificValue,": value,
  "QuantitySoldByPickupInStore,": value
};

const shopping = {
  FindHalfProduct: {
    itemID: value,
    IncludeSelector: includeSelector,
    AvailableItemsOnly: value,
    DomainName: value,
    MaxEntries: value,
    PageNumber: value,
    ProductID: {
      type: attribute
    },
    ProductSort: value,
    QueryKeywords: value,
    SellerId: value,
    SortOrder: value,
    MessageID: value
  },
  FindProduct: {
    itemID: value,
    IncludeSelector: includeSelector,
    AvailableItemsOnly: value,
    HideDuplicateItems: value,
    DomainName: value,
    MaxEntries: value,
    PageNumber: value,
    ProductID: {
      type: attribute
    },
    ProductSort: value,
    QueryKeywords: value,
    SortOrder: value,
    MessageID: value
  },
  FindReviewsAndGuides: {
    CategoryID: value,
    IncludeSelector: includeSelector,
    MaxResultsPerPage: value,
    PageNumber: value,
    ProductID: {
      type: attribute
    },
    ReviewSort: value,
    UserID: value,
    SortOrder: value,
    MessageID: value
  },
  GetCategoryInfo: {
    CategoryID: value,
    IncludeSelector: includeSelector,
    MessageID: value
  },
  GetUserProfile: {
    userID: value
  },
  GetItemStatus: {
    itemID: value,
    MessageID: value
  },
  GetMultipleItems: {
    itemID: value,
    IncludeSelector: includeSelector,
    MessageID: value
  },
  GetSingleItem: {
    itemID: value,
    IncludeSelector: includeSelector,
    MessageID: value,
    VariationSKU: value,
    VariationSpecifics: {
      NameValueList: {
        Name: value,
        Value: value
      }
    }
  },
  GetShippingCosts: {
    DestinationCountryCode: value,
    DestinationPostalCode: value,
    IncludeDetails: value,
    ItemID: value,
    QuantitySold: value
  }
};

module.exports = shopping;
