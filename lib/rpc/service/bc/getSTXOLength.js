'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSTXOLength;


const { GetUtxoLengthRequest, GetUtxoLengthResponse } = require('@overline/proto/proto/bc_pb'); /**
                                                                                                 * Copyright (c) 2017-present, BlockCollider developers, All rights reserved.
                                                                                                 *
                                                                                                 * This source code is licensed under the MIT license found in the
                                                                                                 * LICENSE file in the root directory of this source tree.
                                                                                                 *
                                                                                                 * 
                                                                                                 */

function getSTXOLength(context, call, callback) {
  const req = call.request;
  const scriptType = req.getScriptType();
  context.server.engine.utxoManager.getUtxosLength(scriptType).then(length => {
    if (length >= 0) {
      const response = new GetUtxoLengthResponse([length]);
      callback(null, response);
    } else callback(new Error(`Could not get length of ${scriptType}`));
  }).catch(err => {
    context.logger.error(`Could not get length of ${scriptType}, reason: ${err}'`);
    callback(err);
  });
}