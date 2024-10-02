"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductDialog(props: {
  product: any;
  onClose: () => void;
}) {
  const { product } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product?.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product?.images.length) % product?.images.length
    );
  };

  return (
    <Dialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          props.onClose();
        }
      }}
    >
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-auto w-full sm:max-w-[700px]  flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="capitalize">
            {product?.brand?.name}
          </DialogTitle>
          <DialogDescription>{product?.desc}</DialogDescription>
        </DialogHeader>
        <div className="p-6 space-y-6">
          <Tabs defaultValue="claims" className="w-full">
            <TabsList>
              <TabsTrigger value="claims">Claims</TabsTrigger>
              <TabsTrigger value="misleadingClaims">
                Misleading Claims
              </TabsTrigger>
            </TabsList>
            <TabsContent value="claims" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {product?.analysis?.claimsMade?.length > 0 ? (
                  <>
                    {product?.analysis?.claimsMade?.map(
                      (claim: any, index: number) => (
                        <Badge key={index} variant="secondary">
                          {claim}
                        </Badge>
                      )
                    )}
                  </>
                ) : (
                  <p>No claims made</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="misleadingClaims" className="mt-4">
              <div className="flex flex-wrap gap-2">
                {/* {product?.analysis?.misleadingClaims?.map(
                  (claim: any, index: number) => (
                    <Badge key={index} variant={"destructive"}>
                      {claim}
                    </Badge>
                  )
                )} */}

                {product?.analysis?.misleadingClaims?.length > 0 ? (
                  <>
                    {product?.analysis?.misleadingClaims?.map(
                      (claim: any, index: number) => (
                        <Badge key={index} variant="destructive">
                          {claim}
                        </Badge>
                      )
                    )}
                  </>
                ) : (
                  <p>No misleading claims made</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={product?.images[currentImageIndex].l}
                alt={`Product image ${currentImageIndex + 1}`}
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
            <div className="space-y-4">
              {product?.analysis?.metaData?.length > 0 && (
                <>
                  <div>
                    <h3 className="font-semibold mb-2">Product Details</h3>
                    <ul className="space-y-1">
                      {product?.analysis?.metaData?.map(
                        (item: any, index: number) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">{item.label}:</span>{" "}
                            {item.value}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <Separator />
                </>
              )}
              {product?.analysis?.ingredients?.length > 0 && (
                <>
                  <div>
                    <h3 className="font-semibold mb-2">Ingredients</h3>
                    <ul className="space-y-1">
                      {product?.analysis?.ingredients?.map(
                        (ingredient: any, index: number) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">
                              {ingredient.label}:
                            </span>{" "}
                            {ingredient.value} - {ingredient.description}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <Separator />
                </>
              )}

              {product?.analysis?.nutrition?.length > 0 && (
                <>
                  <div>
                    <h3 className="font-semibold mb-2">Nutrition</h3>
                    <ul className="space-y-1">
                      {product?.analysis?.nutrition?.map(
                        (ingredient: any, index: number) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">
                              {ingredient.label}:
                            </span>{" "}
                            {ingredient.value} - {ingredient.description}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <Separator />
                </>
              )}

              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <p>
                  {product?.category?.tlc_name} - {product?.category?.mlc_name}{" "}
                  - {product?.category?.llc_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
