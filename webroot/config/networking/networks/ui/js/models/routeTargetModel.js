/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var routeTargetModel = ContrailModel.extend({

        defaultConfig: {
            'asn': null,
            'target': null
        },


        validateAttr: function (attributePath, validation, data) {
            var model = data.model().attributes.model(),
                attr = cowu.getAttributeFromPath(attributePath),
                errors = model.get(cowc.KEY_MODEL_ERRORS),
                attrErrorObj = {}, isValid;

            isValid = model.isValid(attributePath, validation);

            attrErrorObj[attr + cowc.ERROR_SUFFIX_ID] = (isValid == true) ? false : isValid;
            errors.set(attrErrorObj);
        },


        validations: {
            routeTargetModelConfigValidations: {
                'asn':
                    function (value, attr, finalObj) {
                    msg = "Enter ASN between 1 - 4294967294 if 4byte ASN enabled or 65534 or" +
                          " IP Address in the format xxx.xxx.xxx.xxx";
                    if (value) {
                        var asn = Number(value);
                        if (!isNaN(asn)) {
                            if (asn < 1 || asn > 4294967294) {
                                return msg;
                            }
                        } else if (!isValidIP(value) ||
                                   value.trim().indexOf("/") != -1) {
                            return msg;
                        }
                    } else {
                        return msg;
                    }
                },
                'target': {
                    required: true,
                    min: 1,
                    max: 4294967295,
                    msg: '1-4294967295'
                },
            }
        }
    });
    return routeTargetModel;
});
