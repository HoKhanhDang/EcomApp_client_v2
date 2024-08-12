import axios from "../axios";

export const apiGetCategory = async () => {
    return await axios(
        {
            method: 'GET',
            url: `/category/get`,           
        } 
    );
}
export const apiGetBrand = async () => {
    return await axios(
        {
            method: 'GET',
            url: `/brand/get`,           
        } 
    );
}

