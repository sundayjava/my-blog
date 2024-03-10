import { Check, CloudUpload, Warning } from "@mui/icons-material";
import { category } from "../../data/category";
import { ChangeEvent, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Alert, Box, CircularProgress } from "@mui/material";

const AdminCreatePost = () => {
  const [postImg, setPostImg] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success,setSuccess] = useState(false)
  const [error, setError] = useState<any>("");
  const [blogData, setBlogData] = useState({
    category: "",
    heading: "",
    subHead: "",
    middleHead: "",
    mainBody: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBlogData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPostImg(event.target.files[0]);
    }
  };

  const createPost = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (postImg) {
      try {
        setIsLoading(true);

        const storageRef = ref(storage, "images/" + postImg?.name);
        const uploadTask = uploadBytesResumable(storageRef, postImg);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                console.log("Permission error");
                break;
              case "storage/canceled":
                console.log("storage/canceled");
                break;

              case "storage/unknown":
                console.log("storage/unknown");
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await setDoc(doc(db, "blog", uuidv4()), {
                  category: blogData.category,
                  heading: blogData.heading,
                  photoURL: downloadURL,
                  subheading: blogData.subHead,
                  middlehead: blogData.middleHead,
                  mainbody: blogData.mainBody,
                });

                setIsLoading(false);
                setSuccess(true)
                setTimeout(() => {
                  setSuccess(false);
                }, 3000);
                setBlogData({
                  category: "",
                  heading: "",
                  subHead: "",
                  middleHead: "",
                  mainBody: "",
                });
                setPostImg(null)
              }
            );
          }
        );
      } catch (err) {
        setIsLoading(false);
        setError(err);
      }
    }
  };

  return (
    <div className="lg:px-16 px-2">
      <h1 className="text-[20px] font-bold text-yellow-500 my-5">
        Add new post
      </h1>
      <form onSubmit={createPost}>
        <div className="lg:flex gap-10">
          {postImg ? (
            <label
              htmlFor="file"
              className="h-[180px] cursor-pointer w-[95%] border-4 flex justify-center items-center flex-col"
            >
              <img
                src={URL.createObjectURL(postImg)}
                alt="postimg"
                className="w-full h-full"
              />
            </label>
          ) : (
            <div className="border lg:w-[40%] cursor-pointer hover:border-blue-200 hover:border-5 w-full h-[200px] flex justify-center items-center rounded-md">
              <label
                htmlFor="file"
                className="h-[180px] cursor-pointer w-[95%] border-dashed border-4 flex justify-center items-center flex-col hover:border-blue-200 hover:border-5"
              >
                <CloudUpload
                  sx={{ color: "gray", fontSize: 50, cursor: "pointer" }}
                />
                <h1 className="w-[60%] text-center text-black/50">
                  Drag and image here or Browse for an image to upload
                </h1>
              </label>
            </div>
          )}
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="flex flex-col lg:w-[55%] w-full gap-4">
            <div className="flex flex-col gap-1 mt-4 lg:mt-0">
              <label htmlFor="body" className="text-[14px] text-black/70">
                Select category
              </label>
              <select
                name="category"
                value={blogData.category}
                onChange={handleChange}
                className="w-full border outline-blue-200 px-5 py-1 rounded-md text-[14px] text-black/80"
              >
                {category.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 mt-4">
              <label htmlFor="body" className="text-[14px] text-black/70">
                Post heading
              </label>
              <textarea
                rows={4}
                name="heading"
                value={blogData.heading}
                onChange={handleChange}
                required
                className="border px-3 py-1 outline-blue-200 rounded-md"
                placeholder="Add some heading that will display at the top"
              />
            </div>
          </div>
        </div>
        {error && (
          <Alert
            icon={<Warning fontSize="inherit" />}
            sx={{ mt: 2 }}
            severity="error"
          >
            Unable to post blog, please try again later.
          </Alert>
        )}
        {success && (
          <Alert
            icon={<Check fontSize="inherit" />}
            sx={{ mt: 2 }}
            severity="success"
          >
            Blog added successfully
          </Alert>
        )}
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="body" className="text-[14px] text-black/70">
            Subheading
          </label>
          <textarea
            rows={4}
            name="subHead"
            value={blogData.subHead}
            onChange={handleChange}
            required
            className="border px-3 py-1 outline-blue-200 w-full rounded-md"
            placeholder="It was our never-say-die attitude and willingness to stick to our principles that saw us earn a fully deserved"
          />
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="body" className="text-[14px] text-black/70">
            heading 3
          </label>
          <textarea
            rows={5}
            name="middleHead"
            value={blogData.middleHead}
            onChange={handleChange}
            required
            className="border px-3 py-1 outline-blue-200 w-full rounded-md"
            placeholder="Jude Soonsup-Bell gave our north London rivals the  extreme pressure in the second 45 and got our just rewards when Ethan Nwaneri netted a late equaliser."
          />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="body" className="text-[14px] text-black/70">
            Post body
          </label>
          <textarea
            rows={7}
            name="mainBody"
            value={blogData.mainBody}
            onChange={handleChange}
            required
            className="border px-3 py-1 outline-blue-200  w-full rounded-md"
            placeholder="“Even when we were warming up they got booed when they came out. in front of a crowd it definitely  fans who came out tonight. They were excellent, very vocal and really pushed the team through and you really felt that in the second half."
          />
        </div>
        <div className="w-full flex justify-end">
          {!isLoading ? (
            <button className="mt-5 border-yellow-800 rounded-md bg-yellow-400 text-[14px] px-4 py-1">
              submit post
            </button>
          ) : (
            <div className="flex w-full justify-center items-center mt-6">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminCreatePost;
