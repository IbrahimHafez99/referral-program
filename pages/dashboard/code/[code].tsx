import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
const Code = () => {
  const router = useRouter();
  // return <div>{router.query.code}</div>;
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-[2rem] font-bold text-white">
          {router.query.code} Statistics
        </h1>
        <hr />
        <div className="flex flex-wrap w-full justify-between items-center mt-3">
          <div className="card w-[23%] bg-base-100 shadow-xl glass gap-[2%]">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1533251107558-25299f5a3893?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80"
                alt="moon"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card w-[23%] bg-base-100 shadow-xl glass gap-[2%]">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1533251107558-25299f5a3893?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80"
                alt="moon"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card w-[23%] bg-base-100 shadow-xl glass gap-[2%]">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1533251107558-25299f5a3893?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80"
                alt="moon"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card w-[23%] bg-base-100 shadow-xl glass gap-[2%]">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1533251107558-25299f5a3893?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80"
                alt="moon"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Code;
