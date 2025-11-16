// https://github.com/vitest-dev/vitest/issues/3117
import { vi } from "vitest";
// @ts-expect-error unit test
globalThis.jest = vi;

import "@testing-library/jest-dom";
