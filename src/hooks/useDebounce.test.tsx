import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useDebounce from "./useDebounce";

vi.useFakeTimers();

describe("useDebounce", () => {
  it("should return the initial value", () => {
    const { result } = renderHook(() =>
      useDebounce({ value: "initial", delay: 500 })
    );

    expect(result.current).toBe("initial");
  });

  it("should debounce the input value", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce({ value, delay }),
      {
        initialProps: { value: "", delay: 500 },
      }
    );

    rerender({ value: "test", delay: 500 });
    expect(result.current).toBe("");

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toBe("test");
  });

  it("should handle the delay change", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce({ value, delay }),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    rerender({ value: "test", delay: 1000 });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("test");
  });

  it("should handle the value change before the delay expires", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce({ value, delay }),
      {
        initialProps: { value: "", delay: 500 },
      }
    );

    rerender({ value: "test1", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    rerender({ value: "test2", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("test2");
  });
});
