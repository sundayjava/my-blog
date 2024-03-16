import { DoDisturbOn } from "@mui/icons-material";
import { category } from "../data/category";
import NewsList from "../components/NewsList";
import WeeklyList from "../components/weeklyhighlight/WeeklyList";
import { useNavigate } from "react-router-dom";
import TypewriterComponent from "typewriter-effect";
import { useEffect, useState } from "react";
import { getDocs, collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import MomentTimeDisplay from "../utils/dateFormatted";
import { Backdrop, CircularProgress } from "@mui/material";

type BlogData = {
  id: string;
  createdAt: string;
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
  const [descblogs, setDesBlogs] = useState<BlogData[]>([]);
  const [latestblogs, setLatestBlogs] = useState<BlogData[]>([]);
  const [changeCategory, setChangeCategory] = useState("");
  const [loading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true)
      try {
        const q = query(
          collection(db, "blog"),
          where("category", "==", changeCategory)
        );
        const q2 = query(collection(db, "blog"), orderBy("createdAt", "desc"));
        let querySnapshot;
        if (changeCategory === "" || changeCategory === "All") {
          querySnapshot = await getDocs(q2);
        } else {
          querySnapshot = await getDocs(q);
        }
        const data = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as BlogData)
        );
        setBlogs(data);
        setIsloading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(true)
      }
    };

    fetchData();
  }, [changeCategory]);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true)
      try {
        const q = query(
          collection(db, "blog"),
          where("highlight", "==", "yes")
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as BlogData)
        );
        setDesBlogs(data);
        setIsloading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(true)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true)
      try {
        const q = query(collection(db, "blog"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as BlogData)
        );
        setLatestBlogs(data);
        setIsloading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(true)
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <ul className="flex w-full gap-2 lg:gap-16 lg:justify-center overflow-x-scroll lg:overflow-hidden bg-gray-700 border-t border-b py-2">
        {category.map((item) => (
          <li
            key={item.id}
            onClick={() => setChangeCategory(item.name)}
            className="px-4 py-[2px] cursor-pointer hover:bg-yellow-800 hover:text-white text-[12px] bg-yellow-400 rounded-full"
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div id="hbagency_space_127054"></div>
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
      {!loading && blogs.length ? (
        <div className="md:my-6 flex h-[40%] rounded-lg">
          <div
            className="lg:w-[65%] w-full h-[40vh] relative cursor-pointer flex justify-center"
            onClick={() => navigate(`/news/${blogs[0]?.id}`)}
          >
            <img
              className="lg:w-[45vw] w-full h-full object-cover hover:rounded-lg rounded-md "
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
          <div className="w-[30%] hidden lg:flex flex-col justify-center items-center">
            {blogs.slice(1, 4).map((items, index) => (
              <div
                className="flex bg-gray-800 px-2 text-white/80 gap-2 mb-4 cursor-pointer border-b pb-2 items-center"
                key={items.id}
                onClick={() => navigate(`/news/${items.id}`)}
              >
                <img
                  className="w-[5vw] h-[4vw] object-cover rounded-md"
                  src={items.photoURL}
                />
                <div>
                  <h2 className="text-[15px] font-[500] line-clamp-2">{items.heading}</h2>
                  <div className="flex justify-between items-center">
                    <p className="text-[12px] text-yellow-600">
                      {index % 2 ? (
                        <DoDisturbOn sx={{ color: "gray", fontSize: 18 }} />
                      ) : (
                        "ON"
                      )}
                    </p>{" "}
                    <span className="text-[14px] font-normal">
                      <p className="mt-2 text-[12px]">{items.category} </p>
                    </span>{" "}
                    <span className="text-[14px] text-black/40">
                      {items.createdAt ? (
                        <MomentTimeDisplay timestamp={items.createdAt} />
                      ) : null}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
      )}
      <hr className="mb-2" />
      {blogs && <NewsList blog={latestblogs} />}
      <hr className="mb-2 mt-2" />
      <WeeklyList item={descblogs} />
    </div>
  );
};

export default Homepage;
