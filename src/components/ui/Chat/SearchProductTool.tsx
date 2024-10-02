import { Button } from "../button";
import ProductDialog from "./ProductDialog";
import { useState } from "react";

export const SearchProductTool = (props: { toolInvocation: any }) => {
  const { toolInvocation } = props;

  const { args, result } = toolInvocation || {};

  const [activeProduct, setActiveProduct] = useState<any | null>(null);

  return (
    <div>
      <p className="font-semibold text-gray-800">{args.query}</p>

      <div className="flex flex-col gap-2">
        {result?.products?.map((product: any, i: number) => {
          return (
            <section
              className="shadow-sm border border-gray-200 flex gap-2"
              key={i}
            >
              <img src={product.images?.[0]?.s} />

              <section>
                <h3 className="font-semibold">
                  <span className="capitalize">{product.brand.name}</span> -{" "}
                </h3>

                <p>{product.desc}</p>

                <Button
                  onClick={() => {
                    setActiveProduct(product);
                  }}
                >
                  Open
                </Button>
              </section>
            </section>
          );
        })}
      </div>

      {activeProduct && (
        <ProductDialog
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </div>
  );
};
