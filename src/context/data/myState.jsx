import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp } from "firebase/firestore";
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


     
        setLoading(true)


        try {
            const productRef=collection(fireDB,'products')
            await addDoc(productRef,products)
            toast.success("Product Add successfully")
            setTimeout(()=>{
                window.location.href='/dashboard'
            },800);
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
                            productArray.push({...doc.data(),id: doc.id});
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


// update product function

const edithandle=(item)=>{
    setProducts(item)
}
const updateProduct=async()=>{
    console.log("Updating product:", products); // Debugging line
    if (!products.id) {
        toast.error("No product selected for update");
        return;
    }
    setLoading(true)
    try {
        await setDoc(doc(fireDB,'products',products.id),products)
        toast.success("Product Updated Successfully")
        setTimeout(()=>{
            window.location.href='/dashboard'
        },800)
        getProductData();
        setLoading(false)
       
        
    } catch (error) {
        console.log(error)
        setLoading(false)     
    }
}

// delete product

const deleteProduct=async(item)=>{
    try {
        setLoading(true)
        await deleteDoc(doc(fireDB,'products',item.id));
        toast.success("Product Deleted Successfully")
        setLoading(false)
        getProductData();
        
    } catch (error) {
          // toast.success('Product Deleted Falied')
          setLoading(false)

        
    }
}

    
    return (
       <MyContext.Provider value={{mode,toggleMode,loading,setLoading,
        products,setProducts,addProduct,product,
        edithandle,updateProduct,deleteProduct
       }}>
        {props.children}
       </MyContext.Provider>
        )
}

export default MyState;