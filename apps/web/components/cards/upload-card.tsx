import { Card, CardContent } from "@repo/shadcn/components/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/shadcn/components/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@repo/shadcn/components/item";
import { IconPhoto } from "@tabler/icons-react";
import { Input } from "@repo/shadcn/components/input";
import { Button } from "@repo/shadcn/components/button";
import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState, DragEvent } from "react";

type UploadImage = {
  file: File;
  url: string;
};

export default function UploadCard() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [image, setImage] = useState<UploadImage[]>([]);

  const dragRef = useRef(0);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current++;
    setIsDragging(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current--;
    if (dragRef.current === 0) {
      setIsDragging(false);
    }
  };

  const addFiles = (files: FileList | null) => {
    if (files) {
      const multipleFile = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setImage((prev) => [...prev, ...multipleFile]);
    }
  };

  const onButtonClick = () => {
    inputFileRef.current?.click();
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current = 0;
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
  };

  useEffect(() => {
    return () => {
      if (image) {
        image.forEach((img) => {
          URL.revokeObjectURL(img.url);
        });
      }
    };
  }, [image]);

  return (
    <Card className="py-6">
      <CardContent className="sm:px-6">
        <Empty
          className={`border md:border-2 ${isDragging ? "border-chart-5" : "border-dashed"}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconPhoto />
            </EmptyMedia>
            <EmptyTitle>Drag and drop photo file to upload</EmptyTitle>
            <EmptyDescription>JPG, JPEG and PNG. Max 20 MB.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Input
              ref={inputFileRef}
              id="file-upload"
              type="file"
              accept="image/*, .jpg, .jpeg, .png"
              className="hidden"
              multiple
              onChange={onChangeInput}
            />
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={onButtonClick}
            >
              Upload Files
            </Button>
          </EmptyContent>
        </Empty>
        {image.length !== 0 && (
          <div className="flex w-full flex-col gap-6 mt-4">
            <ItemGroup className="gap-4">
              {image.map((img, index) => (
                <Item key={index} variant="outline" asChild role="listitem">
                  <a href={img.url}>
                    <ItemMedia variant="image">
                      <Image
                        src={img.url}
                        alt="image-preview"
                        width={50}
                        height={50}
                        className="aspect-square object-cover"
                      />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="line-clamp-1">
                        {img.file?.name}
                      </ItemTitle>
                      <ItemDescription>{img.file?.size}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button size="icon-sm" variant="outline">
                        <IconTrash
                          stroke={2}
                          className="text-destructive-foreground size-5"
                        />
                      </Button>
                    </ItemActions>
                  </a>
                </Item>
              ))}
            </ItemGroup>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
