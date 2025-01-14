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
Object.defineProperty(exports, "__esModule", { value: true });
exports.STEEmitter = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const events_1 = require("events");
class STEEmitter extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.on = (event, listener) => super.on(event, listener);
        this.emit = (event, ...args) => super.emit(event, ...args);
    }
}
exports.STEEmitter = STEEmitter;
