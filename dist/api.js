'use strict';

var outputSelector = {
  ack: 'value',
  aspectHistogramContainer: {
    aspect: {
      valueHistogram: {
        count: 'value'
      }
    }
  },
  categoryHistogramContainer: {
    categoryHistogram: {
      categoryId: 'value',
      categoryName: 'value',
      childCategoryHistogram: {
        categoryId: 'value',
        categoryName: 'value,',
        childCategoryHistogram: {
          categoryId: 'value',
          categoryName: 'value,',
          childCategoryHistogram: {
            count: 'value'
          }
        },
        count: 'value'
      },
      count: 'value'
    }
  },
  conditionHistogramContainer: {
    conditionHistogram: {
      condition: {
        conditionDisplayName: 'value',
        conditionId: 'value'
      }
    },
    count: 'value'
  },
  errorMessage: {
    error: {
      category: 'value',
      domain: 'value',
      errorId: 'value',
      exceptionId: 'value',
      message: 'value',
      parameter: 'value',
      severity: 'value',
      subdomain: 'value'
    }
  },
  paginationOutput: {
    entriesPerPage: 'value',
    pageNumber: 'value',
    totalEntries: 'value',
    totalPages: 'value'
  },
  searchResult: {
    item: {
      attribute: {
        name: 'value',
        value: 'value'
      },
      autoPay: 'value',
      charityId: 'value',
      condition: {
        conditionDisplayName: 'value',
        conditionId: 'value'
      },
      country: 'value',
      discountPriceInfo: 'value',
      distance: 'value',
      eekStatus: 'value',
      galleryInfoContainer: {
        galleryURL: 'value'
      },
      galleryPlusPictureURL: 'value',
      galleryURL: 'value',
      globalId: 'value',
      isMultiVariationListing: 'value',
      itemId: 'value',
      listingInfo: {
        bestOfferEnabled: 'value',
        buyItNowAvailable: 'value',
        buyItNowPrice: 'value',
        convertedBuyItNowPrice: 'value',
        endTime: 'value',
        gift: 'value',
        listingType: 'value',
        startTime: 'value'
      },
      location: 'value',
      paymentMethod: 'value',
      pictureURLLarge: 'value',
      pictureURLSuperSize: 'value',
      postalCode: 'value',
      primaryCategory: {
        categoryId: 'value',
        categoryName: 'value'
      },
      productId: 'value',
      secondaryCategory: {
        categoryId: 'value',
        categoryName: 'value'
      },
      sellerInfo: {
        feedbackRatingStar: 'value',
        feedbackScore: 'value',
        positiveFeedbackPercent: 'value',
        sellerUserName: 'value',
        topRatedSeller: 'value'
      },
      sellingStatus: {
        bidCount: 'value',
        convertedCurrentPrice: 'value',
        currentPrice: 'value',
        sellingState: 'value',
        timeLeft: 'value'
      },
      shippingInfo: {
        shippingServiceCost: 'value',
        shippingType: 'value',
        shipToLocations: 'value'
      },
      storeInfo: {
        storeName: 'value',
        storeURL: 'value'
      },
      subtitle: 'value',
      title: 'value',
      topRatedListing: 'value',
      unitPrice: {
        quantity: 'value',
        type: 'value'
      },
      viewItemURL: 'value'
    }
  },
  timestamp: 'value',
  version: 'value'
};

var finding = {
  findCompletedItems: {
    aspectFilter: {
      aspectName: 'value',
      aspectValueName: 'value'
    },
    categoryId: 'value',
    itemFilter: {
      name: 'value',
      paramName: 'value',
      paramValue: 'value',
      value: 'value'
    },
    keywords: 'value',
    outputSelector: outputSelector,
    productId: {
      name: 'attribute',
      type: 'attribute'
    },
    affiliate: {
      customId: 'value',
      geoTargeting: 'value',
      networkId: 'value',
      trackingId: 'value'
    },
    buyerPostalCode: 'value',
    paginationInput: {
      entriesPerPage: 'value',
      pageNumber: 'value'
    },
    sortOrder: 'value'
  },
  findItemsAdvanced: {
    aspectFilter: {
      aspectName: 'value',
      aspectValueName: 'value'
    },
    categoryId: 'value',
    descriptionSearch: 'value',
    itemFilter: {
      name: 'value',
      paramName: 'value',
      paramValue: 'value',
      value: 'value'
    },
    keywords: 'value',
    outputSelector: outputSelector,
    affiliate: {
      customId: 'value',
      geoTargeting: 'value',
      networkId: 'value',
      trackingId: 'value'
    },
    buyerPostalCode: 'value',
    paginationInput: {
      entriesPerPage: 'value',
      pageNumber: 'value'
    },
    sortOrder: 'value'
  },
  findItemsByCategory: {
    aspectFilter: {
      aspectName: 'value',
      aspectValueName: 'value'
    },
    categoryId: 'value',
    itemFilter: {
      name: 'value',
      paramName: 'value',
      paramValue: 'value',
      value: 'value'
    },
    outputSelector: outputSelector,
    affiliate: {
      customId: 'value',
      geoTargeting: 'value',
      networkId: 'value',
      trackingId: 'value'
    },
    buyerPostalCode: 'value',
    paginationInput: {
      entriesPerPage: 'value',
      pageNumber: 'value'
    },
    sortOrder: 'value'
  },
  findItemsByImage: {
    aspectFilter: {
      aspectName: 'value',
      aspectValueName: 'value'
    },
    categoryId: 'value',
    itemFilter: {
      name: 'value',
      paramName: 'value',
      paramValue: 'value',
      value: 'value'
    },
    itemId: 'value',
    outputSelector: outputSelector,
    affiliate: {
      customId: 'value',
      geoTargeting: 'value',
      networkId: 'value',
      trackingId: 'value'
    },
    buyerPostalCode: 'value',
    paginationInput: {
      entriesPerPage: 'value',
      pageNumber: 'value'
    }
  },
  findItemsByKeywords: {
    aspectFilter: {
      aspectName: 'value',
      aspectValueName: 'value'
    },
    itemFilter: {
      name: 'value',
      paramName: 'value',
      paramValue: 'value',
      value: 'value'
    },
    keywords: 'value',
    outputSelector: outputSelector,
    affiliate: {
      customId: 'value',
      geoTargeting: 'value',
      networkId: 'value',
      trackingId: 'value'
    },
    buyerPostalCode: 'value',
    paginationInput: {
      entriesPerPage: 'value',
      pageNumber: 'value'
    },
    sortOrder: 'value'
  },
  findItemsByProduct: {
    itemFilter: {
      name: 'value',
      paramName: 'value',
      paramValue: 'value',
      value: 'value'
    },
    outputSelector: outputSelector,
    productId: {
      type: 'value'
    },
    affiliate: {
      customId: 'value',
      geoTargeting: 'value',
      networkId: 'value',
      trackingId: 'value'
    },
    buyerPostalCode: 'value',
    paginationInput: {
      entriesPerPage: 'value',
      pageNumber: 'value'
    },
    sortOrder: 'value'
  },
  findItemsIneBayStores: {
    aspectFilter: {
      aspectName: 'value',
      aspectValueName: 'value'
    },
    categoryId: 'value',
    itemFilter: {
      name: 'value',
      paramName: 'value',
      paramValue: 'value',
      value: 'value'
    },
    keywords: 'value',
    outputSelector: outputSelector,
    storeName: 'value',
    affiliate: {
      customId: 'value',
      geoTargeting: 'value',
      networkId: 'value',
      trackingId: 'value'
    },
    buyerPostalCode: 'value',
    paginationInput: {
      entriesPerPage: 'value',
      pageNumber: 'value'
    },
    sortOrder: 'value'
  },
  getHistograms: {
    categoryId: 'value'
  },
  getSearchKeywordsRecommendation: {
    keywords: 'value'
  }
};

var shopping = {
  GetCategoryInfo: {
    CategoryID: 'value',
    IncludeSelector: 'value'
  }
};

module.exports = {
  finding: finding,
  shopping: shopping
};
//# sourceMappingURL=api.js.map
