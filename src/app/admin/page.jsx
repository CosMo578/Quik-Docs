"use client";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { X, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { app } from "../../../firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Admin = () => {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const modal = useRef();
  const closeButton = useRef();

  const db = getFirestore(app);
  const storage = getStorage(app);

  const uploadFiles = async () => {
    files.forEach((file) => {
      const storageRef = ref(storage, "documents/" + file?.name);

      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: file.type,
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const fileProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + progress + "% done");

          setProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: fileProgress,
          }));
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              alert("User does not have permission to access the object");
              break;
            case "storage/canceled":
              alert("Operation Cancled by User");
              break;
            case "storage/unknown":
              alert("Unknown error occurred");
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              saveInfo(file, downloadURL);
            })
            .catch((error) => {
              console.log(error);
            });
        },
      );
    });
    setFiles([]);
    modal.current.close();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const pdfFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf",
    );

    if (pdfFiles.length !== selectedFiles.length) {
      alert("Only PDF files are allowed.");
    } else {
      setFiles(pdfFiles);
      modal.current.showModal();
      // closeButton.current.className = "absolute";
      // modal.current.className = "relative"
    }
  };

  const hideModal = () => {
    setFiles([]);
    modal?.current.close();
  };

  return (
    <section className="grid w-full place-items-center overflow-hidden overflow-y-auto pt-20">
      <div className="mx-auto flex w-[60%] items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 size-12 text-primary-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>

            <p className="mb-2 text-base text-gray-500">
              <span className="font-semibold text-primary-100">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-sm text-gray-500">PDF (MAX. 10MB)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>

      <dialog
        className={`modal overflow-hidden rounded-lg p-6 pt-16 shadow-lg ${files.length !== 0 && "relative flex flex-col items-center gap-6"}`}
        ref={modal}
        hidden
      >
        <button
          className={`bg-gray-200 p-3 ${files.length !== 0 && "absolute right-0 top-0"}`}
          onClick={() => hideModal()}
          ref={closeButton}
        >
          <XIcon className="text-3xl" />
        </button>
        <div className="mt-6 grid h-[60%] w-full grid-cols-2 gap-3 overflow-y-scroll">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between gap-4 rounded-lg border border-primary-100 p-3"
            >
              <div className="flex flex-col gap-1.5">
                <h2 className="text-xl font-semibold">
                  {file.name.length > 20
                    ? file.name.substring(0, 20) + "..."
                    : file.name}
                </h2>
                <p className="text-sm text-gray-400">
                  {file.type} / {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <X
                onClick={() =>
                  setFiles(files.filter((f) => f.name !== file.name))
                }
                className="cursor-pointer text-3xl font-semibold text-red-600"
              />
            </div>
          ))}
        </div>

        {/* {Object.keys(progress).length > 0 ? (
          files.map((file) => (
            <div key={file.name} className="w-full rounded-full bg-gray-200">
              <div
                className="rounded-full bg-gray-400 p-0.5 text-center text-xs font-medium leading-none text-black"
                style={{ width: `${progress[file.name] || 0}%` }}
              >
                {Number(progress[file.name] || 0).toFixed(0) + "%"}
              </div>
            </div>
          )) */}
        {/* // ) : ( */}
          <button
            disabled={files.length === 0}
            onClick={() => uploadFiles()}
            className="mx-auto mt-6 inline-block rounded-lg bg-primary-200 px-8 py-3 font-semibold text-white disabled:bg-gray-200"
          >
            Upload
          </button>
        {/* // )} */}
      </dialog>
    </section>
  );
};
export default Admin;
