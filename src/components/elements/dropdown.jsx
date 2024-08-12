import { Link } from "react-router-dom";
import "./dropdown.css";
import { FaAngleDown } from "react-icons/fa";

export default function Dropdown({items,brands,categories}) {
    console.log(brands);
    return (
        <div class="dropdown pr-[30px] ">
            <div className="flex flex-row justify-center items-center">
                <p class="text-[15px] pr-2">{items?.name}</p>
                {items.isDropdown && <FaAngleDown />}
            </div>
            {items.isDropdown && items.name === "CATEGORIES" && (
                <div class="dropdown-content">
                    {categories?.res?.map((item, index) => {             
                        return (                  
                            <Link key={index} to={`/${item.title}`}>
                                {item.title}
                            </Link>
                        );
                    })}
                </div>
            )}

            {items.isDropdown && items.name === "COLLECTIONS" && (
                <div class="dropdown-content">
                    {items.items?.map((item, index) => {
                        
                        return (
                            <Link key={index} to={`/all?sort=${item.value}`}>
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
            {items.isDropdown && items.name === "BRANDS" && (
                <div className= {items.items.length > 5 ? "over-items": "dropdown-content "}>
                    {brands?.res?.map((item, index) => {                   
                        return (
                            <Link key={index} to={`/all?brand=${item.title}`}>
                                {item.title}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
