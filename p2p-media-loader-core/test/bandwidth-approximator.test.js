"use strict";
/**
 * Copyright 2018 Novage LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="mocha" />
const bandwidth_approximator_1 = require("../lib/bandwidth-approximator");
const assert = __importStar(require("assert"));
describe("SpeedApproximator", () => {
    it("should calculate bandwidth correctly", () => {
        const bandwidthApp = new bandwidth_approximator_1.BandwidthApproximator();
        const smoothInterval = bandwidthApp.getSmoothInterval();
        const measureInterval = bandwidthApp.getMeasureInterval();
        assert.strictEqual(bandwidthApp.getBandwidth(1), 0);
        assert.strictEqual(bandwidthApp.getBandwidth(1), 0);
        bandwidthApp.addBytes(1, 1);
        assert.strictEqual(bandwidthApp.getBandwidth(1), 1 / smoothInterval);
        bandwidthApp.addBytes(1, 2);
        assert.strictEqual(bandwidthApp.getBandwidth(2), 2 / smoothInterval);
        bandwidthApp.addBytes(1, 3);
        assert.strictEqual(bandwidthApp.getBandwidth(4), 3 / smoothInterval);
        assert.strictEqual(bandwidthApp.getBandwidth(4), 3 / smoothInterval);
        assert.strictEqual(bandwidthApp.getBandwidth(5), 3 / smoothInterval);
        assert.strictEqual(bandwidthApp.getBandwidth(5), 3 / smoothInterval);
        bandwidthApp.addBytes(1, smoothInterval + 3);
        assert.strictEqual(bandwidthApp.getBandwidth(smoothInterval + 3), 3 / smoothInterval);
        assert.strictEqual(bandwidthApp.getBandwidth(measureInterval), 3 / smoothInterval);
        assert.strictEqual(bandwidthApp.getBandwidth(measureInterval + 1), 3 / smoothInterval);
        assert.strictEqual(bandwidthApp.getBandwidth(measureInterval + 2), 3 / smoothInterval);
        assert.strictEqual(bandwidthApp.getBandwidth(measureInterval + 3), 3 / smoothInterval);
        assert.strictEqual(bandwidthApp.getBandwidth(measureInterval + 4), 2 / smoothInterval);
        assert.strictEqual(bandwidthApp.getBandwidth(measureInterval + 5), 2 / smoothInterval);
        assert.strictEqual(bandwidthApp.getBandwidth(measureInterval + smoothInterval + 3), 2 / smoothInterval);
        assert.strictEqual(bandwidthApp.getBandwidth(measureInterval + smoothInterval + 4), 0);
        assert.strictEqual(bandwidthApp.getBandwidth(measureInterval + smoothInterval + 5), 0);
    });
});
