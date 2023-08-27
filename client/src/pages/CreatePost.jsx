import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setgeneratingImg] = useState(false);
  const [laoding, setlaoding] = useState(false);

  const handelChange = (e) => {
    console.log(form);
    console.log({ ...form });

    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handelSurrpiseMe = (e) => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setform({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setgeneratingImg(true);
        const response = await fetch("https://ai-image-generator-7141.onrender.com/api/v1/sumanai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setform({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setgeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setlaoding(true);

      try {
        const response = await fetch("https://ai-image-generator-7141.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();

        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setlaoding(false);
      }
    } else {
      alert("Please enter a prompt and geenrate a image");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-10">
      <div>
        <h1 className="font-extraboold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[18px] max-w[500px]">
          Create imagnative and visually stunning through Suman AI and share
          them with commnity
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handelSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="Toh name type kare mg"
            value={form.name}
            handelChange={handelChange}
          />
          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Subhe subhe bencho tum log 2 mp ka camera pakad ke"
            value={form.prompt}
            isSurpriseMe
            handelSurrpiseMe={handelSurrpiseMe}
            handelChange={handelChange}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray900 text-sm rounded-lg focus:ring-blue-500 fouces:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 gap-5 flex">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating .... " : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with
            others in the community
          </p>
          <button
            type="submit"
            className="mt-3  text-white bg-blue-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {laoding ? "Sharing ..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
