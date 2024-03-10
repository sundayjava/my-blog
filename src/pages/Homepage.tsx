import { DoDisturbOn } from "@mui/icons-material";
import { category } from "../data/category";
import NewsList from "../components/NewsList";
import MustReadList from "../components/MustRead/MustReadList";
import WeeklyList from "../components/weeklyhighlight/WeeklyList";
import { useNavigate } from "react-router-dom";
import TypewriterComponent from "typewriter-effect";
import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

type BlogData = {
  id:string,
  category: string;
  heading: string;
  mainbody: string;
  middlehead: string;
  photoURL: string;
  subheading: string;
};

const Homepage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const q = query(collection(db, "blog"), where("category", "==", 'Transfer'));
        const querySnapshot = await getDocs(collection(db, "blog"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() 
        } as BlogData));
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     const querySnapshot = await getDocs(collection(db, "blog"));
  //     querySnapshot.forEach((doc) => {
  //       const blogData = doc.data() as BlogData;
  //       setNewBlog(blogData);
  //     });
  //   };

  //   getData();
  // }, []);

  return (
    <div className="w-full">
      <ul className="flex w-full gap-2 lg:gap-16 lg:justify-center overflow-x-scroll border-t border-b py-2">
        {category.map((item) => (
          <li
            key={item.id}
            className="px-4 py-[2px] cursor-pointer hover:bg-yellow-800 hover:text-white text-[12px] bg-yellow-400 rounded-full"
          >
            {item.name}
          </li>
        ))}
      </ul>

      <div className="mt-4 mb-9 lg:px-5 px-1 py-1 bg-gray-100 rounded-lg text-[13px] font-bold flex gap-2 justify-center cursor-pointer">
        <TypewriterComponent
          options={{
            wrapperClassName: "text-gray-600",
            autoStart: true,
            delay: 50,
            loop: true,
            strings: [
              "Get daily and weekly update about sports and other tournament",
              "Sport is a physical activity involving skill and competition",
              "Subscribe to our blog to get updated everytime",
            ],
          }}
        />
      </div>

      <div className="md:my-6 flex h-[40%] rounded-lg">
        <div
          className="lg:w-[65%] w-full relative cursor-pointer flex justify-center"
          onClick={()=>navigate(`/news/${blogs[0]?.id}`)}
        >
          <img
            className="lg:w-[45vw] w-full h-full hover:rounded-lg rounded-md "
            src={blogs[0]?.photoURL}
          />
          <div className="absolute bottom-8 px-3 py-3 hover:bg-yellow-400/30 hover:text-white text-transparent rounded-md cursor-pointer lg:block hidden">
            <p className=" text-[20px] font-bold w-[35vw] text-center hover:underline">
              {blogs[0]?.heading}
            </p>
            <p className="text-[14px] w-[35vw] text-center mt-1">
            {blogs[0]?.subheading}
            </p>
          </div>
          <div className=" absolute bottom-2 m-auto leading-5 lg:hidden bg-black/20">
            <p className=" text-[20px] font-bold text-white text-center hover:underline">
            {blogs[0]?.heading}
            </p>
          </div>
        </div>
        <div className="w-[30%] hidden lg:flex flex-col justify-center">
          {blogs.slice(1,5).map((items, index) => (
            <div className="flex gap-2 mb-4 cursor-pointer border-b pb-2" key={items.id} onClick={()=>navigate(`/news/${items.id}`)}>
              <img
                className="w-[5vw] h-[4vw] object-cover rounded-md"
                src={items.photoURL}
              />
              <div>
                <div className="flex justify-between items-center">
                  <p className="text-[12px] text-yellow-600">
                    {index % 2 ? (
                      <DoDisturbOn sx={{ color: "gray", fontSize: 18 }} />
                    ) : (
                      "ON"
                    )}
                  </p>{" "}
                  <span className="text-[14px] font-normal">Newstopedia</span>{" "}
                  <span className="text-[14px] text-black/40">1hrs ago</span>
                </div>
                <h2 className="mt-2 text-[15px] font-[500]">
                  {items.heading.slice(0,30)}...
                </h2>
                <p className="mt-2 text-[13px] text-yellow-600 font-[500]">
                  {items.category} <span className="text-black/40 text-[12px]">-</span>{" "}
                  <span className="text-black/40 text-[12px]">2 min read</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="mb-2" />
      <NewsList blog={blogs}/>
      <hr className="mb-2 mt-2" />
      <MustReadList />
      <hr className="mb-2 mt-2" />
      <WeeklyList />
    </div>
  );
};

export default Homepage;
