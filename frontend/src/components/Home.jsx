/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import MetaData from './layout/MetaData'
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/api/productsApi'
import ProductItem from './product/ProductItem';
import Loader from './layout/Loader';
import toast from 'react-hot-toast';
import CustomPagination from './layout/CustomPagination';


const Home = () => {

    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const params = { page };

    const { data, isLoading, error, isError } = useGetProductsQuery(params);
    console.log("data: ", data, "isLoading: ", isLoading)

    useEffect(() => {
        if(isError) {
            toast.error(error?.data?.message);
        }
    }, [isError])

    if(isLoading) return <Loader />

  return (
    <>
        <MetaData title={"Come and GetNow"}/>
        <div className="row">
            <div className="col-12 col-sm-6 col-md-12">
                <h1 id="products_heading" className="text-secondary">Latest Products</h1>

                <section id="products" className="mt-5">
                <div className="row">
                   {data?.products?.map((product) => (
                    <ProductItem product={product}/>
                   ))}
                </div>
                </section>

                   <CustomPagination resPerPage={data?.resPerPage} filteredProductsCount={data?.filteredProductsCount}/>

            </div>
        </div>
    </>
  )
}

export default Home
