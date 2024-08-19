import { MdOutlineArrowUpward } from "react-icons/md";
export default function MoveToTop() {
    return (
        <div className="fixed bottom-[100px] right-[20px] z-[1000] hover:jello-vertical">
            <a href="#" className="w-[60px] h-[60px] rounded-[50%] bg-main-100 text-white flex justify-center items-center">
                <MdOutlineArrowUpward className="text-[30px]"/>
            </a>
        </div>
    )
}