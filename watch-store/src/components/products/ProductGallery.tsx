"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: { imageUrl: string }[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active]?.imageUrl;
  if (images.length === 0) return <div className="aspect-square bg-ivory" />;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden bg-ivory">
        <Image
          src={current}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden bg-ivory ${
                i === active ? "ring-2 ring-brass" : "opacity-70"
              }`}
            >
              <Image
                src={img.imageUrl}
                alt={`${productName} view ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
