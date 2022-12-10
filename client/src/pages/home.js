import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosconfig";
import Cookies from "js-cookie"

export default function HomeMessage() {
  const authState = useSelector((state) => state.auth.authState)
  const navigate = useNavigate()
  // const dispatch = useDispatch()

  useEffect(()=>{
    if (authState===false){
      return navigate("/")
    }
  })
  useEffect(()=>{
    try{

      const res = axiosInstance.get('user/listUser',{
        headers:{
          "Authorization": `Bearer ${Cookies.get('jwtAccessToken')}`
        }
      })
      console.log(res);
    }
    catch(err){
      console.log(err);
    }
  },[])
  return ( 
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col">
        </div>
        <div className="col">
          peer 2 peer
          Chatting Application
        </div>
      </div>
    </div>
  );
}
