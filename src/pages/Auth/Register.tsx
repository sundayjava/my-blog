import { useNavigate } from "react-router-dom";
import google from "../../assets/google.png";
import CollectionsIcon from "@mui/icons-material/Collections";
import { ChangeEvent, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../../config/firebaseConfig";
import { CircularProgress } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [postImg, setPostImg] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>("");
  const [inputData, setInputData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPostImg(event.target.files[0]);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const createUser = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (postImg) {
      try {
        setIsLoading(true);
        const res = await createUserWithEmailAndPassword(
          auth,
          inputData.email,
          inputData.password
        );

        const storageRef = ref(storage, inputData.fullname);

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
                await updateProfile(res.user, {
                  displayName: inputData.fullname,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName: inputData.fullname,
                  email: inputData.email,
                  photoURL: downloadURL,
                });

                setIsLoading(false);
                navigate("/");
              }
            );
          }
        );
      } catch (error) {
        setIsLoading(false);
        setError('Something went wrong. please try again');
      }
    }else{
        alert('please select profile picture')
        setIsLoading(false)
    }
  };

  return (
    <div>
      <form onSubmit={createUser}>
        <h1 className="uppercase text-[20px] font-normal text-center">
          Register Now
        </h1>
        <div
          className="flex gap-5 justify-center shadow-md items-center my-5 cursor-pointer"
          onClick={() => {}}
        >
          <img className="w-[8vw] h-[8vw] md:w-[3vw] md:h-[3vw]" src={google} />
          <span className="font-normal">Register with Google</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-[45%] h-[2px] bg-gray-300" />
          <div className="text-[13px] text-black/60">OR</div>
          <div className="w-[45%] h-[2px] bg-gray-300" />
        </div>

        <div className="w-full justify-center flex mb-5">
          <div className="w-[7vw] cursor-pointer">
            <label htmlFor="file">
              {postImg ? (
                <div className="cursor-pointer">
                  <img
                    src={URL.createObjectURL(postImg)}
                    alt="postimg"
                    className="w-full h-[7vw] rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-[7vw] rounded-full bg-gray-300 flex justify-center items-center cursor-pointer">
                  <CollectionsIcon
                    sx={{ fontSize: 50, color: "gray", cursor: "pointer" }}
                  />
                </div>
              )}
            </label>
          </div>
        </div>
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />
        <div>
          <input
            type="username"
            placeholder="Full name"
            name="fullname"
            value={inputData.fullname}
            onChange={handleChange}
            className="rounded-md text-[13px] border-gray-300 border w-full px-2 py-2 mb-4"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={inputData.email}
            onChange={handleChange}
            className="rounded-md text-[13px] border-gray-300 border w-full px-2 py-2 mb-4"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={inputData.password}
            onChange={handleChange}
            className="rounded-md text-[13px] border-gray-300 border w-full px-2 py-2 mb-4"
          />
        </div>
        {error && (
          <p className="italic w-full text-center my-4 text-red-600 text-[14px] font-bold line-clamp-1">
            {error}
          </p>
        )}
        <div className="w-full flex justify-center">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <button className="px-8 py-1 rounded-lg bg-yellow-500 text-[13px]">
              Register
            </button>
          )}
        </div>
      </form>
      <hr className="mt-3" />
      <p className="text-[14px] font-normal my-7 text-center">
        Already have an account?{" "}
        <span
          className="text-yellow-500 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
