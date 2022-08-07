import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import CardBox from "../../constant/CardBox.constant";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

describe("Button Component", () => {
  const handleAddProduct = jest.fn();
  // const handleClick=jest.fn()
  const detail = {
    name: "Fresho Kiwi - Green, 3 pcs",
    imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
    description:
      "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
    price: 87,
    stock: 90,
    totalStock: 90,
    amountQty: 3,
    qty: "pcs",
    category: "5b6899953d1a866534f516e2",
    sku: "fnw-kiwi-3",
    id: "5b6c6a7f01a7c38429530883",
  };

  it("matches snapshot", () => {
    const { asFragment } = render(
      <CardBox detail={detail} handleAddProducte={handleAddProduct} />,
      { wrapper: MemoryRouter }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("Button Text", () => {
    render(<CardBox detail={detail} handleAddProduct={handleAddProduct} />, {
      wrapper: MemoryRouter,
    });
    const button = screen.getByRole("button");
    // expect(button).toHaveTextContent("Add to Cart");
    fireEvent.click(button);
  });

  test("should be able to type name input field", () => {
    render(<CardBox detail={detail} handleAddProduct={handleAddProduct} />, {
      wrapper: MemoryRouter,
    });
    const inputEl = screen.getByTestId("input");
    fireEvent.change(inputEl, { target: { value: 12 } });
    expect(inputEl.value).toBe("12");
  });
});
