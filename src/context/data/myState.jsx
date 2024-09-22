import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import { addDoc, collection, onSnapshot, orderBy, query, QuerySnapshot, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB}from "../../firebase/FirebaseConfig"

function MyState(props) {
    const[mode,setMode]=useState('light');
    const[loading,setLoading]=useState(false);

    const toggleMode=()=>{
        if(mode==='light'){
            setMode('dark');
            document.body.style.backgroundColor='rgb(17, 24, 39)';
        }
        else{
            setMode('light');
            document.body.style.backgroundColor='white';
        }
    };

    const[products,setProducts]=useState({
        title:null,
        price:null,
        imageUrl:null,
        category:null,
        description:null,
        time:Timestamp.now(),
        date:new Date().toLocaleString(
            "es-us",
            {
                month:"short",
                day:"2-digit",
                year:"numeric",
            }
        )

    })
    // Add Product section..............

    const addProduct=async()=>{
        if(products.title==null || products.price==null || products.imageUrl==null || products.category==null || products.description==null){
            return toast.error('Please fill all fields')
        }
        const productRef=collection(fireDB,products)
        setLoading(true)
        try {
            await addDoc(productRef,'products')
            toast.success("Product Add successfully")
            getProductData()
            closeModal()
            setLoading(false)
          } catch (error) {
            console.log(error)
            setLoading(false)
            }
            setProducts("")
        }

        const [product,setProduct]=useState([]);
        
        
        // Get Products............

        const getProductData=async()=>{
            setLoading(true)
            try { 
                const q=query(
                    collection(fireDB,"products"),
                    orderBy("time"),
                    // limit5
                    );

                    const data=onSnapshot(q,(QuerySnapshot)=>{
                        let productArray=[];
                        QuerySnapshot.forEach((doc)=>{
                            productArray.push({...doc.data(),id: doc.id})
                        });
                        setProduct(productArray)
                        setLoading(false);
                    
                    });
                    return()=>data;
                  } catch (error) {
                    console.log(error)
                    setLoading(false)
                
            }
        }

        useEffect(()=>{
            getProductData();
        },[]);


    
    return (
       <MyContext.Provider value={{mode,toggleMode,loading,setLoading,
        products,setProducts,addProduct,product
       }}>
        {props.children}
       </MyContext.Provider>
        )
}

export default MyState;