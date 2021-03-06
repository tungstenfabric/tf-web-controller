/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

var rest = require(process.mainModule.exports["corePath"] +
                   '/src/serverroot/common/rest.api'),
  async = require('async'),
  logutils = require(process.mainModule.exports["corePath"] +
                     '/src/serverroot/utils/log.utils'),
  commonUtils = require(process.mainModule.exports["corePath"] +
                        '/src/serverroot/utils/common.utils'),
  global = require(process.mainModule.exports["corePath"] +
                   '/src/serverroot/common/global'),
  appErrors = require(process.mainModule.exports["corePath"] +
                      '/src/serverroot/errors/app.errors'),
  util = require('util'),
  ctrlGlobal = require('../../../../common/api/global'),
  jsonPath = require('JSONPath').eval,
  _ = require('underscore'),
  opApiServer = require(process.mainModule.exports["corePath"] +
                        '/src/serverroot/common/opServer.api'),
  configApiServer = require(process.mainModule.exports["corePath"] +
                            '/src/serverroot/common/configServer.api'),
  qeUtils = require(process.mainModule.exports["corePath"] +
                    "/webroot/reports/qe/api/query.utils");

function getGlobalControllerOverview (req, res, appData)
{
    var dataObjArr = [];
    var resultJSON = {};
    var reqUrl = "/analytics/uves/vrouter/*?flat&cfilt=UVEAlarms,ContrailConfig";
    commonUtils.createReqObj(dataObjArr, reqUrl, null, null, opApiServer, null,
                             appData);
    reqUrl = "/analytics/uves/control-node/*?flat&cfilt=UVEAlarms,ContrailConfig";
    commonUtils.createReqObj(dataObjArr, reqUrl, null, null, opApiServer, null,
                             appData);
    reqUrl = "/analytics/uves/analytics-node/*?flat&cfilt=UVEAlarms,CollectorState:self_ip_list,ContrailConfig";
    commonUtils.createReqObj(dataObjArr, reqUrl, null, null, opApiServer, null,
            appData);
    
    reqUrl = "/analytics/uves/config-node/*?flat&cfilt=UVEAlarms,ContrailConfig";
    commonUtils.createReqObj(dataObjArr, reqUrl, null, null, opApiServer, null,
                             appData);
    reqUrl = "/analytics/uves/database-node/*?flat&cfilt=UVEAlarms,ContrailConfig";
    commonUtils.createReqObj(dataObjArr, reqUrl, null, null, opApiServer, null,
                             appData);
    reqUrl = "/analytics/uves/virtual-machines";
    commonUtils.createReqObj(dataObjArr, reqUrl, null, null, opApiServer, null,
                             appData);
    reqUrl = "/analytics/uves/virtual-machine-interfaces";
    commonUtils.createReqObj(dataObjArr, reqUrl, null, null, opApiServer, null,
                             appData);
    reqUrl = "/analytics/uves/service-instances";
    commonUtils.createReqObj(dataObjArr, reqUrl, null, null, opApiServer, null,
                             appData);
    reqUrl = "/floating-ips";
    commonUtils.createReqObj(dataObjArr, reqUrl, null, null, configApiServer, null,
                             appData);
    reqUrl = "/analytics/alarms";
    commonUtils.createReqObj(dataObjArr, reqUrl, null, null, opApiServer, null,
                             appData);
    reqUrl = "/analytics/uves/virtual-network/*?cfilt=UveVirtualNetworkAgent";
    commonUtils.createReqObj(dataObjArr, reqUrl, null, null, opApiServer, null,
                                  appData);
    async.map(dataObjArr,
              commonUtils.getServerResponseByRestApi(opApiServer, true),
              function(err, results) {
        var vrNodes = commonUtils.getValueByJsonPath(results, "0;value", []);
        var controlNodes = commonUtils.getValueByJsonPath(results, "1;value", []);
        var analyticsNodes = commonUtils.getValueByJsonPath(results, "2;value", []);
        var configNodes = commonUtils.getValueByJsonPath(results, "3;value", []);
        var databaseNodes = commonUtils.getValueByJsonPath(results, "4;value", []);
        var vms = commonUtils.getValueByJsonPath(results, "5", []);
        var vmis = commonUtils.getValueByJsonPath(results, "6", []);
        var svcInsts = commonUtils.getValueByJsonPath(results, "7", []);
        var fips = commonUtils.getValueByJsonPath(results, "8;floating-ips", []);
        var alarms = commonUtils.getValueByJsonPath(results, "9", {});
        var vns = commonUtils.getValueByJsonPath(results, "10;value", []);
        resultJSON['vRoutersNodes'] = vrNodes;
        resultJSON["controlNodes"] = controlNodes;
        resultJSON["analyticsNodes"] = analyticsNodes;
        resultJSON["configNodes"] = configNodes;
        resultJSON["databaseNodes"] = databaseNodes;
        resultJSON["vms"] = vms;
        resultJSON["vmis"] = vmis;
        resultJSON["svcInsts"] = svcInsts;
        resultJSON["fips"] = fips;
        resultJSON["vns"] = vns;
        resultJSON["alarms"] = alarms;
        commonUtils.handleJSONResponse(null, res, resultJSON);
    });
}
exports.getGlobalControllerOverview = getGlobalControllerOverview;

