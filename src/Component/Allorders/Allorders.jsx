import React from 'react';

export default function Allorders() {

    const storedData = localStorage.getItem("allItems");
        const allItems = JSON.parse(storedData);

    return (
        <>
            {allItems ? (
                <div className='mt-4'>
                    <h2 className='fw-normal mb-4'>totalPrice: {allItems.totalCartPrice}</h2>

                    {allItems.products.map((item) => (
                        <div key={item._id} className="row py-3 border border-bottom border-top-0 border-end-0 border-start-0 bg-main-light">
                            <div className="col-md-2">
                                <img className="w-100" src={item.product.imageCover} alt="" />
                            </div>
                            <div className="col-md-10  d-flex justify-content-between">
                                <div>
                                    <h2 className="h5">{item.product.title.split(" ").slice(0, 8).join(" ")}</h2>
                                    <h2 className="text-main h5">price: {item.price}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h2>All orders are empty</h2>
            )}
        </>
    );
}
