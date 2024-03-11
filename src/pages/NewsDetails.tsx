import { Breadcrumbs, Typography, Link } from "@mui/material";
import RelatedFeeds from "./RelatedFeeds";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { useParams } from "react-router-dom";

type BlogData = {
  id: string;
  category: string;
  heading: string;
  mainbody: string;
  middlehead: string;
  photoURL: string;
  subheading: string;
  createdAt: string;
};

const NewsDetails = () => {
  const [blogDetail, setBlogDetail] = useState<BlogData>();
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "blog", `${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const blog = docSnap.data() as BlogData;
          setBlogDetail(blog);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "blog"),
          where("category", "==", blogDetail?.category)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as BlogData)
        );

        const selectedData = data.filter((rev) => rev.id !== id);
        setBlogs(selectedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const paragraphs = blogDetail?.mainbody
    .split("\n")
    .map((line, index) => <p key={index}>{line}</p>);

  return (
    <div>
      <div className="flex justify-center">
        <div className="lg:w-[85%] w-full">
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
            <Link underline="hover" color="inherit" href="/">
              Newstopedia
            </Link>
            <Typography color="text.primary">{blogDetail?.category}</Typography>
          </Breadcrumbs>
          <hr />
          <div>
            <h1 className="font-bold lg:text-[45px] text-[20px] mb-2 text-center leading-tight">
              {blogDetail?.heading}
            </h1>
          </div>
          <div>
            <img
              className="w-full h-[50%] object-cover rounded-md"
              src={blogDetail?.photoURL}
            />
            <div className="flex justify-between items-center my-2">
              <span className="text-yellow-700 font-bold text-[13px]">
                {blogDetail?.category} news
              </span>
              <span className="text-black/40 text-[12px]">
                Posted on {blogDetail?.createdAt ? blogDetail?.createdAt.substring(0, 24) : null}
              </span>
            </div>
            <hr />
          </div>
          <div className="lg:px-36 md:px-24 px-2 mt-2">
            <h1 className="lg:text-[25px] text-[22px] text-black/90 font-[500] leading-9 w-full">
              {blogDetail?.subheading}
            </h1>
            <h1 className="text-[22px] py-4 text-black/70 leading-7">
              {blogDetail?.middlehead}
            </h1>
            <hr />
            <h2 className="pt-2">{paragraphs}</h2>
            <div className="mt-3">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  View All Comment
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    {[1, 2, 3].map((_item) => (
                      <div className="mb-4 flex gap-4 border-b py-2">
                        <img
                          className="w-[3vw] h-[3vw] rounded-full object-cover"
                          src="https://th.bing.com/th?id=ORMS.71179e246969323f1312c4087f8c0fae&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0"
                        />
                        <p>
                          We currently sit in fifth place with 25 points from 14
                          games played, however we have two games in hand over a
                          number of teams sitting above us.We currently sit in
                          fifth place with 25 points from 14 games played,
                          however we have two games in hand over a number of
                          teams sitting above us.
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <textarea
                      rows={5}
                      className="border w-full"
                      placeholder="Add you comment"
                    />
                    <button className="border py-1 px-3 border-yellow-500 text-[14px]">
                      Comment
                    </button>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <RelatedFeeds blog={blogs} />
    </div>
  );
};

export default NewsDetails;
