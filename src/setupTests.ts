// https://github.com/vitest-dev/vitest/issues/3117
import { vi } from "vitest";
globalThis.jest = vi;

import "@testing-library/jest-dom";
