'use client';
import blogService from "@/appwrite/BlogService";
import Todos from "@/components/todos";
import DashbordNav from "@/components/ui/DashbordNav";
import HeroSection from "@/components/ui/HeroSection";
import { fetchBlogs } from "@/store/featureBlogs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await blogService.getUsers();
  //       setUsers(res.users);
  //     } catch (error) {
  //       console.error("Error getting users :: ", error);
  //     }
  //   })();
  // }
  // , []);

  // console.log("users", users);

  const dispatch = useDispatch();
    // const { blogs, loading, error } = useSelector((state) => state.featureBlogs);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    // console.log("blogs", blogs);
    // console.log("loading", loading);
    // console.log("error", error);
 
  return (
    <main >
        {/* <Todos /> */}
        <DashbordNav />
        <HeroSection />
    </main>
  );
}
