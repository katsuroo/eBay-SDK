import {EbayOperation} from './api';
import apiList from './definitions/index.js';
import {endpoints, fieldNames, serviceVersions} from './constants';
import {expect} from 'chai';
import {keys, each, lowerFirst, get} from './util';

export default class Ebay {
  constructor({devKey, responseFormat = 'JSON', serviceVersion, sandbox}) {
    expect(devKey, 'devKey').to.exist;
    expect(responseFormat, 'responseFormat').to.match(/json|xml/i);

    const endpoint = endpoints[sandbox ? 'sandbox' : 'production'];

    each(apiList, (api, service) => {
      let operationList = keys(api);
      
      each(operationList, operation => {
        let field = fieldNames[service];
        let requiredFields = {
          [field.operation]: operation,
          [field.devKey]: devKey,
          [field.serviceVersion]: get(serviceVersion, service) || serviceVersions[service],
          [field.responseFormat]: responseFormat
        };

        this[lowerFirst(operation)] = new EbayOperation(endpoint[service], apiList[service][operation], requiredFields);
      });
    });
  }
}