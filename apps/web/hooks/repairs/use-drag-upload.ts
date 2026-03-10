import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { toast } from "sonner";

type UploadImage = {
  metaData: File;
  url: string;
};

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const toUploadImage = (file: File): UploadImage => ({
  metaData: file,
  url: URL.createObjectURL(file),
});

export const useDragUpload = () => {
  const [image, setImage] = useState<UploadImage[]>([]);
  const [file, setFile] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef(0);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const invalidFiles = fileArray.filter(
      (f) => !ALLOWED_TYPES.includes(f.type),
    );

    if (invalidFiles.length > 0) {
      return toast.error("Can not uploaded files");
    }
    setFile(fileArray);
    setImage((prev) => [...prev, ...fileArray.map(toUploadImage)]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current = 0;
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current--;
    if (dragRef.current === 0) setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    addFiles(e.target.files);

  const handleDelete = (index: number) => {
    setImage((prev) => prev.filter((_, i) => i !== index));
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const onButtonClick = () => {
    inputFileRef.current?.click();
  };

  return {
    image,
    setImage,
    file,
    setFile,
    isDragging,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDelete,
    onChangeInput,
    inputFileRef,
    onButtonClick,
  };
};
