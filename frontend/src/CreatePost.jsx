import axios from "axios";
import React, { useContext, useState } from "react";
import { userContext } from "./App";
import { MdCloudUpload } from "react-icons/md";
import Loader from "./Loader";
function CreatePost() {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("harsh");
  const [msg, setMsg] = useState(null);
  const [imageAsset, setImageAsset] = useState("");
  const user = useContext(userContext);
  const postImage = (pics) => {
    setIsLoading(true);
    if (pics == undefined) {
      setFields(true);
      setMsg("Please Select an Image :( ");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
      return;
    }

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpeg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "fruitswala");
      data.append("cloud_name", "djearclq9");
      fetch("https://api.cloudinary.com/v1_1/djearclq9/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const downloadURL = data.url.toString();
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image Uploaded successfull :)");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        })
        .catch((err) => {
          // console.log(err);
          setIsLoading(false);
        });
    } else {
      setFields(true);
      setMsg("File is Not an Image :( ");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("email", user.email);
    formData.append("imageAsset", imageAsset);

    axios
      .post("/create", formData)
      .then((res) => {
        if (res.data === "Success") {
          window.location.href = "/";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full  flex flex-col items-center justify-center border-2 p-4 mx-auto md:mt-8">
      <h2 className="text-transparent items-center justify-center flex py-2 bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-800 text-4xl font-bold mb-3">
        Create Blogs
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[75%] px-2 flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Enter Title"
          className="p-2 border-slate-200 border-2 rounded-md"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Category"
          className="p-2 border-slate-200 border-2 rounded-md"
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          name="desc"
          id="desc"
          cols="30"
          rows="10"
          placeholder="Enter Description"
          className="p-2 border-slate-200 border-2 rounded-md"
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <div className="group flex justify-center flex-col border-2 border-dotted border-slate-300 w-full  cursor-pointer rounded-lg min-h-[200px]">
          {isLoading ? (
            <Loader></Loader>
          ) : (
            <>
              {" "}
              {imageAsset === "" ? (
                <>
                  {" "}
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <MdCloudUpload className="text-slate-500 text-3xl hover:text-slate-700"></MdCloudUpload>
                      <p className="text-slate-500 hover:text-slate-700">
                        {" "}
                        Click Here To Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept=""
                      onChange={(e) => postImage(e.target.files[0])}
                      className="w-0 h-0"
                    ></input>
                  </label>{" "}
                </>
              ) : (
                <>
                  <div className="w-full h-full flex flex-col p-2">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-fit h-fit"
                    ></img>
                    <div className="w-full flex items-center justify-end">
                      <button
                        onClick={() => setImageAsset("")}
                        className="bg-red-600 p-3 min-w-32 text-white font-bold hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex items-center justify-end">
          <button className="bg-green-600 p-3 min-w-32 text-white font-bold hover:bg-green-700">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
