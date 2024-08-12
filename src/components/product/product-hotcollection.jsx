import {useEffect, useState} from 'react';
import apis from '../../apis';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';



export const CategoryCard = ({categories}) => {
    const [isSelect, setIsSelect] = useState(false);
    const [isIndex, setIndex] = useState(0);

    return (
        <div className="flex-auto w-full h-full">
            <div className='flex flex-row justify-center items-center border w-full'>
                <div className="w-[40%] h-full p-5">
                    <img src={categories.image} alt="" />
                </div>
                <div className="w-[60%] h-full flex flex-col justify-start items-start p-5">

                    <p className="text-[15px] text-main-text w-full flex font-semibold pb-[10px]">{categories.title}</p>    

                    <div className='flex flex-col'>
                        {
                            categories.brand.map((item, index) => {
                                return (
                                    <div key={index} className="w-full h-full flex flex-row justify-start items-center "
                                        onMouseEnter={(e)=>{
                                            e.stopPropagation();
                                            setIsSelect(true)    
                                            setIndex(index)               
                                          }}
                                        onMouseLeave={(e)=>{
                                            e.stopPropagation();
                                            setIsSelect(false) 
                                            setIndex(10000)                                    
                                          }}
                                    >
                                        <MdOutlineKeyboardArrowRight className={ isSelect && index === isIndex ? 'text-main-100':'text-gray-400' }/>
                                        <Link to={`/${categories.title.toLowerCase()}?brand=${item.name}`} className={ isSelect && index === isIndex ? 'text-main-100':'text-gray-400' }>{item.name}</Link>
                                    </div>
                                )
                            })
                        }
                    </div>                       
                    

                </div>
            </div>          
        </div>
    ) 
}

const Categories =[
    {
        title: 'Smartphone',
        image: 'https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-13-red-back.png?v=b3d8c0ae',
        brand: [
            {name: 'Apple'},
            {name: 'Samsung'},
            {name: 'Xiaomi'},
            {name: 'Vivo'},
            {name: 'Oppo'},
            {name: 'LG'},
        ]
    },
    {
        title: 'Laptop',
        image: 'https://cdn.nguyenkimmall.com/images/detailed/828/10053095-laptop-lenovo-ideapad-3-14iau7-82rj0019vn-1.jpg',
        brand: [
            {name: 'Dell'},
            {name: 'HP'},
            {name: 'Asus'},
            {name: 'Acer'},
            {name: 'MSI'},
            {name: 'LG'},
        ]
    },
    {
        title: 'Tablet',
        image: 'https://img.global.news.samsung.com/vn/wp-content/uploads/2019/07/Product-Image-Galaxy-Tab-S6-2.jpg',
        brand: [
            {name: 'Apple'},
            {name: 'Samsung'},
            {name: 'Xiaomi'},
            {name: 'Vivo'},
            {name: 'Oppo'},
            {name: 'LG'},
        ]
    },
    {
        title: 'Accessories',
        image: 'https://cdn.tgdd.vn/Products/Images/54/236016/bluetooth-airpods-2-apple-mv7n2-imei-1-org.jpg',
        brand: [
            {name: 'Apple'},
            {name: 'Samsung'},
            {name: 'Xiaomi'},
            {name: 'Vivo'},
            {name: 'Oppo'},
            {name: 'LG'},
        ]
    }
    ,
    {
        title: 'Television',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s',
        brand: [
            {name: 'Apple'},
            {name: 'Samsung'},
            {name: 'Xiaomi'},
            {name: 'Vivo'},
            {name: 'Oppo'},
            {name: 'LG'},
        ]
    },
    {
        title: 'Camera',
        image: 'https://hikvision.vn/wp-content/uploads/2023/12/IDS-2SH6B6G0-IZS.jpg',
        brand: [
            {name: 'Questek'},
            {name: 'DAHUA'},
            {name: 'Ezviz'},
            {name: 'KBVISION'},
            {name: 'Yoosee'},
            {name: 'Vantech'},
        ]
    }

];

export default function ProductHotCollection() {

    return (
        <div className="flex flex-col w-full h-auto pt-[35px]">
            <div className="w-full  flex flex-row justify-start items-center border-b-[1px] ">
                <p className="text-[20px] mb-[10px] font-bold text-main-text">HOT COLLECTIONS</p>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full h-auto pt-[25px]  gap-[10px]">
                {
                    Categories.map((item, index) => {
                        return (
                            <CategoryCard key={index} categories={item} />
                        )
                    })
                }

            </div>
        </div>
        

    )

}