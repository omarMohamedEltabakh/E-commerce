import React, { useState } from "react";
import './Brands.module.css'
import axios from "axios";
import { useQuery } from "react-query";

export default function Brands() {
  const [modal, setmodal] = useState(true);
  function showModal(check){
    setmodal(check);
  }
  
  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let {data} = useQuery("brands",()=>getAllBrands());
  console.log(data?.data.data);


  return <>

  <div className="row gy-4">
    <h1 className="text-center text-main fw-bolder pt-4">All Brands</h1>
    {data?.data.data.map((brand)=>
    
    <div key={brand._id} className="col-lg-3 col-md-4 col-sm-6 col-12 ">
      {/* start modal */}
      <div>
          <div class="modal fade" id={`staticBackdrop-${brand._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex   justify-content-between align-items-center">
                  <div>
                  <h2 className="text-center  text-main fw-bold ">{brand.name}</h2>
                  <h2 className=" h6 mb-5 BrandName  ">{brand.name}</h2>
                  </div>
                  <img src={brand.image} className="w-50" alt="" />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end modal */}
      <div className="border brand overflow-hidden rounded-3" data-bs-toggle="modal"data-bs-target={`#staticBackdrop-${brand._id}`}>
        
        <img className="w-100" src={brand.image} alt="" />
        <h2 className="text-center h6 mb-5 ">{brand.name}</h2>

      </div>
    </div>
    )}
  </div>
  
  
  </>
}



