/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */
define([
    'co-test-constants',
    'co-test-runner',
    'ct-test-utils',
    'ct-test-messages',
    'config/networking/routeaggregate/test/ui/views/routeAggregateGridView.mock.data',
    'co-grid-contrail-list-model-test-suite',
    'co-grid-view-test-suite'
], function (cotc, cotr, cttu, cttm, TestMockdata, GridListModelTestSuite, GridViewTestSuite) {

    var moduleId = cttm.ROUTE_AGGREGATE_GRID_VIEW_COMMON_TEST_MODULE;

    var testType = cotc.VIEW_TEST;

    var fakeServerConfig = cotr.getDefaultFakeServerConfig();

    var fakeServerResponsesConfig = function() {
        var responses = [];
        responses.push(cotr.createFakeServerResponse( {
            url: cttu.getRegExForUrl(ctwc.URL_ALL_DOMAINS),
            body: JSON.stringify(TestMockdata.routeAggregateDomainsData)
        }));
        responses.push(cotr.createFakeServerResponse( {
            url: cttu.getRegExForUrl(ctwc.URL_ALL_PROJECTS),
            body: JSON.stringify(TestMockdata.routeAggregatePojectsData)
        }));
        responses.push(cotr.createFakeServerResponse({
            url: /\/api\/tenants\/config\/get-config-details.*$/,
            method: "POST",
            body: JSON.stringify(TestMockdata.routeAggregateMockData)
        }));
        return responses;
    };
    fakeServerConfig.getResponsesConfig = fakeServerResponsesConfig;

    var pageConfig = cotr.getDefaultPageConfig();
    pageConfig.hashParams = {
        p: 'config_net_routing',
        q: {
            tab: {
                'rt-table-tab' : 'route_aggregates_tab'
            }
        }
    };
    pageConfig.loadTimeout = cotc.PAGE_LOAD_TIMEOUT * 2;

    var getTestConfig = function() {
        return {
            rootView: rtTablePageLoader.rtTableView,
            tests: [
                {
                    viewId: ctwc.ROUTE_AGGREGATE_GRID_ID,
                    suites: [
                        {
                            class: GridViewTestSuite,
                            groups: ['all']
                        }
                    ]
                }
            ]
        } ;

    };

    var pageTestConfig = cotr.createPageTestConfig(moduleId, testType, fakeServerConfig, pageConfig, getTestConfig);

    cotr.startTestRunner(pageTestConfig);

});
