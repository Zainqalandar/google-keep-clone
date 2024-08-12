'use client';
import blogService from "@/appwrite/BlogService";
import Todos from "@/components/todos";
import { useEffect, useState } from "react";

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
 
  return (
    <main >
        {/* <Todos /> */}
    </main>
  );
}
