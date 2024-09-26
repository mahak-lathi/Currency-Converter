import './App.css';
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const myStyle = {
    backgroundImage: `url(${
        process.env.PUBLIC_URL + "./bc3.jpg"
    })`,
    height: "130vh",
    marginTop: "0px",
    fontSize: "20px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
};

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setConverted(data.rates[toCur]);
        setIsLoading(false);
      }

      if (fromCur === toCur) return setConverted(amount);
      convert();
    },
    [amount, fromCur, toCur]
  );
  return (
    <>
    <div style={myStyle} >
    <div className="container pt-5">
    <div className="row">
    <div className="col-md-6 mx-auto">
    <div className="card-body text-center">

   
    <div   style={{height:'280px', width:'350px', background :'$purple-200' }}  className="container  mt-2 mb-2 my-5 mx-5  border:5px border border-4 p-3 mb-5 bg-transparent text-white modal-content mx-auto card-body text-center ">
    <h2  className=" my-2 mb-2 mt-2 mx-2" >
       Currency Converter 
      </h2>
      <input  className=" my-4 mb-2 mt-2 mx-2"
        type="text" 
        name="name"
        id="name"
        onChange={(e) => setAmount(Number(e.target.value))}
        value={amount}
        //disabled={isLoading}
      />
      <select className="my-2 mb-2 mt-2 mx-2"
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >

        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
     
      <select  className=" my-2 mb-2 mx-2"
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p className="container my-2 ">
        <button type="submit">{converted} {toCur}
        </button>
      </p>
    </div>
    </div>
    

</div>
</div>
</div>
</div>

    </>
  );
}

