import ActionButton from "../commons/action-button";
import { useState } from "react";
import { RenderStar } from "ultils/helper";
import { ConvertPrice } from "ultils/helper";

export default function ProductCard({ product, id, isAction }) {
    const [isSelect, setIsSelect] = useState(false);
    return (
        <div className="h-full w-full flex flex-col justify-center relative hover:shadow-md">
            <div
                class="w-full h-full border-[2px] relative p-1"
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    setIsSelect(true);
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation();
                    setIsSelect(false);
                }}
            >
                {isSelect && isAction && (
                    <div className="flex absolute bottom-[25%] left-[30%] slide-in-elliptic-bottom-fwd">
                        <ActionButton product={product} />
                    </div>
                )}

                <img src={product.image[0].image} alt="" />
                <div className="flex flex-col justify-start p-3">
                    <div className="flex flex-row justify-start items-center">
                        <RenderStar
                            totalRating={product.totalRating}
                            isBig={false}
                        />
                        <p className="ml-1">({product.totalRating}) </p>
                    </div>
                    <p className="text-[18px] font-normal h-[70px] flex justify-start items-center">
                        {product.title}
                    </p>
                    <p className="text-[18px] font-light">
                        ${ConvertPrice(product.price)}{" "}
                    </p>
                </div>
            </div>
        </div>
    );
}
