import { useParams } from "react-router-dom";
import { category } from "../data/category";
import { useEffect, useState } from "react";
import { query, collection, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import ReadMoreCard from "../components/ReadMoreCard";
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

const ReadMore = () => {
  const { type } = useParams();
  const [descblogs, setDesBlogs] = useState<BlogData[]>([]);
  const [latestblogs, setLatestBlogs] = useState<BlogData[]>([]);
  const [loading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
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
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
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
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="md:mt-10 mt-3 xl:px-52 lg:px-32 md:px-24 sm:px-0 px-0">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center md:border-b py-2">
          <h1 className="font-bold text-[18px]">{type}</h1>
          {type !== "Weekly_Highlight" ? (
            <div className="flex flex-col">
              <label htmlFor="sort" className="font-bold text-[10px]">
                Sort by
              </label>
              <select className="border rounded-md p-1 outline-none">
                {category.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
        {!loading ? (
          <div>
            {type === "Weekly_Highlight" ? (
              <div className="flex flex-col gap-3">
                {descblogs.map((item) => (
                  <ReadMoreCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {latestblogs.map((item) => (
                  <ReadMoreCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
    </div>
  );
};

export default ReadMore;
