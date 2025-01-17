"use strict";
/**
 * Copyright 2019 Novage LLC.
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
exports.SegmentsMemoryStorage = void 0;
class SegmentsMemoryStorage {
    constructor(settings) {
        this.settings = settings;
        this.cache = new Map();
        this.storeSegment = async (segment) => {
            this.cache.set(segment.id, { segment, lastAccessed: performance.now() });
        };
        this.getSegmentsMap = async () => {
            return this.cache;
        };
        this.getSegment = async (id) => {
            const cacheItem = this.cache.get(id);
            if (cacheItem === undefined) {
                return undefined;
            }
            cacheItem.lastAccessed = performance.now();
            return cacheItem.segment;
        };
        this.hasSegment = async (id) => {
            return this.cache.has(id);
        };
        this.clean = async (masterSwarmId, lockedSegmentsFilter) => {
            const segmentsToDelete = [];
            const remainingSegments = [];
            // Delete old segments
            const now = performance.now();
            for (const cachedSegment of this.cache.values()) {
                if (now - cachedSegment.lastAccessed > this.settings.cachedSegmentExpiration) {
                    segmentsToDelete.push(cachedSegment.segment.id);
                }
                else {
                    remainingSegments.push(cachedSegment);
                }
            }
            // Delete segments over cached count
            let countOverhead = remainingSegments.length - this.settings.cachedSegmentsCount;
            if (countOverhead > 0) {
                remainingSegments.sort((a, b) => a.lastAccessed - b.lastAccessed);
                for (const cachedSegment of remainingSegments) {
                    if (lockedSegmentsFilter === undefined || !lockedSegmentsFilter(cachedSegment.segment.id)) {
                        segmentsToDelete.push(cachedSegment.segment.id);
                        countOverhead--;
                        if (countOverhead === 0) {
                            break;
                        }
                    }
                }
            }
            segmentsToDelete.forEach((id) => this.cache.delete(id));
            return segmentsToDelete.length > 0;
        };
        this.destroy = async () => {
            this.cache.clear();
        };
    }
}
exports.SegmentsMemoryStorage = SegmentsMemoryStorage;
