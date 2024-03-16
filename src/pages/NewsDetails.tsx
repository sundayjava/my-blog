import {
  Breadcrumbs,
  Typography,
  Link,
  Backdrop,
  CircularProgress,
} from "@mui/material";
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
  const [loading, setIsloading] = useState(false);
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        const docRef = doc(db, "blog", `${param?.id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const blog = docSnap.data() as BlogData;
          setBlogDetail(blog);

          const q2 = query(
            collection(db, "blog"),
            where("category", "==", blog.category)
          );

          const querySnapshot = await getDocs(q2);
        const data = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as BlogData)
        );

        const selectedData = data.filter((rev) => rev.id !== param?.id);
        setBlogs(selectedData);

          setIsloading(false);
        } else {
          console.log("No such document!");
          setIsloading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(true);
      }
    };

    fetchData();
  }, [param?.id]);

  const paragraphs = blogDetail?.mainbody
    .split("\n")
    .map((line, index) => <p key={index}>{line}</p>);

  return (
    <div>
      <div className="flex justify-center">
        {!loading ? (
          <div className="lg:w-[85%] w-full">
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
              <Link underline="hover" color="inherit" href="/">
                Newstopedia
              </Link>
              <Typography color="text.primary">
                {blogDetail?.category}
              </Typography>
            </Breadcrumbs>
            <hr />
            <div>
              <h1 className="font-bold lg:text-[40px] text-[18px] md:text-[20px] mb-2 text-center leading-tight">
                {blogDetail?.heading}
              </h1>
            </div>
            <div id="hbagency_space_127054"></div>
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
                  Posted on{" "}
                  {blogDetail?.createdAt
                    ? blogDetail?.createdAt.substring(0, 24)
                    : null}
                </span>
              </div>
              <hr />
            </div>
            <div className="lg:px-36 md:px-24 px-2 mt-2">
              <h1 className="lg:text-[25px] text-[16px] font-[500] w-full text-justify">
                {blogDetail?.subheading}
              </h1>
              <div className="hb-ad-inpage">
                <div className="hb-ad-inner">
                  <div className="hbagency_cls hbagency_space_127055"></div>
                </div>{" "}
              </div>
              <h1 className="lg:text-[22px] tex-[16px] py-4 text-black/70 leading-7">
                {blogDetail?.middlehead}
              </h1>
              <hr />
              <h2 className="pt-2 lg:text-[15px] text-[13px]">{paragraphs}</h2>
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
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="mb-4 flex gap-4 border-b py-2"
                        >
                          <img
                            className="w-[3vw] h-[3vw] rounded-full object-cover"
                            src="https://th.bing.com/th?id=ORMS.71179e246969323f1312c4087f8c0fae&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0"
                          />
                          <p>
                            We currently sit in fifth place with 25 points from
                            14 games played, however we have two games in hand
                            over a number of teams sitting above us.We currently
                            sit in fifth place with 25 points from 14 games
                            played, however we have two games in hand over a
                            number of teams sitting above us.
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
        ) : (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
      <RelatedFeeds blog={blogs} />
    </div>
  );
};

export default NewsDetails;
