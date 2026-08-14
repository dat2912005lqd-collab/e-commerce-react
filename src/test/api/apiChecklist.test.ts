import { describe, expect, it } from "vitest";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

describe("E-commerce API checklist", () => {
  it("GET /products?offset=0&limit=2", async () => {
    const response = await fetch(
      `${BASE_URL}/products?offset=0&limit=2`
    );

    expect(response.ok).toBe(true);

    const data = await response.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(2);
  });

  it("GET /products/1", async () => {
    const response = await fetch(
      `${BASE_URL}/products/1`
    );

    expect(response.ok).toBe(true);

    const product = await response.json();

    expect(product).toHaveProperty("images");
    expect(product).toHaveProperty("category");
  });

  it("GET invalid product should fail", async () => {
    const response = await fetch(
      `${BASE_URL}/products/999999`
    );

    expect(
      response.status === 400 ||
      response.status === 404
    ).toBe(true);
  });

  it("GET /categories", async () => {
    const response = await fetch(
      `${BASE_URL}/categories`
    );

    expect(response.ok).toBe(true);

    const categories =
      await response.json();

    expect(
      Array.isArray(categories)
    ).toBe(true);
  });
});