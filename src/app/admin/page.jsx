"use client";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { X, XIcon } from "lucide-react";
import { useRef, useState, useEffect, useContext } from "react";
import UploadComponent from "@/components/UploadComponent";
import { useRouter } from "next/navigation";
import { adminEmails } from "../../../adminEmail";
import { AuthContext } from "../Context/AuthContext";
import { storage } from "../config/firebase";

const Admin = () => {
  const modal = useRef();
  const closeButton = useRef();
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [collectionName, setCollectionName] = useState("");

  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const userEmail = currentUser?.email;

    if (currentUser !== undefined) {
      return;
    } else {
      if (!adminEmails.includes(userEmail)) {
        router.push("/home"); // Redirect non-admins
      }
    }
  }, [currentUser, router]);

  const uploadFiles = async () => {
    if (!collectionName) {
      alert("Please select a collection");
    }
    files.forEach((file) => {
      const storagePath =
        collectionName === "courseMaterials" ? `documents/` : `pastQuestions/`;

      const storageRef = ref(storage, `${storagePath}${file?.name}`);

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
    }
  };

  const hideModal = () => {
    setFiles([]);
    modal?.current.close();
  };

  return (
    <section className="grid w-full place-items-center overflow-hidden overflow-y-auto pt-40">
      <ul class="mb-8 grid w-[60%] gap-6 md:grid-cols-2">
        <li>
          <input
            type="radio"
            id="courseMaterials"
            name="fileOption"
            value="courseMaterials"
            onChange={() => setCollectionName("courseMaterials")}
            class="peer hidden"
            required
          />
          <label
            for="courseMaterials"
            class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-primary-100 peer-checked:text-primary-100"
          >
            <div class="block">Upload Course Materials</div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="pastQuestions"
            name="fileOption"
            value="pastQuestions"
            onChange={() => setCollectionName("pastQuestions")}
            class="peer hidden"
          />
          <label
            for="pastQuestions"
            class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-primary-100 peer-checked:text-primary-100"
          >
            <div class="block">Upload Past Questions</div>
          </label>
        </li>
      </ul>

      <UploadComponent
        handleFileChange={handleFileChange}
        collectionName={collectionName}
      />

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

        <button
          disabled={files.length === 0}
          onClick={() => uploadFiles()}
          className="mx-auto mt-6 inline-block rounded-lg bg-primary-200 px-8 py-3 font-semibold text-white disabled:bg-gray-200"
        >
          Upload
        </button>
      </dialog>
    </section>
  );
};
export default Admin;
